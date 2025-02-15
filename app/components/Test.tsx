import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export function Test() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const boxes = gsap.utils.toArray('.panel') as HTMLElement[];
      boxes.forEach((box) => {
        gsap.to(box, {
          x: 150,
          scrollTrigger: {
            trigger: box,
            start: 'bottom bottom',
            end: 'top 20%',
            scrub: true,
            // markers: true,
          },
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="panels-container">
      <div className="description panel  transtions-all blue">
        <div>
          <h1>Variable height stacked pinning</h1>
          <p>Use pinning to layer panels on top of each other as you scroll.</p>
          <div className="scroll-down">
            Scroll down<div className="arrow"></div>
          </div>
        </div>
      </div>
      <section className="panel  transtions-all red">ONE</section>
      <section
        className="panel  transtions-all orange"
        style={{ height: '220vh' }}
      >
        TWO
      </section>
      <section
        className="panel  transtions-all purple"
        style={{ height: '150vh' }}
      >
        THREE
      </section>
      <section className="panel  transtions-all green">FOUR</section>
    </div>
  );
}
