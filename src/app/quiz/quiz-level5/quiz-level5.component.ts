import { Component, OnInit, ChangeDetectorRef, ViewChild, NgZone } from '@angular/core';
import { quizContentHandler } from '../quiz-content-handler';
import { speachRecognition } from '../../speach-recognition';
import { timerHandler } from '../timer/timer.component';
import { Router } from '@angular/router';
import { audioPlayerHandler } from '../audio-player/audio-player.component';
import { fftGraphHandler } from './fft-graph/fft-graph.component';
import { userMedia } from 'src/app/UserMedia';
import { timer } from 'rxjs';
import { quizComponentHandler } from '../quiz.component';

@Component({
  selector: 'app-quiz-level5',
  templateUrl: './quiz-level5.component.html',
  styleUrls: ['./quiz-level5.component.css']
})
export class QuizLevel5Component implements OnInit {
  isRecording = false;

  myWords;
  wrongCount = 0;
  correctCount = 0;
  isOnSubmit = false;
  recorder;
  isRecordingPossible = false;

  constructor(private router: Router, private cdr: ChangeDetectorRef, private ngZone : NgZone) {
  }

  ngOnInit() {
    timerHandler.setTimeCount(0);
    timerHandler.start();
    let locale = localStorage.getItem('locale');
    quizContentHandler.setOnQuizChangedListener((quiz) => {
      audioPlayerHandler.setAudioPath("quiz_assets/" + quiz['quiz']);
      fftGraphHandler.setOnInitListener(() => {
        fftGraphHandler.setAudio1Path("quiz_assets/" + quiz['quiz']);
      });
      audioPlayerHandler.setOnPlayListener(() => {
        this.isRecordingPossible = false;
      });
      audioPlayerHandler.setOnEndedListener(() => {
        fftGraphHandler.setOnEndedListener(() => {
          this.isRecordingPossible = true;
          fftGraphHandler.setOnEndedListener(() => { });
        });
        fftGraphHandler.playAnalyser1();
      });
    });
    quizContentHandler.generateQuizList(5);
    timerHandler.setTimerCompleteListener(() => {
      this.myWords = [];
      this.submitAnswer(false);
      this.nextQuiz();
    });
    this.recorder = userMedia.getRecorder();
  }

  startRecording() {
    if (!this.isRecordingPossible) return;
    this.isRecordingPossible = false;
    userMedia.accessMicrophone((stream) => {
      timerHandler.stop();
      this.isRecording = true;
      this.recorder.init(stream);
      this.recorder.startRecord();
      this.cdr.detectChanges();
    });
    speachRecognition.start(() => {
      this.cdr.detectChanges();
    }, (scripts) => {
      this.recorder.stopRecord((audioURL, blob) => {
        this.isOnSubmit = true;
        this.myWords = scripts;
        this.isRecording = false;
        fftGraphHandler.setAudio2Path(audioURL);
        fftGraphHandler.setOnEndedListener(() => {
          setTimeout(() => {
            fftGraphHandler.resetCanvas();
            let check = this.checkAnswer();
            this.submitAnswer(check);
            this.nextQuiz();
          }, 1000);
          fftGraphHandler.setOnEndedListener(() => { });
          this.cdr.detectChanges();
        });
        fftGraphHandler.playAnalyser2();
        this.cdr.detectChanges();
      });
    });

  }

  stopRecording() {
    speachRecognition.stop();
    this.recorder.stopRecord();
    this.isRecordingPossible = true;
    this.isRecording = false;
    timerHandler.start();
  }

  checkAnswer() {
    for (let i = 0; i < this.myWords.length; i++) {
      let word = this.myWords[i];
      for (let j = 0; j < quizContentHandler.currentQuiz['answer'].length; j++) {
        let compareWord = quizContentHandler.currentQuiz['answer'][j];
        if (word == compareWord) {
          return true;
        }
      }
    }
    return false;
  }

  submitAnswer(isCorrect) {
    if (isCorrect) {
      quizContentHandler.submitAnswer(true);
      this.correctCount++;
    } else {
      quizContentHandler.submitAnswer(false);
      this.wrongCount++;
    }
    return;
  }

  nextQuiz() {
    fftGraphHandler.reset();
    this.isOnSubmit = false;
    if (3 <= this.correctCount) {
      quizContentHandler.setLevel(6);
      setTimeout(() => { quizComponentHandler.component.cdr.detectChanges(); }, 0);
      return;
    } else if (3 <= this.wrongCount) {
      this.ngZone.run(()=>{this.router.navigate(['result'])});
    } else {
      quizContentHandler.quizPass();
      timerHandler.setTimeCount(0);
      timerHandler.start();
    }
    this.cdr.detectChanges();
  }
}
