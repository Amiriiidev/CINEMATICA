import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "سینماتیکا — برترین فیلم‌های جهان",
  description: "کشف بزرگترین فیلم‌های تاریخ سینما",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-persian">{children}</body>
    </html>
  );
}
