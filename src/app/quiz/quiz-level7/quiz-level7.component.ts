import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { quizContentHandler } from '../quiz-content-handler';
import { speachRecognition } from '../../speach-recognition';
import { timerHandler } from '../timer/timer.component';
import { Router } from '@angular/router';
import { quizComponentHandler } from '../quiz.component';

@Component({
  selector: 'app-quiz-level7',
  templateUrl: './quiz-level7.component.html',
  styleUrls: ['./quiz-level7.component.css']
})
export class QuizLevel7Component implements OnInit {
  isRecording = false;

  recognition;
  myWords;
  quizSentence = "";
  wrongCount = 0;
  correctCount = 0;

  constructor(private cdr: ChangeDetectorRef, private router: Router, private ngZone : NgZone) {
  }

  ngOnInit() {
    let locale = localStorage.getItem('locale');
    timerHandler.setTimeCount(0);
    timerHandler.start();
    this.quizSentence = quizContentHandler.currentQuiz['quiz'];
    quizContentHandler.setOnQuizChangedListener((quiz) => {
      this.quizSentence = quiz['quiz'];
    });
    quizContentHandler.generateQuizList(7);
    timerHandler.setTimerCompleteListener(() => {
      this.myWords = [];
      this.submitAnswer(false);
      this.nextQuiz();
    });
  }

  startRecording() {
    speachRecognition.start(() => {
      timerHandler.stop();
      this.isRecording = true;
      this.cdr.detectChanges();
    }, (scripts) => {
      console.log(scripts);
      this.myWords = scripts;
      this.cdr.detectChanges();
      this.isRecording = false;
      this.cdr.detectChanges();

      let check = this.checkAnswer();
      this.submitAnswer(check);
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
    if (3 <= this.correctCount) {
      console.log("setlevel");
      quizContentHandler.setLevel(8);
      setTimeout(() => { quizComponentHandler.component.cdr.detectChanges(); }, 0);
      return;
    } else if (3 <= this.wrongCount) {
      console.log("redirect");
      this.ngZone.run(()=>{this.router.navigate(['result'])});
    } else {
      quizContentHandler.quizPass();
      timerHandler.setTimeCount(0);
      timerHandler.start();
    }
    this.cdr.detectChanges();
  }
}
