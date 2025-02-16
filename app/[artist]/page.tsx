'use client';
import { motion } from 'framer-motion';
import { useParams, useRouter } from 'next/navigation';
import { artists } from '@/lib/data';
import Image from 'next/image';
import FancyImageLoader from './fancy-image-loader';
import FancyImageLoaderV2 from './fancy-image-loader-v2';

export default function ArtistPage() {
  const router = useRouter();
  const { artist } = useParams();
  const artistData = artists.find((a) => a.slug === artist);

  if (!artistData) {
    return <div>Artist not found</div>;
  }

  return (
    <div className="min-h-screen">
      <button
        onClick={() => router.back()}
        className="fixed top-4 left-4 text-white z-[10000] bg-black/50 px-4 py-2 rounded-md"
      >
        Back
      </button>

      <div className="relative">
        {/* Full screen image */}
        <FancyImageLoaderV2
          src={artistData.src}
          alt={artistData.title}
          width={artistData.width}
          height={artistData.height}
        />

        {/* Title overlay */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-8 left-8 text-white mix-blend-difference"
        >
          <h1 className="text-4xl font-mono font-bold">{artistData.title}</h1>
        </motion.div>
      </div>
    </div>
  );
}
