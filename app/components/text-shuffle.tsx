'use client';

import { useTextShuffle } from '../hooks/useTextShuffle';

export function TextShuffle({
  text = 'Hello World',
  isAnimating = false,
  onComplete,
}: {
  text?: string;
  isAnimating?: boolean;
  onComplete?: () => void;
}) {
  const displayText = useTextShuffle(text, isAnimating, onComplete);

  return (
    <h1 className="text-4xl font-bold cursor-pointer absolute z-[200] top-10 bg-[white] p-4">
      {displayText}
    </h1>
  );
}
