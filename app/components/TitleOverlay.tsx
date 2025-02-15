import useEmblaCarousel from 'embla-carousel-react';
import { useEffect, useCallback } from 'react';

interface TitleOverlayProps {
  titles: string[];
  activeIndex: number;
}

export const TitleOverlay = ({ titles, activeIndex }: TitleOverlayProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
    containScroll: 'keepSnaps',
    axis: 'y',
  });

  const scrollTo = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index);
    },
    [emblaApi]
  );

  useEffect(() => {
    if (emblaApi) {
      scrollTo(activeIndex);
    }
  }, [activeIndex, emblaApi, scrollTo]);

  return (
    <div className="fixed z-[100] top-1/2 left-8 -translate-y-1/2">
      <div className="h-[300px] overflow-hidden" ref={emblaRef}>
        <div className="flex flex-col gap-6">
          {titles.map((title, index) => (
            <div
              key={index}
              className={`flex-[0_0_auto] transition-all duration-300
                ${
                  index === activeIndex
                    ? 'text-[12px] font-medium opacity-100 translate-x-4'
                    : 'text-[10px] opacity-30'
                }`}
            >
              <h2 className="text-white mix-blend-difference whitespace-nowrap">
                {title}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
