'use client';

import Image from "next/image";
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures'

const images = [
    "_42A3062.jpg", "_AAA0150.jpg", "_AAA9965.jpg", "_AAA9967.jpg"
];

// Duplicate images for a seamless effect
const loopedImages = [...images, ...images];

export default function Carousel() {
  const [emblaRef, _] = useEmblaCarousel(
    { loop: true, containScroll: "trimSnaps", duration: 40000, skipSnaps: true },
    [
      Autoplay({ delay: 0, stopOnInteraction: false, playOnInit: true }),
      WheelGesturesPlugin({ forceWheelAxis: 'y' }),
    ]
  );

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div className="embla h-full" ref={emblaRef}>
        <div className="embla__container flex h-full items-center">
          {loopedImages.map((src, index) => (
            <div
              className="embla__slide h-full min-w-0 flex-[0_0_45%]"
              key={index}
            >
              <div className="embla__slide__inner relative h-full">
                <Image
                  fill
                  alt="Carousel image"
                  src={`/images/${src}`}
                  className="absolute inset-0 size-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
