// Life is amazing

export class Particle {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  color: string;
  vx = 0;
  vy = 0;
  size = 10;
  constructor(x: number, y: number, c: string, ctx: CanvasRenderingContext2D) {
    this.x = x;
    this.y = y;
    this.color = c;
    this.ctx = ctx;
  }

  draw = () => {
    this.ctx.save();
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, this.size, this.size);
    this.ctx.restore();
  };
}

export class Life {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  isTerminated = false;

  width = 500;
  height = 500;

  particles: Particle[] = [];

  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    this.canvas = canvas;
    canvas.width = this.width;
    canvas.height = this.height;
    this.ctx = ctx;

    this.create(100, 'red');
    this.update();
  }

  random = () => Math.random() * (this.width - 100) + 50;

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
    // terminate instance
    this.isTerminated = true;
  }
}
