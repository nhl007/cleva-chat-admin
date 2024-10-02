import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cleva Admin",
  description: "Developed By Jumatechs. DEV: (Asif Nihal)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
