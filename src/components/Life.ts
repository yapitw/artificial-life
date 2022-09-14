// Life is amazing
import { Particle } from "./Particle";

export class Life {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  isTerminated = false;
  width = 500;
  height = 500;

  particles: Particle[] = [];
  groups: Record<string, Particle[]> = {};

  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    this.canvas = canvas;
    canvas.width = this.width;
    canvas.height = this.height;
    this.ctx = ctx;
    this.init();
    this.update();
  }

  random = () => Math.random() * (this.width - 100) + 50;

  init = () => {
    this.groups['yellow'] = this.create(200, 'yellow');
    this.groups['purple'] = this.create(200, 'purple');
  };

  create = (amount: number, color: string) => {
    const group: Particle[] = [];
    for (let i = 0; i < amount; i++) {
      const particle = new Particle(
        this.random(),
        this.random(),
        color,
        this.ctx
      );
      group.push(particle);
      this.particles.push(particle);
    }

    return group;
  };

  drawBackground = (color: string) => {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(0, 0, this.width, this.height);
  };

  update = () => {
    if (this.isTerminated) return;
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.drawBackground('black');

    for (const particle of this.particles) {
      particle.draw();
    }
  };

  terminate() {
    this.isTerminated = true;
  }
}
