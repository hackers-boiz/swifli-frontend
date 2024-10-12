import type { Metadata } from "next";
import { Chakra_Petch } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { Suspense } from "react";

const inter = Chakra_Petch({ weight: ["300", "400", "500", "600", "700"], subsets: ['latin'] });

export const metadata: Metadata = {
  title: `Mint NFT | Swifli`,
  description: "Swifli is a platform for creating and sharing your own NFTs.",
  openGraph: {
    title: 'Mint NFT | Swifli',
    description:
      'Swifli is a platform for creating and sharing your own NFTs.',
    // images: [{ url: 'https://swifli-frontend.vercel.app/og-bg.jpg' }],
    type: 'website',
    url: 'https://swifli.xyz',
    siteName: 'Swifli',
  },
  // twitter: {
  // card: 'summary_large_image',
  // site: 'Swifli',
  // creator: 'swifli',
  // images: [{ url: 'https://swifli-frontend.vercel.app/og-bg.jpg' }],
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-white">
      <Analytics />
      <Suspense>
        <body className={`${inter.className} w-screen h-screen overflow-hidden flex items-center justify-center bg-black`}>{children}</body>
      </Suspense>
    </html>
  );
}
