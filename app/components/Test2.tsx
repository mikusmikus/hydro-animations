import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Artist } from '@/lib/data';
import { TitleOverlay2 } from './TitleOverlay2';
gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollToPlugin);

export function Test2({
  data,
  setActiveIndex,
  activeIndex,
}: {
  data: Artist[];
  setActiveIndex: (index: number) => void;
  activeIndex: number;
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

  const scrollToPanel = (index: number) => {
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
    });
  };

  const handleImageClick = (panel: HTMLElement, index: number) => {
    scrollToPanel(index);
    setTimeout(() => {
      console.log('pushing', data[index].slug);
      router.push(`/${data[index].slug}`);
    }, 300);
  };

  return (
    <div ref={container} className="min-h-screen">
      <TitleOverlay2
        titles={data.map((item) => item.title)}
        activeIndex={activeIndex}
        onTitleClick={scrollToPanel}
      />
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
