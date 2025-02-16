'use client';

import React from 'react';
import { useState, useEffect, useRef } from 'react';

interface FancyImageLoaderProps {
  children: React.ReactElement;
  className?: string;
}

const FancyImageLoader: React.FC<FancyImageLoaderProps> = ({
  children,
  className,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateCanvasSize = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      return { width: rect.width, height: rect.height };
    };

    const { width, height } = updateCanvasSize();

    const pixelSize = Math.min(width, height) / 30;
    const cols = Math.ceil(width / pixelSize);
    const rows = Math.ceil(height / pixelSize);

    let frame = 0;
    const totalFrames = 10;
    const frameDuration = 50;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * pixelSize;
          const y = j * pixelSize;
          const randomColor = Math.floor(Math.random() * 255);
          ctx.fillStyle = `rgba(${randomColor}, ${randomColor}, ${randomColor}, 0.5)`;
          ctx.fillRect(x, y, pixelSize, pixelSize);
        }
      }

      frame++;

      if (frame < totalFrames) {
        setTimeout(() => requestAnimationFrame(animate), frameDuration);
      } else {
        setIsLoaded(true);
      }
    };

    requestAnimationFrame(animate);

    return () => {
      ctx.clearRect(0, 0, width, height);
    };
  }, []); // Only run once on mount

  const enhancedChild = React.cloneElement(children, {
    className: `object-cover w-full h-full inset-0 absolute transition-opacity duration-500 ${
      isLoaded ? 'opacity-100' : 'opacity-0'
    } ${children.props.className || ''}`,
  });

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className || ''}`}
      style={{
        width: children.props.width || '100%',
        height: children.props.height || 'auto',
        aspectRatio:
          children.props.width && children.props.height
            ? `${children.props.width}/${children.props.height}`
            : 'auto',
      }}
    >
      {enhancedChild}
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 transition-opacity duration-500 ${
          isLoaded ? 'opacity-0' : 'opacity-50'
        }`}
        style={{
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  );
};

export default FancyImageLoader;
