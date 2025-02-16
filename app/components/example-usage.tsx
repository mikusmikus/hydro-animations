'use client';

import { useState } from 'react';
import { useTextShuffle } from '../hooks/useTextShuffle';

export function ExampleUsage() {
  const [isAnimating, setIsAnimating] = useState(false);
  const displayText = useTextShuffle("Custom Text", isAnimating);

  return (
    <div>
      <p className="font-mono">{displayText}</p>
      <button 
        onClick={() => setIsAnimating(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Animate
      </button>
    </div>
  );
} 