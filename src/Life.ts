// Life is amazing
import { getKernel } from './GPU';
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
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;

  };



  init = () => {
    this.groups.g1 = this.create(2000, '#ffffff7f');
    this.groups.g2 = this.create(2000, '#ff00bbab');
    this.groups.g3 = this.create(2000, '#22ff909a');
  };

  create = (amount: number, color: string) => {
    const group: Particle[] = [];
    for (let i = 0; i < amount; i++) {
      const particle = new Particle(
        Math.random() * this.width,
        Math.random() * this.height,
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
    const mapPropsToArray = (p: Particle) => ([p.x, p.y, p.vx, p.vy])

    const g1Array = group1.map(mapPropsToArray)
    const g2Array = group2.map(mapPropsToArray)

    const calculateForces = getKernel(group1.length, group2.length, force)

    const result = calculateForces(g1Array, g2Array) as [number, number, number, number][]

    group1.forEach((particle, index) => {
      const [x, y, vx, vy] = result[index]
      particle.vx = particle.vx * 0.5 + vx * 0.5
      particle.vy = particle.vy * 0.5 + vy * 0.5
      particle.update({ width: this.width, height: this.height });
    })
  };

  update = () => {
    if (this.isTerminated) return;
    const { rule } = this;
    const { g1, g2, g3 } = this.groups;

    rule(g1, g1, 0.15);
    rule(g1, g2, -0.2);
    rule(g1, g3, -0.01);

    rule(g2, g1, 0.34);
    rule(g2, g2, -0.32);
    rule(g2, g3, -0.17);

    rule(g3, g1, -0.01);
    rule(g3, g2, -0.34);
    rule(g3, g3, -0.1);


    this.drawBackground('#000000');

    for (const particle of this.particles) {
      // particle.update({ width: this.width, height: this.height });
      particle.draw();
    }

    window.requestAnimationFrame(this.update);
  };

  terminate() {
    this.isTerminated = true;
  }
}
