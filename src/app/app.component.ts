import { Component } from '@angular/core';
import { Smoke } from './smoke';
import { from } from 'rxjs';
import { filter, toArray, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'game';
  ctx;
  smokes: Smoke[] = []; // 所有煙霧
  originX1 = 100;
  originY1 = 400;
  windSpeed = -3; // 風速
  smokeParticle;
  startX;

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
  }

  refresh(ctx) {
    ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    from(this.smokes)
    .pipe(
      filter((smoke: Smoke) => smoke.canUpdate()),
      tap((smoke: Smoke) =>  smoke.draw(ctx, this.smokeParticle)),
      toArray()
    ).subscribe((smokes: Smoke[]) => this.smokes = smokes);
  }
  makeAnotherSmoke(event) {
    this.makeSmokes((event.clientX) - (window.innerWidth - this.ctx.canvas.width + this.originX1 + 10) / 2, event.clientY);
  }
  makeSmokes(x: number, y: number) {
    const vx = Math.random() * 0.3 * (Math.random() < 0.5 ? 1 : -1);
    const vy = Math.random() * 0.7 - 2;
    const smoke = new Smoke(x, y, vx, vy, this.windSpeed, this.ctx.canvas.width, this.ctx.canvas.height);
    this.smokes.push(smoke);
  }
  initiate(canvas) {
    this.ctx = canvas.getContext('2d');
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.smokeParticle = new Image();
    this.smokeParticle.src = '../assets/train/particle-smoke.png';
    this.startX = this.originX1;
    this.smokeParticle.onload = () => {
        window.setInterval(() => this.makeSmokes((this.startX += 1), this.originY1), 60);
        window.setInterval(() => this.refresh(this.ctx), 20);
    };
  }


}
