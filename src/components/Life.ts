// Life is amazing

export class Particle {}

export class Life {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
  }

  init() {}

  draw = (x, y, c, s) => {};

  terminate() {
    // terminate instance
  }
}
