import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get('host') || '';

  // Bỏ qua các file tĩnh, api, _next và các file có phần mở rộng
  if (
    url.pathname.startsWith('/_next') ||
    url.pathname.startsWith('/api') ||
    url.pathname.startsWith('/static') ||
    url.pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  const currentHost = hostname.toLowerCase();
  // Loại bỏ port nếu chạy ở local (ví dụ: localhost:3000 -> localhost)
  const hostnameWithoutPort = currentHost.split(':')[0];

  // Danh sách các domain chính (không coi là subdomain)
  const rootDomains = [
    'localhost', 
    'wedding.com', 
    'www.wedding.com', 
    'wedding-nhathm.com', 
    'www.wedding-nhathm.com',
    'savethedate.io.vn',
    'www.savethedate.io.vn'
  ];
  
  // Kiểm tra xem tên miền hiện tại có phải là tên miền mặc định của Cloudflare Pages hay không (*.pages.dev)
  const isCloudflarePagesDefault = hostnameWithoutPort.endsWith('.pages.dev');
  let isRootDomain = rootDomains.includes(hostnameWithoutPort);

  let subdomain = '';
  let customDomain = '';

  if (isCloudflarePagesDefault) {
    const parts = hostnameWithoutPort.split('.');
    // Nếu có dạng: [tên-dự-án].pages.dev (3 phần) hoặc [mã-bản-build].[tên-dự-án].pages.dev (4 phần)
    // Thì đây là domain chính của nền tảng (hiển thị trang chủ)
    if (parts.length <= 4) {
      isRootDomain = true;
    } else {
      // Nếu có dạng: [subdomain].[mã-bản-build].[tên-dự-án].pages.dev (nhiều hơn 4 phần)
      subdomain = parts[0];
    }
  }

  if (!isRootDomain && !isCloudflarePagesDefault) {
    if (hostnameWithoutPort.endsWith('.wedding-nhathm.com')) {
      subdomain = hostnameWithoutPort.replace('.wedding-nhathm.com', '');
    } else if (hostnameWithoutPort.endsWith('.wedding.com')) {
      subdomain = hostnameWithoutPort.replace('.wedding.com', '');
    } else if (hostnameWithoutPort.endsWith('.savethedate.io.vn')) {
      subdomain = hostnameWithoutPort.replace('.savethedate.io.vn', '');
    } else if (hostnameWithoutPort.endsWith('.localhost') || (hostnameWithoutPort.includes('localhost') && hostnameWithoutPort !== 'localhost')) {
      const parts = hostnameWithoutPort.split('.');
      if (parts.length > 1) {
        subdomain = parts[0];
      }
    } else {
      customDomain = hostnameWithoutPort.replace(/^www\./, '');
    }
  }

  // Định tuyến ngầm (rewrite) nếu có subdomain hợp lệ
  if (subdomain && subdomain !== 'www') {
    if (url.pathname === '/') {
      url.pathname = `/card/${subdomain}`;
      return NextResponse.rewrite(url);
    }
    if (url.pathname === '/invite') {
      url.pathname = `/invite/${subdomain}`;
      return NextResponse.rewrite(url);
    }
  }

  // Định tuyến ngầm (rewrite) nếu có custom domain hợp lệ
  if (customDomain) {
    if (url.pathname === '/') {
      url.pathname = `/card/domain-${customDomain}`;
      return NextResponse.rewrite(url);
    }
    if (url.pathname === '/invite') {
      url.pathname = `/invite/domain-${customDomain}`;
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
