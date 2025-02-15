'use client';

import { useRef } from 'react';
import { ImageSection } from './components/ImageSection';
import { TitleOverlay } from './components/TitleOverlay';
import { useImageScroll } from './hooks/useImageScroll';
import { Test } from './components/Test';
import { DotToButtons } from './components/dot-to-buttons';
import { Test2 } from './components/Test2';

const images = [
  { src: 'https://picsum.photos/1200/2600', title: 'Image 1' },
  { src: 'https://picsum.photos/1400/2600', title: 'Image 2' },
  { src: 'https://picsum.photos/1600/2600', title: 'Image 3' },
  { src: 'https://picsum.photos/1200/2600', title: 'Image 4' },
  { src: 'https://picsum.photos/1100/2600', title: 'Image 5' },
];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  return (
    <main className="">
      <Test2 />
      {/* <DotToButtons /> */}
      {/* <Test /> */}
      {/* <div ref={containerRef} className="w-full">
        {images.map((image, index) => (
          <ImageSection
            key={index}
            src={image.src}
            index={index}
            totalImages={images.length}
            imageRef={(el) => (imageRefs.current[index] = el)}
          />
        ))}
      </div> */}
      {/* <TitleOverlay titles={images} activeIndex={activeIndex} /> */}
    </main>
  );
}
