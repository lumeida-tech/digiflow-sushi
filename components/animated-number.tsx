import React, { useState, useEffect } from 'react';

interface AnimatedNumberProps {
  target: number;
  duration?: number;
  className?: string;
}

export default function AnimatedNumber({ target, duration = 2000, className = '' }: AnimatedNumberProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    let start = 0;
    const startTime = Date.now();
    const frame = requestAnimationFrame(animate);

    function animate() {
      const progress = (Date.now() - startTime) / duration;
      if (progress < 1) {
        const value = Math.round(start + (target - start) * progress);
        setCurrent(value);
        requestAnimationFrame(animate);
      } else {
        setCurrent(target);
      }
    }

    return () => {
      cancelAnimationFrame(frame);
    };
  }, [target, duration]);

  return (
    <span className={`text-3xl font-bold text-temple-pink ${className}`}>{current.toLocaleString()}</span>
  );
}
