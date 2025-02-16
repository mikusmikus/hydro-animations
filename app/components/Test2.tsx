import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Artist } from '@/lib/data';
gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollToPlugin);

export function Test2({
  data,
  setActiveIndex,
}: {
  data: Artist[];
  setActiveIndex: (index: number) => void;
}) {
  const router = useRouter();
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
      duration: 0.3,
      scrollTo: {
        y: offset,
        autoKill: false,
      },
      ease: 'power1.out',
      onComplete: () => {
        setTimeout(() => {
          console.log('pushing', data[index].slug);
          router.push(`/${data[index].slug}`);
        }, 300);
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
          <div className="relative size-full">
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
