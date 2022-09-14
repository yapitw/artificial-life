export class Particle {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  color: string;
  vx = 0;
  vy = 0;
  size = 5;
  constructor(x: number, y: number, c: string, ctx: CanvasRenderingContext2D) {
    this.x = x;
    this.y = y;
    this.color = c;
    this.ctx = ctx;
  }

  update = () => {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x <= 0 || this.x >= 500) {
      this.vx *= -1;
    }
    if (this.y <= 0 || this.y >= 500) {
      this.vy *= -1;
    }
  };

  draw = () => {
    this.ctx.save();
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, this.size, this.size);
    this.ctx.restore();
  };
}
