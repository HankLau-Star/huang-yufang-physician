import type { Metadata, Viewport } from "next";
import "@fontsource-variable/noto-sans-sc/wght.css";
import "@fontsource-variable/noto-serif-sc/wght.css";
import "@fontsource/ma-shan-zheng/400.css";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#07171d",
};

export const metadata: Metadata = {
  metadataBase: new URL(
    "https://hanklau-star.github.io/huang-yufang-physician/",
  ),
  title: "黄玉芳医师 | HUANG YUFANG PHYSICIAN",
  description:
    "黄玉芳，西医临床执业医师，新郑市妇幼保健院退休医师。长期从事儿科临床诊疗，现参加国家卫健委西医学习中医两年期培训。",
  keywords: [
    "黄玉芳医师",
    "儿科医师",
    "新郑",
    "中西医结合",
    "中医适宜技术",
  ],
  formatDetection: {
    telephone: true,
    email: false,
    address: false,
  },
  appleWebApp: {
    capable: true,
    title: "黄玉芳医师",
    statusBarStyle: "black-translucent",
  },
  openGraph: {
    title: "黄玉芳医师 | HUANG YUFANG PHYSICIAN",
    description: "扎根临床数十载，以扎实临床守护生命，以开放求知融汇中西。",
    type: "website",
    locale: "zh_CN",
    images: [
      {
        url: "https://hanklau-star.github.io/huang-yufang-physician/og.jpg",
        width: 1672,
        height: 941,
        alt: "黄玉芳医师｜守正、仁心、融汇中西",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "黄玉芳医师 | HUANG YUFANG PHYSICIAN",
    description: "守正 · 仁心 · 融汇中西",
    images: ["https://hanklau-star.github.io/huang-yufang-physician/og.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
