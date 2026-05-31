import type { Metadata } from "next";
import { Geist, Raleway } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Student Motivation Analyzer",
  description:
    "Sistem AI multimodal yang menganalisis rekaman suara mahasiswa melalui NLP dan Analisis Ciri Akustik untuk mengklasifikasikan tingkat motivasi dan memberikan wawasan bagi pendidik.",
  icons: {
    icon: [{ url: "/logo.svg", type: "image/svg+xml" }],
  },
};

import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("font-sans", geist.variable, raleway.variable)}
    >
      <body className="h-screen overflow-x-hidden">
        <AuthProvider>{children}</AuthProvider>
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
