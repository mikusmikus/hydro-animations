import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function Test2({
  data,
}: {
  data: { src: string; title: string; width: number; height: number }[];
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
              console.log('Panel centered:', index);
            }
          },
        });
      });
    },
    { scope: container }
  );

  return (
    <div ref={container} className="min-h-screen">
      {data.map((item, index) => (
        <div key={index} className="wrapper relative">
          <div className="bg-[red] relative">
            <Image
              src={item.src}
              alt={item.title}
              width={item.width}
              height={item.height}
              className="object-cover w-full"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
