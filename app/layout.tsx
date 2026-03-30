import StructuredData from "@/components/StructuredData";
import AppShell from "@/components/AppShell";
import { Inter } from "next/font/google";
import "@/app/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL("https://kalmesyapi.com"),
  title: {
    default: "KALMES YAPI | Kıbrıs İnşaat & Altyapı Şirketi",
    template: "%s | KALMES YAPI"
  },
  description: "KALMES YAPI: Kıbrıs'ın lider inşaat ve mühendislik firması. Havalimanı, yol, köprü ve lüks konut projelerinde 20 yıllık küresel tecrübe. Güven ve kaliteyi inşa ediyoruz.",
  keywords: ["Kıbrıs inşaat firması", "Kuzey Kıbrıs altyapı projeleri", "Kıbrıs mühendislik", "Havalimanı inşaatı Kıbrıs", "Yol inşaatı", "Lüks konut projeleri Kıbrıs"],
  authors: [{ name: "KALMES YAPI" }],
  openGraph: {
    title: "KALMES YAPI | Kıbrıs'ın Lider İnşaat Şirketi",
    description: "Altyapı ve üst yapı projelerinde anıtsal imzalar.",
    url: "https://kalmesyapi.com",
    siteName: "KALMES YAPI",
    locale: "tr_TR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className={`${inter.className} selection:bg-primary/30 overflow-x-hidden`}>
        <StructuredData />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
