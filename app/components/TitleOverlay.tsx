'use client';
import { motion } from 'framer-motion';

interface TitleOverlayProps {
  titles: string[];
  activeIndex: number;
}

export const TitleOverlay = ({ titles, activeIndex }: TitleOverlayProps) => {
  return (
    <div className="fixed z-[100] top-1/2 left-8 -translate-y-1/2 text-left bg-[lightblue] w-[100px]">
      <div className="flex flex-col gap-2">
        {titles.map((title, index) => (
          <motion.div
            key={title}
            animate={{
              x: index === activeIndex ? 16 : 0,
              opacity: index === activeIndex ? 1 : 0.7,
            }}
            className="text-black relative"
          >
            {index === activeIndex ? (
              <SplitText text={title} />
            ) : (
              <span className="text-[14px] block">{title}</span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const SplitText = ({ text }: { text: string }) => {
  return (
    <div className="flex items-center gap-[0.05em] h-[24px]">
      {text.split('').map((char, index) => (
        <div key={index} className="relative h-full overflow-hidden">
          <motion.span
            initial={{ y: 24 }}
            animate={{ y: 0 }}
            transition={{
              duration: 0.5,
              delay: index * 0.05,
              ease: [0.33, 1, 0.68, 1],
            }}
            className="text-[16px] font-medium block"
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        </div>
      ))}
    </div>
  );
};
