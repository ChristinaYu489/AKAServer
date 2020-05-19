import { Component, OnInit, ViewChild } from '@angular/core';
import { AudioAnalyser } from '../../../audio-analyser';

@Component({
  selector: 'app-fft-graph',
  templateUrl: './fft-graph.component.html',
  styleUrls: ['./fft-graph.component.css']
})
export class FftGraphComponent implements OnInit {

  @ViewChild('audio1') audio1;
  audioPath1 = "";
  audioAnalyser1;
  fftListAudio1 = [];
  fftSumListAudio1 = [];
  audio1VisibleXpos = 0;
  isLoop1 = false;
  
  @ViewChild('audio2') audio2;
  audioAnalyser2;
  fftListAudio2 = [];
  fftSumListAudio2 = [];
  peakIndexListAudio2 = [];
  audio2VisibleXpos = 0;
  isLoop2 = false;

  @ViewChild('canvas') canvasView;
  canvasContext;

  constructor() { }

  ngOnInit() {
    fftGraphHandler.init(this);
    this.audioAnalyser1 = new AudioAnalyser;
    this.audioAnalyser1.init(this.audio1.nativeElement);
    this.audioAnalyser1.setOnStartListener(()=>{
      this.fftListAudio1 = [];
    });
    this.audioAnalyser1.setDataCaptureListener((freq)=>{
      this.fftListAudio1.push(freq.slice(2, 127));
    });
    this.audioAnalyser1.setOnEndedListener(()=>{
      if(this.fftSumListAudio1.length==0) this.fftSumListAudio1 = this.fftNormalize(this.fftListAudio1);
      this.startGraphAnimation1(this.canvasContext);
    });

    this.audioAnalyser2 = new AudioAnalyser;
    this.audioAnalyser2.init(this.audio2.nativeElement);
    this.audioAnalyser2.setOnStartListener(()=>{
      this.fftListAudio2 = [];
      this.fftSumListAudio2 = [];
    });
    this.audioAnalyser2.setDataCaptureListener((freq)=> {
      this.fftListAudio2.push(freq.slice(2, 127))
    });
    this.audioAnalyser2.setOnEndedListener(()=>{
      this.fftSumListAudio2 = this.fftNormalize(this.fftListAudio2);
      this.startGraphAnimation2(this.canvasContext);
    });

    this.canvasContext = this.canvasView.nativeElement.getContext('2d');
    this.resetCanvas(this.canvasContext);
  }

  startGraphAnimation1(ctx) {
    this.isLoop1=true;
    this.resetCanvas(ctx);
    this.audio1VisibleXpos = 0;
    let animationFrame = ()=>{
      if(!this.isLoop1) {
        return;
      }
      if(580<this.audio1VisibleXpos) {
        this.isLoop1 = false;
        fftGraphHandler.onEndedListener();
        return;
      }
      this.audio1VisibleXpos+=10;
      this.drawAll(ctx);
      requestAnimationFrame(()=>{animationFrame()});
    };
    requestAnimationFrame(()=>{animationFrame()});
  }

  startGraphAnimation2(ctx) {
    this.isLoop2 = true;
    this.resetCanvas(ctx);
    this.audio2VisibleXpos = 0;
    let animationFrame = ()=>{
      if(!this.isLoop2) {
        return;
      }
      if(580<this.audio2VisibleXpos) {
        this.isLoop2 = false;
        fftGraphHandler.onEndedListener();
        return;
      }
      this.audio2VisibleXpos+=10;
      this.drawAll(ctx);
      requestAnimationFrame(()=>{animationFrame()});
    };
    requestAnimationFrame(()=>{animationFrame()});
  }

  playAnalyser1() {
    this.audioAnalyser1.startRender();
  }

  playAnalyser2() {
    this.audioAnalyser2.startRender();
  }

