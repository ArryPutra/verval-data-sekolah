import type { Metadata } from "next";
import "../styles/globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "VERIFIKASI DAN VALIDASI DATA SEKOLAH",
  description: "Verifikasi dan Validasi Data Sekolah - BPMP Provinsi Kalimantan Selatan",
  icons: {
    icon: "/images/tut-wuri-handayani.png"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${inter.className}`}>
        {children}
      </body>
    </html>
  );
}
