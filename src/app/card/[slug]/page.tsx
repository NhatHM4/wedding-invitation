import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { supabase } from '@/lib/supabase';
import dynamic from 'next/dynamic';

const TemplateA = dynamic(() => import('@/components/templates/TemplateA'));
const TemplateDoVang = dynamic(() => import('@/components/templates/TemplateDoVang'));
const Template1 = dynamic(() => import('@/components/templates/Template1'));
const Template2 = dynamic(() => import('@/components/templates/Template2'));
const Template3 = dynamic(() => import('@/components/templates/Template3'));
const Template4 = dynamic(() => import('@/components/templates/Template4'));
const Template5 = dynamic(() => import('@/components/templates/Template5'));
const Template6 = dynamic(() => import('@/components/templates/Template6'));
const Template7 = dynamic(() => import('@/components/templates/Template7'));
const Template8 = dynamic(() => import('@/components/templates/Template8'));

export const runtime = 'edge';

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ to?: string }>;
}

// Hàm lấy dữ liệu đám cưới từ Supabase
async function getWeddingData(slug: string) {
  let query = supabase.from('weddings').select('*');

  if (slug.startsWith('domain-')) {
    const domain = slug.replace('domain-', '');
    const domainWithoutWww = domain.replace(/^www\./, '');
    const domainWithWww = `www.${domainWithoutWww}`;
    // Truy vấn custom_domain bằng chính domain hoặc domain đã loại bỏ www hoặc domain có www
    query = query.or(`custom_domain.eq.${domain},custom_domain.eq.${domainWithoutWww},custom_domain.eq.${domainWithWww}`);
  } else {
    query = query.eq('slug', slug);
  }

  const { data, error } = await query.single();

  if (error || !data) {
    return null;
  }
  return data;
}

// Hàm lấy danh sách lời chúc từ Supabase
async function getWishes(weddingId: string) {
  const { data, error } = await supabase
    .from('wishes')
    .select('*')
    .eq('wedding_id', weddingId)
    .order('created_at', { ascending: false });

  if (error || !data) {
    return [];
  }
  return data;
}

function getAbsoluteImageUrl(imagePath?: string, baseDomain?: string): string {
  const fallback = 'https://savethedate.io.vn/thiepmaudovang/images/cover.jpg';
  if (!imagePath) return fallback;
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  const domain = baseDomain || 'https://savethedate.io.vn';
  const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  return `${domain}${cleanPath}`;
}

function getCanonicalUrl(slug: string, customDomain?: string): string {
  if (customDomain) {
    const cleanDomain = customDomain.replace(/^www\./, '');
    return `https://${cleanDomain}`;
  }
  if (slug.startsWith('domain-')) {
    const domain = slug.replace('domain-', '').replace(/^www\./, '');
    return `https://${domain}`;
  }
  return `https://${slug}.savethedate.io.vn`;
}

