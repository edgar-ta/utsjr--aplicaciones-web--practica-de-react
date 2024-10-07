import type { Metadata } from "next";
import logo from "./logo.png"
import "./globals.css";
import Navbar from "@/components/navbar";

export const metadata: Metadata = {
  title: "Sistema de Ventas",
  description: "Proyecto universitario de Edgar Trejo Avila para la UTSJR",
  icons: logo.src
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
