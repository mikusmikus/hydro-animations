'use client';

import { useRef, useState } from 'react';
import { ImageSection } from './components/ImageSection';
import { TitleOverlay } from './components/TitleOverlay';
import { useImageScroll } from './hooks/useImageScroll';
import { Test } from './components/Test';
import { DotToButtons } from './components/dot-to-buttons';
import { Test2 } from './components/Test2';
import { TextShuffle } from './components/text-shuffle';
import { TitleOverlay2 } from './components/TitleOverlay2';
const images = [
  {
    src: '/images/_AAA9967.jpg',
    width: 1200,
    height: 2600,
    title: 'SABINE MARCELIS',
    description: 'Design through material and light',
    slug: 'sabine-marcelis',
  },
  {
    src: '/images/_42A3062.jpg',
    width: 1400,
    height: 2600,
    title: 'KEIJI TAKEUCHI',
    description: 'Minimal design with maximum impact',
    slug: 'keiji-takeuchi',
  },
  {
    src: '/images/_AAA0150.jpg',
    width: 1600,
    height: 2600,
    title: 'CECILIE MANZ',
    description: 'Scandinavian simplicity meets modern function',
    slug: 'cecilie-manz',
  },
  {
    src: '/images/_AAA9965.jpg',
    width: 1200,
    height: 2600,
    title: 'DANIEL RYBAKKEN',
    description: 'Light and shadow in harmony',
    slug: 'daniel-rybakken',
  },
  {
    src: '/images/_AAA9967.jpg',
    width: 1200,
    height: 2600,
    title: 'STEFAN DIEZ',
    description: 'Industrial elegance with sustainable approach',
    slug: 'stefan-diez',
  },
  {
    src: '/images/HYDRO_100R_DIE.jpg',
    width: 1100,
    height: 2600,
    title: 'HYDRO',
    description: 'Innovative aluminum design and engineering',
    slug: 'hydro',
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
      <div className="fixed top-10 left-10 z-[200] text-white">
        <TextShuffle
          text="This is some shuffle text"
          isAnimating={isShuffling}
          onComplete={handleComplete}
        />
      </div>
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
      <TitleOverlay2
        titles={images.map((image) => image.title)}
        activeIndex={activeIndex}
      />
    </main>
  );
}
