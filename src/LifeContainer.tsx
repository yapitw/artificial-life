import { useEffect, useRef } from 'react';
import { Life } from './Life';

export const LifeContainer = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const lifeInstance = useRef<Life>();

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (canvasRef.current && ctx) {
      const life = new Life(canvasRef.current, ctx);
      lifeInstance.current = life;

      window.addEventListener('resize', life.resize);
      return () => {
        lifeInstance.current?.terminate();
        window.removeEventListener('resize', life.resize);
      };
    }
  }, []);

  return (
    <canvas
      ref={canvasRef}
      onClick={() => {
        if (lifeInstance.current?.isTerminated) {
          lifeInstance.current.isTerminated = false;
          lifeInstance.current.update();
        } else {
          lifeInstance.current?.terminate();
        }
      }}
    />
  );
};
