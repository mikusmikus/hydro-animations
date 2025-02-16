'use client';
import { motion } from 'framer-motion';
import { TextShuffle } from './text-shuffle';

interface TitleOverlayProps {
  titles: string[];
  activeIndex: number;
  onTitleClick: (index: number) => void;
}

export const TitleOverlay2 = ({
  titles,
  activeIndex,
  onTitleClick,
}: TitleOverlayProps) => {
  return (
    <div className="fixed z-[100] top-1/2 left-8 -translate-y-1/2 text-left min-w-[100px]">
      <div className="flex flex-col gap-2 text-sm font-mono isolate font-bold">
        {titles.map((title, index) => (
          <motion.div
            key={title}
            animate={{
              x: index === activeIndex ? 8 : 0,
              opacity: index === activeIndex ? 1 : 0.7,
            }}
            className="relative whitespace-nowrap text-[white] mix-blend-difference drop-shadow-md cursor-pointer"
            onClick={() => onTitleClick(index)}
          >
            {index === activeIndex ? (
              <TextShuffle text={title} isAnimating={true} />
            ) : (
              <span className="block whitespace-nowrap drop-shadow-md">
                {title}
              </span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};
