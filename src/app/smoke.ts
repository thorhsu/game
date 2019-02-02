export class Smoke {
    winSpeed: number; // 
    x: number; // X初始座標
    y: number; // Y初始座標
    vx: number; // 橫向速度
    vy: number; // 縱向速度
    size: number; // 煙的大小
    alpha: number; // 透明度
    frameWidth: number; // 框寬
    frameHeight: number; // 框高
    constructor(x: number, y: number, vx: number, vy: number, windSpeed: number, frameWidth: number, frameHeight: number) {
        vx += (windSpeed * 0.16);
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.size = 20;
        this.alpha = 1;
        this.frameHeight = frameHeight;
        this.frameWidth = frameWidth;
    }
    update() {
       this.x += this.vx;
       this.y += this.vy;
       this.size += 0.8; // 煙尺寸逐漸變大
       if (this.alpha > 0.01) {
           this.alpha -= 0.005; // 慢慢變淡
       }
       // console.log(this.alpha);
       return this.x > 0 && this.y > 0 &&
          this.x <= this.frameWidth && this.y <= this.frameHeight;
    }
    draw(ctx, smokeParticle) {
        ctx.globalAlpha = this.alpha;
        // x必須除以2。因為中心點是在圖的中間位置
        ctx.drawImage(smokeParticle, this.x - this.size / 2, this.y, this.size, this.size);
    }
}
