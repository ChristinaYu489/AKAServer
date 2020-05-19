import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.css']
})
export class AudioPlayerComponent implements OnInit {
  currentTime = "00:00";
  maxTime = "00:00";
  audioPath;
  isPlaying= false;

  @ViewChild('audioTag') audioTag;
  @ViewChild('fill') fill;

  constructor(private cdr : ChangeDetectorRef) {
    audioPlayerHandler.onSetAudioPathListener = (src)=>{
      this.audioPath = src;
      let aud = this.audioTag.nativeElement;
      aud.src=src;
      aud.oncanplay = ()=>{
        this.maxTime = this.convertTimeToString(aud.duration);
        this.currentTime = "00:00";
        this.fill.nativeElement.style="width: 0%;"
        this.isPlaying = false;
        this.cdr.detectChanges();
      };
      aud.onplaying = ()=>{
        this.isPlaying = true;
        audioPlayerHandler.onPlayLisetener();
        this.cdr.detectChanges();
      };
      aud.onpause = ()=>{
        this.isPlaying = false;
        this.cdr.detectChanges();
      };
      aud.ontimeupdate = ()=>{
        this.currentTime = this.convertTimeToString(aud.currentTime);
        this.fill.nativeElement.style="width:"+(aud.currentTime/aud.duration*100)+"%;"
      };
      aud.onended = ()=>{
        this.isPlaying = false;
        this.currentTime = "00:00";
        this.fill.nativeElement.style="width: 0%;"
        audioPlayerHandler.onEndedListener();
        this.cdr.detectChanges();
      }
      aud.onerror = ()=>{
        this.isPlaying = false;
        this.currentTime = "00:00";
        this.fill.nativeElement.style="width: 0%;"
        this.cdr.detectChanges();
      }
    }
  }

  ngOnInit() {
    audioPlayerHandler.setAudioTag(this.audioTag);
  }

  convertTimeToString(n) {
    let min = parseInt(n/60+"");
    let sec = Math.ceil(n) % 60;
    let minstr = String(min);
    let secstr = String(sec);
    if(min<10) {
      minstr = "0"+minstr;
    }
    if(sec<10) {
      secstr = "0"+secstr;
    }
    return minstr+":"+secstr;
  }

  play() {
    let aud = this.audioTag.nativeElement;
    aud.play();
  }

  pause() {
    let aud = this.audioTag.nativeElement;
    if(!aud.paused) {
      aud.pause();
    }
  }
}

class AudioPlayerHandler {
  setAudioPath(src) {
    this.onSetAudioPathListener(src);
  }

  onSetAudioPathListener = (src)=>{};

  private audioTag;

  setAudioTag(audioTag) {
    this.audioTag = audioTag;
  }

  getAudioTag() {
    return this.audioTag;
  }


  onPlayLisetener = ()=>{};
  setOnPlayListener(listener) {
    this.onPlayLisetener = listener;
  }

  onEndedListener = ()=>{};
  setOnEndedListener(listener) {
    this.onEndedListener = listener;
  }
}

export let audioPlayerHandler = new AudioPlayerHandler;