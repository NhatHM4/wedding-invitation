import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Cormorant_Upright, Roboto, Barlow, Cormorant_Garamond, Inter, Playfair_Display } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin", "vietnamese"],
  weight: ["100", "300", "400", "700", "900"],
  display: "swap",
});

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin", "vietnamese"],
  weight: ["100", "300", "400", "700", "900"],
  display: "swap",
});

const cormorant = Cormorant_Upright({
  variable: "--font-cormorant",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant-garamond",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

// Local Fonts
const pinyon = localFont({
  src: "./fonts/PinyonScript-Regular.ttf",
  variable: "--font-pinyon",
});

const alexBrush = localFont({
  src: "./fonts/AlexBrush-Regular.ttf",
  variable: "--font-alexbrush",
});

const motherland = localFont({
  src: "./fonts/NVN-Motherland-Signature.ttf",
  variable: "--font-motherland",
});

const azkia = localFont({
  src: "./fonts/UTM-Azkia.ttf",
  variable: "--font-azkia",
});

const mightiest = localFont({
  src: "./fonts/SVN-Mightiest.otf",
  variable: "--font-mightiest",
});

const ephesis = localFont({
  src: "./fonts/Ephesis-Regular.ttf",
  variable: "--font-ephesis",
});

const cafeta = localFont({
  src: "./fonts/UTM-Cafeta.ttf",
  variable: "--font-cafeta",
});

const kechuyen = localFont({
  src: "./fonts/UVNKeChuyen1.ttf",
  variable: "--font-kechuyen",
});

const quarzo = localFont({
  src: "./fonts/SVN-Quarzo.otf",
  variable: "--font-quarzo",
});

const ameyallinda = localFont({
  src: "./fonts/SVN-Ameyallinda-Signature.otf",
  variable: "--font-ameyallinda",
});

const sriracha = localFont({
  src: "./fonts/Sriracha-Regular.ttf",
  variable: "--font-sriracha",
});

const sloop = localFont({
  src: "./fonts/UTM-Sloop-1.ttf",
  variable: "--font-sloop",
});

export const metadataBase = new URL(
  process.env.NEXT_PUBLIC_SITE_URL || 'https://savethedate.io.vn'
);

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#7d1f2a",
};

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: "E-Wedding - Thiệp Cưới Online Độc Bản & Sang Trọng",
    template: "%s | E-Wedding",
  },
  description: "Nền tảng tạo thiệp cưới online độc bản, chuyên nghiệp với giao diện sang trọng, custom domain theo tên hai bạn và nhạc nền lãng mạn.",
  keywords: [
    "thiệp cưới online",
    "thiệp cưới điện tử",
    "e-wedding",
    "tạo thiệp cưới",
    "thiệp đám cưới",
    "thiệp cưới custom domain",
    "save the date"
  ],
  authors: [{ name: "E-Wedding Platform" }],
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://savethedate.io.vn",
    siteName: "E-Wedding - Thiệp Cưới Online",
    title: "E-Wedding - Dịch Vụ Tạo Thiệp Cưới Online Độc Bản",
    description: "Tạo thiệp cưới điện tử đẳng cấp với custom domain riêng, giao diện sang trọng và âm nhạc lãng mạn.",
    images: [
      {
        url: "/thiepmaudovang/images/cover.jpg",
        width: 1200,
        height: 630,
        alt: "E-Wedding - Thiệp Cưới Online",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "E-Wedding - Thiệp Cưới Online Độc Bản",
    description: "Tạo thiệp cưới điện tử đẳng cấp với custom domain riêng.",
    images: ["/thiepmaudovang/images/cover.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const fontClasses = [
    geistSans.variable,
    geistMono.variable,
    roboto.variable,
    barlow.variable,
    cormorant.variable,
    cormorantGaramond.variable,
    inter.variable,
    playfair.variable,
    pinyon.variable,
    alexBrush.variable,
    motherland.variable,
    azkia.variable,
    mightiest.variable,
    ephesis.variable,
    cafeta.variable,
    kechuyen.variable,
    quarzo.variable,
    sriracha.variable,
    ameyallinda.variable,
    sloop.variable,
  ].join(" ");

  return (
    <html lang="vi" className={`${fontClasses} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#FAF7F2] text-[#2C2C2C]">
        {children}
      </body>
    </html>
  );
}
