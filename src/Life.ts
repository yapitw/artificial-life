// Life is amazing
import { Particle } from './Particle';

export class Life {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  isTerminated = false;
  width = window.innerWidth;
  height = window.innerHeight;

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

  resize = () => {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  };

  random = () => Math.random() * this.width;

  init = () => {
    this.groups.g1 = this.create(500, '#ffffff88');
    this.groups.g2 = this.create(1000, '#ff2299');
    this.groups.g3 = this.create(1000, '#ee22ff11');
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

  rule = (group1: Particle[], group2: Particle[], force: number) => {
    for (const p1 of group1) {
      let fx = 0;
      let fy = 0;
      for (const p2 of group2) {
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const d = Math.sqrt(dx * dx + dy * dy);

        if (d > 0 && d < 80) {
          const F = (force * 1) / d;
          fx += F * dx;
          fy += F * dy;
        }
      }
      p1.vx = (p1.vx + fx) * 0.5;
      p1.vy = (p1.vy + fy) * 0.5;
      p1.update({ width: this.width, height: this.height });
    }
  };

  update = () => {
    if (this.isTerminated) return;
    const { rule } = this;
    const { g1, g2, g3 } = this.groups;
    rule(g2, g2, -0.32);
    rule(g2, g3, -0.17);
    rule(g2, g1, 0.34);
    rule(g3, g3, -0.1);
    rule(g3, g2, -0.34);
    rule(g1, g1, 0.15);
    rule(g1, g2, -0.2);

    this.drawBackground('black');

    for (const particle of this.particles) {
      particle.draw();
    }

    window.requestAnimationFrame(this.update);
  };

  terminate() {
    this.isTerminated = true;
  }
}
