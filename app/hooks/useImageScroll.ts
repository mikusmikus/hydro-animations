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

      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;

      for (let index = 0; index < imageRefs.current.length; index++) {
        const imageRef = imageRefs.current[index];
        if (!imageRef) continue;

        // Step 1: Get current image measurements
        const rect = imageRef.getBoundingClientRect();
        const offsetTop = imageRef.offsetTop;

        // Step 2: Get next image if it exists
        const nextImage = imageRefs.current[index + 1];

        // Step 3: Calculate trigger points
        // Point where image bottom reaches viewport bottom
        const fixTriggerPoint = offsetTop + rect.height - windowHeight;
        // Point where next image starts to enter (if there is a next image)
        const releaseTriggerPoint = nextImage
          ? nextImage.offsetTop - windowHeight
          : Infinity;

        // Step 4: Determine if image should be fixed
        const shouldBeFixed =
          scrollY >= fixTriggerPoint && scrollY < releaseTriggerPoint;

        // Step 5: Update active index
        if (shouldBeFixed) {
          setActiveIndex(index);
        }

        // Step 6: Apply appropriate styles
        if (shouldBeFixed) {
          // Fix image to viewport bottom
          imageRef.style.position = 'fixed';
          imageRef.style.top = `${windowHeight - rect.height}px`; // Positions bottom at viewport bottom
          imageRef.style.left = '0';
          imageRef.style.right = '0';
          imageRef.style.width = '100%';
          imageRef.style.height = '150vh';
          imageRef.style.zIndex = `${imageRefs.current.length - index}`;
        } else {
          // Return to normal scroll
          imageRef.style.position = 'relative';
          imageRef.style.top = '0';
          imageRef.style.left = '0';
          imageRef.style.right = '0';
          imageRef.style.width = '100%';
          imageRef.style.height = '150vh';
          imageRef.style.zIndex = `${imageRefs.current.length - index}`;
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
