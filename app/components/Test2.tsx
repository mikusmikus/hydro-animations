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
      panels.forEach((panel) => {
        ScrollTrigger.create({
          trigger: panel,
          start: () =>
            panel.offsetHeight < window.innerHeight
              ? 'top top'
              : 'bottom bottom',
          pin: true,
          pinSpacing: false,
        });
      });

      // Single ScrollTrigger for tracking all panels
      // ScrollTrigger.create({
      //   trigger: container.current,
      //   start: 'top top',
      //   end: 'bottom bottom',
      //   onUpdate: (self) => {
      //     // Get the scroll position relative to the viewport center
      //     const scrollPos = window.scrollY + window.innerHeight / 2;

      //     // Find the panel whose top is closest to the viewport center
      //     let activePanel = panels[0];
      //     let minDistance = Infinity;

      //     panels.forEach((panel) => {
      //       const rect = panel.getBoundingClientRect();
      //       const panelTop = rect.top + window.scrollY;
      //       const distance = Math.abs(scrollPos - panelTop);

      //       if (distance < minDistance) {
      //         minDistance = distance;
      //         activePanel = panel;
      //       }
      //     });

      //     console.log('Active panel:', activePanel.textContent?.trim());
      //   },
      // });
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
