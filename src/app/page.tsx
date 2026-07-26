import type { Metadata } from 'next';
import HomeClient from './HomeClient';

export const revalidate = 3600; // ISR trang chủ 1 tiếng

export const metadata: Metadata = {
  title: '✨ SaveTheDate.io.vn — Tạo Thiệp Cưới Online & Website Đám Cưới Sang Trọng',
  description: 'Nền tảng tạo thiệp cưới online & website đám cưới điện tử sang trọng số 1 Việt Nam. Đa dạng mẫu thiết kế nghệ thuật, cá nhân hóa tên khách mời, xác nhận RSVP, QR mừng cưới & nhạc nền lãng mạn.',
  keywords: [
    'Save The Date Việt Nam',
    'thiệp cưới savethedate',
    'savethedate.io.vn',
    'tạo thiệp cưới online',
    'thiệp cưới điện tử cao cấp',
    'mẫu thiệp cưới online đẹp',
    'trang web thiệp cưới',
    'tạo website đám cưới',
    'thiệp cưới QR code',
    'thiệp cưới gửi qua Facebook Zalo',
    'thiệp báo hỷ online',
    'kế hoạch đám cưới chi tiết',
    'cách viết lời mời cưới hay',
    'mẫu lời chúc đám cưới'
  ],
  authors: [{ name: 'SaveTheDate Việt Nam' }],
  icons: {
    icon: [
      { url: '/favicon.ico?v=3', sizes: 'any' },
      { url: '/icon.png?v=3', type: 'image/png' },
      { url: '/icon.svg?v=3', type: 'image/svg+xml' }
    ],
    apple: '/apple-touch-icon.png?v=3',
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || '',
  },
  openGraph: {
    title: '✨ SaveTheDate.io.vn — Tạo Thiệp Cưới Online & Website Đám Cưới Sang Trọng',
    description: 'Nền tảng tạo thiệp cưới online & website đám cưới điện tử sang trọng số 1 Việt Nam. Đa dạng mẫu thiết kế nghệ thuật, cá nhân hóa tên khách mời, xác nhận RSVP, QR mừng cưới & nhạc nền lãng mạn.',
    url: 'https://savethedate.io.vn',
    siteName: 'SaveTheDate Việt Nam',
    locale: 'vi_VN',
    type: 'website',
    images: [
      {
        url: 'https://savethedate.io.vn/thiepmaudovang/images/cover.jpg',
        width: 1200,
        height: 630,
        alt: 'SaveTheDate — Tạo Thiệp Cưới Online & Website Đám Cưới Độc Bản',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '✨ SaveTheDate.io.vn — Tạo Thiệp Cưới Online & Website Đám Cưới Sang Trọng',
    description: 'Nền tảng tạo thiệp cưới online & website đám cưới điện tử sang trọng số 1 Việt Nam. Tích hợp RSVP, QR mừng cưới & gửi Zalo/Facebook.',
    images: ['https://savethedate.io.vn/thiepmaudovang/images/cover.jpg'],
  },
};

export default function Home() {
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'SaveTheDate Việt Nam',
    'alternateName': 'SaveTheDate Thiệp Cưới Online',
    'url': 'https://savethedate.io.vn',
    'logo': 'https://savethedate.io.vn/thiepmaudovang/images/cover.jpg',
    'contactPoint': {
      '@type': 'ContactPoint',
      'telephone': '+84-798-128-201',
      'contactType': 'customer service',
      'areaServed': 'VN',
      'availableLanguage': ['vi', 'en']
    }
  };

  const webAppJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'SaveTheDate - Tạo Thiệp Cưới Online & Website Đám Cưới',
    'url': 'https://savethedate.io.vn',
    'applicationCategory': 'DesignApplication',
    'operatingSystem': 'All',
    'offers': {
      '@type': 'Offer',
      'price': '99000',
      'priceCurrency': 'VND',
      'availability': 'https://schema.org/InStock'
    },
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '4.9',
      'reviewCount': '1280'
    }
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      // {
      //   '@type': 'Question',
      //   'name': 'Tạo thiệp cưới online tại SaveTheDate mất bao lâu?',
      //   'acceptedAnswer': {
      //     '@type': 'Answer',
      //     'text': 'Bạn có thể tạo và tùy chỉnh website thiệp cưới điện tử sang trọng chỉ trong vòng 5 phút với đầy đủ thông tin, album ảnh và nhạc nền.'
      //   }
      // },
      {
        '@type': 'Question',
        'name': 'Thiệp cưới điện tử có chia sẻ qua Zalo, Facebook được không?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Hoàn toàn được! Thiệp cưới SaveTheDate được tối ưu hình ảnh preview nét đẹp khi gửi qua Zalo, Facebook, Messenger, iMessage và hỗ trợ cá nhân hóa tên từng khách mời.'
        }
      },
      {
        '@type': 'Question',
        'name': 'SaveTheDate có hỗ trợ tên miền riêng (custom domain) không?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Có, hệ thống hỗ trợ gán tên miền riêng (VD: codau-chure.com) hoặc subdomain theo tên cô dâu chú rể giúp thiệp cưới chuyên nghiệp và độc đáo.'
        }
      },
      {
        '@type': 'Question',
        'name': 'Giá tạo thiệp cưới online là bao nhiêu?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'SaveTheDate cung cấp thiệp cưới online cao cấp trọn gói đồng giá 99.000 VNĐ không phát sinh chi phí ẩn, lưu trữ 1 năm.'
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <HomeClient />
    </>
  );
}
