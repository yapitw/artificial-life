import { useEffect, useRef } from 'react';
import { Life } from './Life';

export const LifeContainer = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const life = new Life(canvasRef.current);
    }

    return () => life.terminalte();
  }, []);

  return <canvas ref={canvasRef} />;
};
