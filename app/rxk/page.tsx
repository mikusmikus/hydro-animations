"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

const LOREM = "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat quis quidem eaque quia ducimus, modi molestiae eius? Voluptates, ex dolores, maiores sequi aut minus similique, quod ab alias eos fugit?"

export default function Home() {
  const [isOpen, setIsOpen] = useState(false)

  const handleToggleOpenState = () => setIsOpen((prev) => !prev)

  return (
    <main className="h-[200dvh] bg-[#3b3b3b] relative">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/10 z-40"
            onClick={handleToggleOpenState}
            transition={{ duration: 1 }}
          />
        )}
      </AnimatePresence>
      <motion.div
        animate={{
          width: isOpen ? '90%' : 200,
          height: isOpen ? '90%' : 48,
          x: "-50%",
          backgroundColor: isOpen ? "#FFDDC1" : "#abcdef",
        }}
        transition={{ duration: 1, ease: [0.32, 0.72, 0, 1] }}
        style={{ transformOrigin: "bottom center" }}
        className="fixed left-1/2 bottom-8 rounded-2xl overflow-hidden z-50 lg:max-w-[500px]"
      >
        <div className="relative w-full h-full">
          <AnimatePresence mode="wait">
            {!isOpen && (
              <motion.button
                onClick={handleToggleOpenState}
                className="absolute bottom-0 left-0 w-full h-12 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.3, delay: 0.7 } }}
                exit={{ opacity: 0, transition: { duration: 0.3 } }}
                key="open-button"
              >
                Open
              </motion.button>
            )}
          </AnimatePresence>
          {isOpen && (
            <div className="h-full w-full p-6 flex flex-col gap-10">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
                className="flex w-full justify-between items-center"
              >
                <h2>Modal&apos;s heading</h2>
                <button
                  onClick={handleToggleOpenState}
                  className="p-2 rounded-full hover:bg-black/5"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </motion.div>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, delay: 1.25 }}
                    className="flex flex-col items-center justify-center gap-10"
                  >
                    <motion.div transition={{ duration: 1, delay: 1.25 }}>{LOREM}</motion.div>
                    <motion.div transition={{ duration: 1, delay: 1.5 }}>{LOREM}</motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </motion.div>
    </main>
  )
}