import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import InstallAgriHub from "@/components/pwa/InstallAgriHub";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "AgriHub PH",
    template: "%s | AgriHub PH",
  },
  description: "Offline-first PWA for farmers, cooperative dashboard, B2B marketplace, and admin portal.",
  applicationName: "AgriHub PH",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "AgriHub",
  },
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#059669",
  colorScheme: "light",
  viewportFit: "cover",
  interactiveWidget: "resizes-content",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#f6fbf7] text-[#163025]">
        <div className="flex-1 flex flex-col">{children}</div>
        <InstallAgriHub />
      </body>
    </html>
  );
}
