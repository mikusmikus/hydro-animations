"use client"

import clsx from "clsx"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function Navigation() {
  const [isMarginAnimated, setIsMarginAnimated] = useState(false)
  const [isTextVisible, setIsTextVisible] = useState({
    name: false,
    about: false,
    index: false,
  })

  useEffect(() => {
    setIsMarginAnimated(true)

    const nameTimer = setTimeout(() => setIsTextVisible(prev => ({ ...prev, name: true })), 250)
    const aboutTimer = setTimeout(() => setIsTextVisible(prev => ({ ...prev, about: true })), 300)
    const indexTimer = setTimeout(() => setIsTextVisible(prev => ({ ...prev, index: true })), 450)

    return () => {
      clearTimeout(nameTimer)
      clearTimeout(aboutTimer)
      clearTimeout(indexTimer)
    }
  }, [])

  return (
    <div
      className={clsx(
        "fixed z-50 m-3 flex flex-row items-center justify-center p-[2px] rounded-full bg-black/25 backdrop-blur-md w-fit left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
        "duration-500"
      )}
    >
      {[
        { href: "/", label: "Austen Goodman", width: "w-[102px]", visible: isTextVisible.name },
        { href: "/", label: "About", width: "w-[36px]", visible: isTextVisible.about },
        { href: "/", label: "Index", width: "w-[33px]", visible: isTextVisible.index },
      ].map(({ href, label, width, visible }) => (
        <Link
          key={label}
          href={href}
          className={clsx(
            "transition-all bg-gray-300 w-fit text-nowrap px-3 py-[6px] rounded-full duration-500 border-none ease-[cubic-bezier(0.5,0,0,1)] last:mr-0",
            {
              "-mr-6": !isMarginAnimated,
              "mr-[-3px]": isMarginAnimated,
            },
          )}
        >
          <p
            className={clsx(
              "transition-all duration-500 ease-[cubic-bezier(0.5,0,0,1)] flex overflow-hidden justify-center",
              visible ? `${width} blur-none opacity-100` : "w-0 blur-sm opacity-0"
            )}
          >
            <span className="transition-all ease-[cubic-bezier(0.25,0,0.5,1)] duration-200 text-black text-nowrap text-[12px] hover:opacity-50">
              {label}
            </span>
          </p>
        </Link>
      ))}
    </div>
  )
}
