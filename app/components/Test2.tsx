import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollToPlugin);

export function Test2({
  data,
  setActiveIndex,
}: {
  data: { src: string; title: string; width: number; height: number }[];
  setActiveIndex: (index: number) => void;
}) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const panels = gsap.utils.toArray('.wrapper') as HTMLElement[];
      console.log('panels', panels);

      // First ScrollTrigger for pinning
      panels.forEach((panel, index) => {
        ScrollTrigger.create({
          trigger: panel,
          start: () =>
            panel.offsetHeight < window.innerHeight
              ? 'top top'
              : 'bottom bottom',
          pin: true,
          pinSpacing: false,
        });

        // Additional ScrollTrigger for tracking center position
        ScrollTrigger.create({
          trigger: panel,
          start: 'top center',
          onToggle: (self) => {
            if (self.isActive) {
              setActiveIndex(index);
            }
          },
        });
      });
    },
    { scope: container }
  );

  const handleImageClick = (panel: HTMLElement, index: number) => {
    // Calculate offset by summing heights of previous panels
    const panels = gsap.utils.toArray('.wrapper') as HTMLElement[];
    const offset = panels
      .slice(0, index)
      .reduce((sum, panel) => sum + panel.offsetHeight, 0);

    gsap.to(window, {
      duration: 0.2,
      scrollTo: {
        y: offset,
        autoKill: false,
      },
      ease: 'power1.out',
      onComplete: () => {
        console.log('Scroll animation completed to index:', index);
      },
    });
  };

  return (
    <div ref={container} className="min-h-screen">
      {data.map((item, index) => (
        <div
          key={index}
          className="wrapper relative cursor-pointer"
          onClick={(e) => handleImageClick(e.currentTarget, index)}
        >
          <div className="bg-[red] relative size-full">
            <Image
              src={item.src}
              alt={item.title}
              width={item.width}
              height={item.height}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
