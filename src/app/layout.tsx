import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Session } from "next-auth";

import "./globals.css";
import ClientContextProvider from "@/components/ClientContextProvider";

export const metadata: Metadata = {
  title: "Review",
  description: "A place to review products",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
  pageProps = { session: null },
}: Readonly<{
  children: React.ReactNode;
  pageProps: { session: Session | null };
}>) {
  const { session } = pageProps;

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black`}
      >
        <ClientContextProvider session={session}>
          {children}
        </ClientContextProvider>
      </body>
    </html>
  );
}
