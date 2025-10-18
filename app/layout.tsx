import type { Metadata } from "next";
import { ViewModeProvider } from "@/context/ViewModeContext";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/layouts/navbar";
import { CartProvider } from "@/components/cart/cartContext";

const junicode = localFont({
  src: [
    {
      path: "../font/Junicode.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../font/Junicode-Italic.otf",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-junicode",
});

const bagossTrial = localFont({
  src: [
    {
      path: "../font/BagossStandardTRIAL-Regular.otf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-bagossTrial",
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
        className={`${junicode.variable} ${bagossTrial.variable} antialiased font-junicode text-[16px]/[130%]`}
      >
        <ViewModeProvider>
          <CartProvider>
            <Navbar />
            {children}
          </CartProvider>
        </ViewModeProvider>
      </body>
    </html>
  );
}
