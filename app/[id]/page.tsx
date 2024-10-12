import { Card } from "@/components/Card";
import { Metadata } from "next";

export const generateMetadata = ({ params }: { params: { id: string } }): Metadata => ({
  title: `Mint NFT | Swifli | ${params.id}`,
  description: "Swifli is a platform for creating and sharing your own NFTs.",
  openGraph: {
    title: `Mint NFT | Swifli | ${params.id}`,
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
});

function App({ params }: { params: { id: string } }) {
  return (
    <div
      className="w-full max-w-96 flex flex-col gap-4 justify-center items-center bg-black mt-8"
    >
      <Card id={params.id} />
    </div>
  );
}

export default App;
