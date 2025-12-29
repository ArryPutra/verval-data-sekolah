import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "VERVAL DAYA LISTRIK SEKOLAH - BPMP PROVINSI KALIMANTAN SELATAN",
  description: "Verifikasi & Validasi Daya Listrik Sekolah - BPMP Provinsi Kalimantan Selatan",
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
