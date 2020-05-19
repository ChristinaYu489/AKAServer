import { Component, OnInit, ChangeDetectorRef, ApplicationRef, NgZone } from '@angular/core';
import { quizContentHandler } from '../quiz-content-handler';
import { speachRecognition } from '../../speach-recognition';
import { timerHandler } from '../timer/timer.component';
import { Router } from '@angular/router';
import { quizComponentHandler } from '../quiz.component';
import { userMedia } from 'src/app/UserMedia';

@Component({
  selector: 'app-quiz-level3',
  templateUrl: './quiz-level3.component.html',
  styleUrls: ['./quiz-level3.component.css']
})
export class QuizLevel3Component implements OnInit {
  isRecording = false;

  recognition;
  myWords;
  quizImageUrl = "";
  wrongCount = 0;
  correctCount = 0;

  constructor(private cdr: ChangeDetectorRef, private router: Router, private ngZone : NgZone) {
  }

  ngOnInit() {
    let locale = localStorage.getItem('locale');
    this.quizImageUrl = quizContentHandler.currentQuiz['quiz'];
    quizContentHandler.setOnQuizChangedListener((quiz) => {
      this.quizImageUrl = quiz['quiz'];
    });
    quizContentHandler.generateQuizList(3);
    timerHandler.setTimerCompleteListener(() => {
      this.myWords = [];
      this.submitAnswer(false);
      this.nextQuiz();
    });
    timerHandler.setTimeCount(0);
    timerHandler.start();
  }

  startRecording() {
    speachRecognition.start(() => {
      this.isRecording = true;
      timerHandler.stop();
      this.cdr.detectChanges();
    }, (scripts) => {
      if(!userMedia.isAccessed) return;
      console.log(scripts);
      this.myWords = scripts;
      this.cdr.detectChanges();
      this.isRecording = false;
      this.cdr.detectChanges();

      this.submitAnswer(this.checkAnswer());
      this.nextQuiz();
    });

  }

  stopRecording() {
    this.isRecording = false;
    speachRecognition.stop();
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
    console.log(this.correctCount+"/"+this.wrongCount);
    if (3 <= this.correctCount) {
      quizContentHandler.setLevel(4);
      setTimeout(()=>{quizComponentHandler.component.cdr.detectChanges();},0);
      return;
    } else if (3 <= this.wrongCount) {
      this.ngZone.run(()=>{this.router.navigate(['result'])});
    } else {
      quizContentHandler.quizPass();
      timerHandler.setTimeCount(0);
      timerHandler.start();
      this.cdr.detectChanges();
    }
  }
}
