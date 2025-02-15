'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import type { ScrollTrigger as ScrollTriggerType } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

interface ImageSectionProps {
  src: string;
  index: number;
  totalImages: number;
  imageRef: (el: HTMLDivElement | null) => void;
  // onActiveChange: (index: number) => void;
}

export const ImageSection = ({
  src,
  index,
  imageRef,
  // onActiveChange,
}: ImageSectionProps) => {
  const imageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let scrollTrigger: ScrollTriggerType | null = null;

    const initGSAP = async () => {
      if (typeof window === 'undefined' || !imageContainerRef.current) return;

      try {
        gsap.registerPlugin(ScrollTrigger);

        // Create the scroll trigger
        scrollTrigger = ScrollTrigger.create({
          trigger: imageContainerRef.current.parentElement,
          start: 'top top', // When the container hits the top of viewport
          end: 'bottom bottom', // When container bottom leaves viewport
          pin: imageContainerRef.current,
          // pinSpacing: false,
          // onEnter: () => onActiveChange(index),
          // onEnterBack: () => onActiveChange(index),
          // markers: true,
        });
      } catch (error) {
        console.error('Error initializing GSAP:', error);
      }
    };

    initGSAP();

    return () => {
      if (scrollTrigger) {
        scrollTrigger.kill();
      }
    };
  }, [index]);

  return (
    <div
      ref={imageRef}
      className="relative"
      // style={{
      //   // Space for scrolling
      //   zIndex: totalImages - index,
      // }}
    >
      <div ref={imageContainerRef}>
        <Image
          src={src || '/placeholder.svg'}
          alt={`Large image ${index + 1}`}
          fill
          className="object-cover"
          priority={index === 0}
        />
      </div>
    </div>
  );
};
