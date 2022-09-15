import { useEffect, useRef } from 'react';
import { Life } from './Life';

export const LifeContainer = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (canvasRef.current && ctx) {
      const life = new Life(canvasRef.current, ctx);
      return () => life.terminate();
    }
  }, []);

  return <canvas ref={canvasRef} />;
};
