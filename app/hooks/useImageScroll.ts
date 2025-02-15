import { useState, useEffect, RefObject } from 'react';

interface UseImageScrollProps {
  containerRef: RefObject<HTMLDivElement>;
  imageRefs: RefObject<(HTMLDivElement | null)[]>;
}

export const useImageScroll = ({
  containerRef,
  imageRefs,
}: UseImageScrollProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !imageRefs.current) return;

      // Process images in reverse order to handle overlapping correctly
      for (let i = imageRefs.current.length - 1; i >= 0; i--) {
        const imageRef = imageRefs.current[i];
        if (!imageRef) continue;

        const rect = imageRef.getBoundingClientRect();
        const stickyContainer = imageRef.firstElementChild as HTMLElement;
        if (!stickyContainer) continue;

        const stickyRect = stickyContainer.getBoundingClientRect();
        const containerTop = rect.top;
        const containerBottom = rect.bottom;

        // Calculate when image should be considered active
        // Image is active when it's in sticky state and fully visible
        if (
          containerTop < 0 && // Container has scrolled up
          containerBottom > stickyRect.height && // Container hasn't been scrolled past
          stickyRect.top === 0 // Image is stuck to top
        ) {
          setActiveIndex(i);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial position setup

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [containerRef, imageRefs]);

  return { activeIndex };
};
