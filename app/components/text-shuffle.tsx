'use client';

import { useTextShuffle } from '../hooks/useTextShuffle';

export function TextShuffle({
  text = 'Hello World',
  isAnimating = false,
  onComplete,
  speed = 30,
}: {
  text?: string;
  isAnimating?: boolean;
  onComplete?: () => void;
  speed?: number;
}) {
  const displayText = useTextShuffle({
    originalText: text,
    isAnimating,
    onComplete,
    speed,
  });

  return (
    <span className="font-mono uppercase tabular-nums">{displayText}</span>
  );
}
