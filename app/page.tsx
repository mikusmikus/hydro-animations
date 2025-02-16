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
import { artists } from '@/lib/data';

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
      <Test2
        data={artists}
        setActiveIndex={setActiveIndex}
        activeIndex={activeIndex}
      />
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
      {/* <TitleOverlay2
        titles={artists.map((artist) => artist.title)}
        activeIndex={activeIndex}
        onTitleClick={() => {}}
      /> */}
    </main>
  );
}
