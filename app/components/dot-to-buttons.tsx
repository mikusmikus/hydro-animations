'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export function DotToButtons() {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleButtonClick = (action: string) => {
    setIsExpanded(false);

    console.log('Action:', action);
  };

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {!isExpanded ? (
          <motion.button
            key="dot"
            className="size-10 bg-slate-800 rounded-full hover:bg-slate-700 transition-colors flex items-center justify-center"
            onClick={() => setIsExpanded(true)}
            initial={{ scale: 1, opacity: 1 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{
              scale: 1,
              opacity: 1,
              transition: {
                duration: 0.15,
                ease: 'elastic.out(1, 0.3)',
              },
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              className="w-4 h-4"
            >
              <path d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" />
            </svg>
          </motion.button>
        ) : (
          <motion.div
            key="buttons"
            className="bg-slate-800 rounded-full p-1.5 inline-flex gap-2"
            initial={{
              width: '40px',
              opacity: 1,
            }}
            animate={{
              width: '108px',
              opacity: 1,
              transition: {
                duration: 0.2,
                ease: 'easeOut',
                opacity: { duration: 0.1 },
              },
            }}
            exit={{
              width: '36px',
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: 'easeInOut',
                opacity: { duration: 0.2, delay: 0.1 },
              },
            }}
          >
            <motion.button
              className="w-7 h-7 bg-slate-700 rounded-full hover:bg-slate-600 transition-colors flex items-center justify-center"
              initial={{ scale: 0, opacity: 1 }}
              animate={{
                scale: 1,
                opacity: 1,
                transition: {
                  duration: 0.15,
                  delay: 0.1,
                },
              }}
              exit={{
                scale: 0,
                opacity: 1,
                transition: {
                  duration: 0.15,
                  opacity: { duration: 0.1 },
                },
              }}
              onClick={() => handleButtonClick('like')}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                className="w-3.5 h-3.5"
              >
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
            </motion.button>
            <motion.button
              className="w-7 h-7 bg-slate-700 rounded-full hover:bg-slate-600 transition-colors flex items-center justify-center"
              initial={{ scale: 0, opacity: 1 }}
              animate={{
                scale: 1,
                opacity: 1,
                transition: {
                  duration: 0.15,
                  delay: 0.15,
                },
              }}
              exit={{
                scale: 0,
                opacity: 1,
                transition: {
                  duration: 0.15,
                  opacity: { duration: 0.1 },
                },
              }}
              onClick={() => handleButtonClick('share')}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                className="w-3.5 h-3.5"
              >
                <path d="M11.47 1.72a.75.75 0 011.06 0l3 3a.75.75 0 01-1.06 1.06l-1.72-1.72V7.5h-1.5V4.06L9.53 5.78a.75.75 0 01-1.06-1.06l3-3zM11.25 7.5V15a.75.75 0 001.5 0V7.5h3.75a3 3 0 013 3v9a3 3 0 01-3 3h-9a3 3 0 01-3-3v-9a3 3 0 013-3h3.75z" />
              </svg>
            </motion.button>
            <motion.button
              className="w-7 h-7 bg-slate-700 rounded-full hover:bg-slate-600 transition-colors flex items-center justify-center"
              initial={{ scale: 0, opacity: 1 }}
              animate={{
                scale: 1,
                opacity: 1,
                transition: {
                  duration: 0.15,
                  delay: 0.2,
                },
              }}
              exit={{
                scale: 0,
                opacity: 1,
                transition: {
                  duration: 0.15,
                  opacity: { duration: 0.1 },
                },
              }}
              onClick={() => handleButtonClick('close')}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                className="w-3.5 h-3.5"
              >
                <path
                  fillRule="evenodd"
                  d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
