import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aayush | Human",
  description: "Engineering light through code. Creating experiences that blur the line between digital and physical reality.",
  keywords: ["creative technologist", "webgl", "react three fiber", "portfolio", "interactive design"],
  authors: [{ name: "G.O.A.T me" }],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#E76F51',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
