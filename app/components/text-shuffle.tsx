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
    <span className="font-mono uppercase tabular-nums">{displayText}</span>
  );
}
