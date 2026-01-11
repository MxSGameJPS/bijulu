import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientLayout from "../components/Layout/ClientLayout";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "BijuLu - Joias Exclusivas",
  description: "Joias finas, brincos, gargantilhas e acessórios exclusivos.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ClientLayout header={<Header />} footer={<Footer />}>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
