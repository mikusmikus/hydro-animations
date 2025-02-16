'use client';

import { useRef, useState } from 'react';
import { ImageSection } from './components/ImageSection';
import { TitleOverlay } from './components/TitleOverlay';
import { useImageScroll } from './hooks/useImageScroll';
import { Test } from './components/Test';
import { DotToButtons } from './components/dot-to-buttons';
import { Test2 } from './components/Test2';
import { TextShuffle } from './components/text-shuffle';

const images = [
  {
    src: '/images/_AAA9967.jpg',
    width: 1200,
    height: 2600,
    title: 'Image 1',
    description: 'Description 1',
  },
  {
    src: '/images/_42A3062.jpg',
    width: 1400,
    height: 2600,
    title: 'Image 2',
    description: 'Description 2',
  },
  {
    src: '/images/_AAA0150.jpg',
    width: 1600,
    height: 2600,
    title: 'Image 3',
    description: 'Description 3',
  },
  {
    src: '/images/_AAA9965.jpg',
    width: 1200,
    height: 2600,
    title: 'Image 4',
    description: 'Description 4',
  },
  {
    src: '/images/_AAA9967.jpg',
    width: 1200,
    height: 2600,
    title: 'Image 5',
  },
  {
    src: '/images/HYDRO_100R_DIE.jpg',
    width: 1100,
    height: 2600,
    title: 'Image 6',
    description: 'Description 6',
  },
];

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isShuffling, setIsShuffling] = useState(false);

  const handleComplete = () => {
    console.log('Animation completed!');
    setIsShuffling(false); // Reset the animation state
  };

  return (
    <main className="">
      <TextShuffle
        text="Hello World"
        isAnimating={isShuffling}
        onComplete={handleComplete}
      />
      <button
        onClick={() => setIsShuffling(true)}
        className="fixed top-0 left-10 text-sm z-[200] bg-white px-4 py-2 rounded"
      >
        Trigger Shuffle
      </button>
      <Test2 data={images} setActiveIndex={setActiveIndex} />
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
