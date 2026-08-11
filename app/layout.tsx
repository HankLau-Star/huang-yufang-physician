import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    "https://huang-yufang-physician.valid-gnat-7482.chatgpt.site",
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
  openGraph: {
    title: "黄玉芳医师 | HUANG YUFANG PHYSICIAN",
    description: "扎根临床数十载，以扎实临床守护生命，以开放求知融汇中西。",
    type: "website",
    locale: "zh_CN",
    images: [
      {
        url: "/og.png",
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
    images: ["/og.png"],
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
