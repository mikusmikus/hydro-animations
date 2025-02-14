'use client';

import { useRef } from 'react';
import { ImageSection } from './components/ImageSection';
import { TitleOverlay } from './components/TitleOverlay';
import { useImageScroll } from './hooks/useImageScroll';

const images = [
  { src: 'https://picsum.photos/2200/1300', title: 'Image 1' },
  { src: 'https://picsum.photos/2400/1300', title: 'Image 2' },
  { src: 'https://picsum.photos/2600/1300', title: 'Image 3' },
  { src: 'https://picsum.photos/2200/1300', title: 'Image 4' },
  { src: 'https://picsum.photos/2100/1300', title: 'Image 5' },
];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { activeIndex } = useImageScroll({ containerRef, imageRefs });

  return (
    <main className="relative w-full">
      <div ref={containerRef} className="w-full">
        {images.map((image, index) => (
          <ImageSection
            key={index}
            src={image.src}
            index={index}
            totalImages={images.length}
            imageRef={(el) => (imageRefs.current[index] = el)}
          />
        ))}
      </div>
      <TitleOverlay titles={images} activeIndex={activeIndex} />
    </main>
  );
}