// 1. Tạo Metadata động phục vụ cho SEO và mạng xã hội (Facebook, Zalo share, iMessage, Twitter)
export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;
  const to = resolvedSearchParams?.to || '';

  const wedding = await getWeddingData(slug);

  if (!wedding) {
    return {
      title: 'Không Tìm Thấy Thiệp Cưới | E-Wedding',
      description: 'Trang thiệp cưới bạn đang tìm kiếm không tồn tại hoặc đã thay đổi địa chỉ.',
      robots: { index: false, follow: false },
    };
  }

  const groom = wedding.groom_name || 'Chú Rể';
  const bride = wedding.bride_name || 'Cô Dâu';
  const canonicalUrl = getCanonicalUrl(slug, wedding.custom_domain);

  // Hiển thị tên Cô Dâu Chú Rể trực tiếp trên thanh Bar trình duyệt
  const rawTitle = to 
    ? `Kính Mời ${to} - Lễ Cưới Của ${groom} & ${bride}` 
    : `Lễ Cưới Của ${groom} & ${bride} | Thiệp Cưới Online`;

  const description = to
    ? `Trân trọng kính mời ${to} tới tham dự lễ kết hôn của ${groom} & ${bride}. Sự hiện diện của bạn là niềm vinh hạnh lớn nhất cho hai gia đình!`
    : `Thư mời tham dự Lễ Kết Hôn của ${groom} & ${bride}. Trân trọng kính mời quý khách tới tham dự ngày chung đôi của chúng tôi!`;

  const firstImg = (wedding.images && wedding.images.length > 0) ? wedding.images[0] : wedding.cover_image;
  const imageUrl = getAbsoluteImageUrl(firstImg, canonicalUrl);

  const ogTitle = to
    ? `Lễ Cưới Của ${groom} & ${bride} - Kính Mời ${to}`
    : `Lễ Cưới Của ${groom} & ${bride}`;

  return {
    title: rawTitle,
    description: description,
    keywords: [
      groom,
      bride,
      `Lễ cưới ${groom} ${bride}`,
      `Thiệp cưới ${groom} ${bride}`,
      'Thiệp cưới online',
      'Save the date',
      'Lời mời đám cưới'
    ],
    authors: [{ name: `${groom} & ${bride}` }],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: ogTitle,
      description: description,
      url: canonicalUrl,
      siteName: `${groom} & ${bride} - Thiệp Cưới Online`,
      locale: 'vi_VN',
      type: 'website',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `Hình ảnh thiệp cưới của ${groom} & ${bride}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: description,
      images: [imageUrl],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

// 2. Component Page chính với JSON-LD Structured Data
export default async function Page({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;
  
  const wedding = await getWeddingData(slug);
  if (!wedding) {
    notFound();
  }

  const wishes = await getWishes(wedding.id);
  const to = resolvedSearchParams.to || '';

  const groom = wedding.groom_name || 'Chú Rể';
  const bride = wedding.bride_name || 'Cô Dâu';
  const canonicalUrl = getCanonicalUrl(slug, wedding.custom_domain);
  const imageUrl = getAbsoluteImageUrl(
    (wedding.images && wedding.images.length > 0) ? wedding.images[0] : wedding.cover_image,
    canonicalUrl
  );

  // Schema.org Event JSON-LD cho Google SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    'name': `Lễ Cưới Của ${groom} & ${bride}`,
    'startDate': wedding.event_date || new Date().toISOString(),
    'eventAttendanceMode': 'https://schema.org/OfflineEventAttendanceMode',
    'eventStatus': 'https://schema.org/EventScheduled',
    'image': [imageUrl],
    'description': `Lễ cưới chính thức của chú rể ${groom} và cô dâu ${bride}`,
    'organizer': {
      '@type': 'Person',
      'name': `${groom} & ${bride}`,
    },
    'location': {
      '@type': 'Place',
      'name': wedding.location_info?.groom_family?.address || 'Địa điểm tiệc cưới',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': wedding.location_info?.groom_family?.address || '',
        'addressCountry': 'VN',
      },
    },
  };

  const renderTemplate = () => {
    switch (wedding.template_id) {
      case 'template1':
        return <Template1 wedding={wedding} to={to} wishes={wishes} />;
      case 'template2':
        return <Template2 wedding={wedding} to={to} wishes={wishes} />;
      case 'template3':
        return <Template3 wedding={wedding} to={to} wishes={wishes} />;
      case 'template4':
        return <Template4 wedding={wedding} to={to} wishes={wishes} />;
      case 'template5':
        return <Template5 wedding={wedding} to={to} wishes={wishes} />;
      case 'template6':
        return <Template6 wedding={wedding} to={to} wishes={wishes} />;
      case 'template7':
        return <Template7 wedding={wedding} to={to} wishes={wishes} />;
      case 'template8':
        return <Template8 wedding={wedding} to={to} wishes={wishes} />;
      case 'template-dovang':
      case 'thiepmaudovang':
        return <TemplateDoVang wedding={wedding} to={to} wishes={wishes} />;
      default:
        return <TemplateA wedding={wedding} to={to} wishes={wishes} />;
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {renderTemplate()}
    </>
  );
}
