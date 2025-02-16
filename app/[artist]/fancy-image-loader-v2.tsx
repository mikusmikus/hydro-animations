'use client';

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

interface FancyImageLoaderProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

const FancyImageLoaderV2: React.FC<FancyImageLoaderProps> = ({
  src,
  alt,
  width,
  height,
  className,
}) => {
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pixelsRef = useRef<
    { x: number; y: number; color: string; originalColor: string }[]
  >([]);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;
    setIsAnimationComplete(false);
    pixelsRef.current = [];

    const canvas = canvasRef.current;
    const container = containerRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set up canvas size
    const updateCanvasSize = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      return { width: rect.width, height: rect.height };
    };

    const { width: canvasWidth, height: canvasHeight } = updateCanvasSize();

    // Create a hidden image element
    const img = document.createElement('img');
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      // Create temporary canvas for image processing
      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d');
      if (!tempCtx) return;

      // Set temp canvas size to match image
      tempCanvas.width = img.width;
      tempCanvas.height = img.height;
      tempCtx.drawImage(img, 0, 0);

      // Calculate pixel size - smaller squares
      const pixelSize = Math.max(canvasWidth, canvasHeight) / 75; // Increased from 50 to 75 for smaller squares
      const cols = Math.ceil(canvasWidth / pixelSize);
      const rows = Math.ceil(canvasHeight / pixelSize);

      // Sample colors from the image
      pixelsRef.current = [];
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * pixelSize;
          const y = j * pixelSize;

          // Sample color from the center of each pixel
          const imageX = Math.floor((x / canvasWidth) * img.width);
          const imageY = Math.floor((y / canvasHeight) * img.height);
          const data = tempCtx.getImageData(imageX, imageY, 1, 1).data;

          pixelsRef.current.push({
            x,
            y,
            color: `rgb(${data[0]}, ${data[1]}, ${data[2]})`,
            originalColor: `rgb(${data[0]}, ${data[1]}, ${data[2]})`,
          });
        }
      }

      let lastDrawTime = 0;
      const frameInterval = 100;
      let frame = 0;
      const maxFrames = 10;

      const animate = (timestamp: number) => {
        if (timestamp - lastDrawTime >= frameInterval) {
          ctx.clearRect(0, 0, canvasWidth, canvasHeight);

          // Shuffle some pixels' colors randomly
          const shuffleCount = Math.floor(pixelsRef.current.length * 0.3); // Shuffle 30% of pixels
          for (let i = 0; i < shuffleCount; i++) {
            const randomIndex = Math.floor(
              Math.random() * pixelsRef.current.length
            );
            const randomColorIndex = Math.floor(
              Math.random() * pixelsRef.current.length
            );
            pixelsRef.current[randomIndex].color =
              pixelsRef.current[randomColorIndex].originalColor;
          }

          pixelsRef.current.forEach((pixel) => {
            ctx.fillStyle = pixel.color;
            ctx.globalAlpha = 0.7 + Math.random() * 0.3;
            ctx.fillRect(
              pixel.x + (Math.random() * 3 - 1.5),
              pixel.y + (Math.random() * 3 - 1.5),
              pixelSize,
              pixelSize
            );
          });

          // Reset some pixels back to their original color
          pixelsRef.current.forEach((pixel) => {
            if (Math.random() < 0.5) {
              // 50% chance to reset color
              pixel.color = pixel.originalColor;
            }
          });

          frame++;
          lastDrawTime = timestamp;
        }

        if (frame < maxFrames) {
          animationFrameRef.current = requestAnimationFrame(animate);
        } else {
          gsap.to(canvas, {
            opacity: 0,
            duration: 0.001,
            ease: 'power2.inOut',
            onComplete: () => {
              setIsAnimationComplete(true);
              canvas.style.display = 'none'; // Hide canvas completely
            },
          });
        }
      };

      // Make canvas visible and start animation
      canvas.style.opacity = '1';
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Set image source after setting up onload handler
    img.src = src;

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      pixelsRef.current = [];
    };
  }, [src]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className || ''}`}
      style={{
        width: '100%',
        height: '100%',
        aspectRatio: `${width}/${height}`,
      }}
    >
      <img
        src={src}
        alt={alt}
        className={`object-cover w-full h-full absolute inset-0 ${
          isAnimationComplete ? 'visible' : 'invisible'
        }`}
      />
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{
          width: '100%',
          height: '100%',
          opacity: 0,
          zIndex: 10,
          display: isAnimationComplete ? 'none' : 'block',
        }}
      />
    </div>
  );
};

export default FancyImageLoaderV2;
