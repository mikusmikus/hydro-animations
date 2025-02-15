import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function Test2() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const panels = gsap.utils.toArray('.panel') as HTMLElement[];
      // we'll create a ScrollTrigger for each panel just to track when each panel's top hits the top of the viewport (we only need this for snapping)
      // const tops = panels.map((panel) =>
      //   ScrollTrigger.create({ trigger: panel, start: 'top top' })
      // );
      console.log('panels', panels);

      panels.forEach((panel) => {
        ScrollTrigger.create({
          trigger: panel,
          // start: 'top top',
          start: () =>
            panel.offsetHeight < window.innerHeight
              ? 'top top'
              : 'bottom bottom', // if it's shorter than the viewport, we prefer to pin it at the top
          pin: true,
          pinSpacing: false,
        });
      });
    },
    { scope: container }
  );

  return (
    <div ref={container}>
      <div className="description panel blue" style={{ height: '80vh' }}>
        <div>
          <h1>Variable height stacked pinning</h1>
          <p>Use pinning to layer panels on top of each other as you scroll.</p>
          <div className="scroll-down">
            Scroll down<div className="arrow"></div>
          </div>
        </div>
      </div>

      <section className="panel red z-10" style={{ height: '80vh' }}>
        ONE
      </section>
      <section className="panel orange z-20" style={{ height: '220vh' }}>
        TWO
      </section>
      <section className="panel purple z-30" style={{ height: '50vh' }}>
        THREE
      </section>
      <section className="panel green z-40">FOUR</section>
    </div>
  );
}
