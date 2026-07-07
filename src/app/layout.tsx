import type { Metadata } from "next";
import { Geist, Geist_Mono, Cormorant_Upright, Roboto, Barlow } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin", "vietnamese"],
  weight: ["100", "300", "400", "700", "900"],
});

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin", "vietnamese"],
  weight: ["100", "300", "400", "700", "900"],
});

const cormorant = Cormorant_Upright({
  variable: "--font-cormorant",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
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

export const metadata: Metadata = {
  title: "E-Wedding - Thiệp Cưới Online",
  description: "Dịch vụ tạo thiệp cưới online độc bản và tinh tế",
  icons: {
    icon: "/favicon.ico",
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
