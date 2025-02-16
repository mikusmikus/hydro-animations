import { useState, useRef, useEffect } from 'react';
const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export function useTextShuffle(
  originalText: string,
  isAnimating: boolean,
  onComplete?: () => void
) {
  const [displayText, setDisplayText] = useState(originalText);
  const intervalRef = useRef<NodeJS.Timeout>();
  const iterationRef = useRef(0);
  const textRef = useRef(originalText.toUpperCase());

  useEffect(() => {
    const handleShuffle = () => {
      const iteration = iterationRef.current;

      const newText = textRef.current
        .split('')
        .map((letter, index) => {
          // Preserve spaces
          if (letter === ' ') {
            return ' ';
          }
          // Return original letter if we've passed this index
          if (index < iteration) {
            return textRef.current[index];
          }
          // Otherwise return random letter
          return letters[Math.floor(Math.random() * 26)];
        })
        .join('');

      setDisplayText(newText);

      iterationRef.current += 1 / 3;

      if (iteration >= textRef.current.length) {
        clearInterval(intervalRef.current);
        onComplete?.(); // Call the callback when animation completes
      }
    };

    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Start animation if isAnimating is true
    if (isAnimating) {
      iterationRef.current = 0;
      intervalRef.current = setInterval(handleShuffle, 30);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAnimating, onComplete]);

  return displayText;
}
