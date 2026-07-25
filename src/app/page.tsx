import type { Metadata } from 'next';
import HomeClient from './HomeClient';

export const metadata: Metadata = {
  title: 'Thiệp Cưới Online Hạnh Phúc - Dịch Vụ Tạo Thiệp Cưới Độc Bản',
  description: 'Tạo thiệp cưới online cao cấp với tên miền riêng cô dâu chú rể, giao diện sang trọng, âm nhạc lãng mạn và nhận lời chúc thời gian thực.',
  openGraph: {
    title: 'Thiệp Cưới Online Hạnh Phúc - Tạo Thiệp Cưới Sang Trọng',
    description: 'Nền tảng tạo thiệp cưới điện tử hiện đại, tinh tế với tên miền riêng theo tên hai bạn.',
    url: 'https://savethedate.io.vn',
    siteName: 'Thiệp Cưới Online Hạnh Phúc',
    locale: 'vi_VN',
    type: 'website',
    images: [
      {
        url: '/thiepmaudovang/images/cover.jpg',
        width: 1200,
        height: 630,
        alt: 'Thiệp Cưới Online Hạnh Phúc',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Thiệp Cưới Online Hạnh Phúc',
    description: 'Tạo thiệp cưới điện tử hiện đại với tên miền riêng cô dâu chú rể.',
    images: ['/thiepmaudovang/images/cover.jpg'],
  },
};

export default function Home() {
  return <HomeClient />;
}
