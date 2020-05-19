import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { timer } from 'rxjs';



class TimerHandler {

  component;
  timerCompleteListener;
  timeCount;
  
  init(component) {
    this.component = component;
  }

  getTime() {
    return this.timeCount;
  }
  setTimeCount(t) {
    this.timeCount = t;
  }
  setTimerCompleteListener(f) {
    this.timerCompleteListener = f;
  }
  reset() {
    this.timeCount = 0;
    this.timerCompleteListener = ()=>{}
  }
  start() {
    this.component.startClock();
  }
  stop() {
    this.component.stopClock();
  }
}

export const timerHandler = new TimerHandler;

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit, OnDestroy {
  @ViewChild('circle') circle: ElementRef;
  context;
  intervarId;

  constructor() {
    timerHandler.init(this);
    timerHandler.reset();
  }

  ngOnInit() {
    this.context = this.circle.nativeElement.getContext("2d");
    this.initCircle();
  }

  ngOnDestroy() {
    this.stopClock();
  }

  startClock() {
    this.stopClock();
    this.intervarId = setInterval(()=>{this.updateTimer()}, 1000);
  }

  stopClock() {
    if(this.intervarId) {
      clearInterval(this.intervarId);
      this.intervarId = undefined;
    }
  }

  initCircle() {
    this.context.clearRect(0, 0, 60, 60);

    this.context.beginPath();
    this.context.strokeStyle = "rgb(255, 68, 148)";
    this.context.lineWidth = 2;
    this.context.arc(30, 30, 29, 0, Math.PI * 2, false);
    this.context.stroke();
  }

  //called at every seconds.
  updateTimer() {
    this.initCircle();

    timerHandler.timeCount++;
    if(timerHandler.timeCount>60) {
      clearInterval(this.intervarId);
      this.intervarId = undefined;
      if(timerHandler.timerCompleteListener) timerHandler.timerCompleteListener();
    } else {
      this.updateCircle(6*timerHandler.timeCount);
    }
  }

  updateCircle(angle) {
    this.context.beginPath();
    this.context.moveTo(30, 30);
    this.context.fillStyle = "rgb(255, 68, 148)";
    this.context.arc(30, 30, 30, (Math.PI / 180) * -90, (Math.PI / 180) * (-90+angle), false);
    this.context.stroke();
    this.context.fill();
  }
}