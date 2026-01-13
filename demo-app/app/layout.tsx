import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GPU-as-a-Service with RHACM | Interactive Demo",
  description: "Experience GPU-as-a-Service using MultiKueue and Red Hat Advanced Cluster Management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full">{children}</body>
    </html>
  );
}
