'use client';

import { useRef, useState } from 'react';
import { ImageSection } from './components/ImageSection';
import { TitleOverlay } from './components/TitleOverlay';
import { useImageScroll } from './hooks/useImageScroll';
import { Test } from './components/Test';
import { DotToButtons } from './components/dot-to-buttons';
import { Test2 } from './components/Test2';

const images = [
  {
    src: '/images/_AAA9967.jpg',
    width: 1200,
    height: 2600,
    title: 'Image 1',
  },
  {
    src: '/images/_42A3062.jpg',
    width: 1400,
    height: 2600,
    title: 'Image 2',
  },
  {
    src: '/images/_AAA0150.jpg',
    width: 1600,
    height: 2600,
    title: 'Image 3',
  },
  {
    src: '/images/_AAA9965.jpg',
    width: 1200,
    height: 2600,
    title: 'Image 4',
  },
  {
    src: '/images/_AAA9967.jpg',
    width: 1200,
    height: 2600,
    title: 'Image 4',
  },
  {
    src: '/images/HYDRO_100R_DIE.jpg',
    width: 1100,
    height: 2600,
    title: 'Image 6',
  },
];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <main className="">
      <Test2 data={images} activeIndex={activeIndex} />
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
      <TitleOverlay
        titles={images.map((image) => image.title)}
        activeIndex={activeIndex}
      />
    </main>
  );
}
