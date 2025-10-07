import type { Metadata } from "next";
import { ViewModeProvider } from "@/context/ViewModeContext";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layouts/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jonathan Bertin",
  description:
    "Jonathan Bertin - Portfolio website of a French photographer based in Paris.",
  // icons: {
  //   icon: [{ rel: "icon", url: Favicon.src }],
  // },
  openGraph: {
    title: "Jonathan Bertin",
    description: "Jonathan Bertin",
    siteName: "Jonathan Bertin Website",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ViewModeProvider>
          <Navbar />
          {children}
        </ViewModeProvider>
      </body>
    </html>
  );
}