  getPeakMagnitude(fft) {
    let real, imag, mag;
    let fftSmoot = [];
    let sum = 0;
    let max = 0;
    let maxIndex = 0;

    for(let i=0; i<fft.length/2; i++) {
      real = fft[2 * i];
      imag = fft[2 * i + 1];

      let rxm = 10 * Math.log10(real * real + imag * imag);
      mag = (0>rxm||isNaN(rxm))?0:rxm;
      fftSmoot[i] = (1 - 0.4) * mag;
      sum += fftSmoot[i];
      if(fftSmoot[i] > max) {
        max = fftSmoot[i];
        maxIndex = i;
      }
    }

    return {sum: sum, maxIndex: maxIndex};
  }

  fftNormalize(fftList) {
    let sumList = [];
    let peakIndexList = [];
    let max = 0;
    for(let i=0; i<fftList.length; i++) {
      let peakMagnitude = this.getPeakMagnitude(fftList[i]);
      sumList.push(peakMagnitude.sum);
      peakIndexList.push(peakMagnitude.maxIndex);
    }
    for(let i=0; i<sumList.length; i++) {
      sumList[i] = parseInt((sumList[i]*peakIndexList[i] * 0.01) + "");
      max = (sumList[i]>max)?sumList[i]:max;
    }

    for(let i=0; i<sumList.length; i++) {
      sumList[i] = sumList[i]/max * 100;
    }

    return sumList;
  }

  resetCanvas(ctx=this.canvasContext) {
    ctx.rect(-50, -50, 650, 250);
    ctx.fillStyle="#ffffff";
    ctx.strokeStyle="#ffffff";
    ctx.fill();
    ctx.stroke();

    
    ctx.beginPath();
    ctx.strokeStyle="#c2c2c2"
    ctx.lineWidth = 2;
    ctx.moveTo(0, 100);
    ctx.lineTo(580, 100);
    ctx.stroke();
    ctx.closePath();
  }

  drawCurveGraph(ctx, list, color, maxX = 580) {
    let unitLength = 580/(list.length-1);
    ctx.strokeStyle=color;
    ctx.lineWidth = 2;
    ctx.moveTo(- unitLength, 150 - list[0]);
    ctx.beginPath()
    for(let i=0; i<list.length; i++) {
      let x = unitLength*i;
      if(maxX < x) {
        x = maxX;
        ctx.lineTo(x, 150 - list[i]);
        break;
      } else {
        ctx.lineTo(x, 150 - list[i]);
      }
    }
    ctx.stroke();
    ctx.closePath();
  }

  drawAll(ctx) {
    this.resetCanvas(ctx);
    this.drawCurveGraph(ctx, this.fftSumListAudio1, "#5562ff", this.audio1VisibleXpos);
    this.drawCurveGraph(ctx, this.fftSumListAudio2, "#ff4894", this.audio2VisibleXpos);
  }
}

class FftGraphHandler {
  private component;
  init(component) {
    this.component = component;
    this.onInitListener();
  }

  setAudio1Path(path) {
    if(this.component.audioPath1!=path) {
      this.component.fftSumListAudio1 = [];
    }
    this.component.audioPath1 = path;
  }

  playAnalyser1() {
    this.component.playAnalyser1();
  }

  setAudio2Path(path) {
    this.component.audio2.nativeElement.src=path;
  }

  playAnalyser2() {
    this.component.playAnalyser2();
  }

  onInitListener = ()=>{};
  setOnInitListener(listener) {
    this.onInitListener = listener;
  }


  onEndedListener = ()=>{};
  setOnEndedListener(listener) {
    this.onEndedListener = listener;
  }

  resetCanvas() {
    this.component.resetCanvas();
  }

  reset() {
    this.component.isLoop1 = false;
    this.component.isLoop2 = false;
    this.component.audio1VisibleXpos = 0;
    this.component.audio2VisibleXpos = 0;
    this.resetCanvas();
  }

  isLoop() {
    if(this.component.isLoop1 || this.component.isLoop2) return false;
  }
}

export let fftGraphHandler = new FftGraphHandler();