export class Particle {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  color: string;
  vx = Math.random();
  vy = Math.random();
  size = 1.5;
  constructor(x: number, y: number, c: string, ctx: CanvasRenderingContext2D) {
    this.x = x;
    this.y = y;
    this.color = c;
    this.ctx = ctx;
  }

  update = (bound: { width: number; height: number }) => {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x <= 0) {
      this.vx = Math.abs(this.vx)
    }
    if (this.x >= bound.width) {
      this.vx = -Math.abs(this.vx)
    }
    if (this.y <= 0) {
      this.vy = Math.abs(this.vy);
    }

    if (this.y >= bound.height) {
      this.vy = -Math.abs(this.vy);
    }
  };

  draw = () => {
    this.ctx.save();
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, this.size, this.size);
    this.ctx.restore();
  };
}
