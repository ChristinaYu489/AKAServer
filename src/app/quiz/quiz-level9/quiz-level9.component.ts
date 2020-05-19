import { Component, OnInit, ViewChild, ChangeDetectorRef, NgZone } from '@angular/core';
import { quizContentHandler } from '../quiz-content-handler';
import { timerHandler } from '../timer/timer.component';
import { audioPlayerHandler } from '../audio-player/audio-player.component';
import { jquery } from 'src/app/JQuery';
import { Router } from '@angular/router';
import { quizComponentHandler } from '../quiz.component';

@Component({
  selector: 'app-quiz-level9',
  templateUrl: './quiz-level9.component.html',
  styleUrls: ['./quiz-level9.component.css']
})
export class QuizLevel9Component implements OnInit {
  quizAnswer;
  selectList;

  @ViewChild('selctorGroup') selectorGroup;
  @ViewChild('myAnswerTag') myAnswerTag;
  myAnswerList = [];
  myAnswer = "";
  correctCount = 0;
  wrongCount = 0;

  constructor(private router:Router, private cdr : ChangeDetectorRef, private ngZone:NgZone) {
  }

  ngOnInit() {
    let locale = localStorage.getItem('locale');
    timerHandler.setTimeCount(0);
    timerHandler.start();
    quizContentHandler.setOnQuizChangedListener((quiz) => {
      audioPlayerHandler.setAudioPath("quiz_assets/"+quiz['quiz']);
      this.quizAnswer = quiz['answer'];
      this.selectList = quiz['answer_contents'];
    });
    quizContentHandler.generateQuizList(9);
    timerHandler.setTimerCompleteListener(() => {
      this.submitAnswer();
      if(this.checkAnswer()) {
        this.wrongCount++;
      } else {
        this.correctCount++;
      }
      this.nextQuiz();
    });
  }


  clickSelector(index) {
    let selectorInputs = this.selectorGroup.nativeElement.getElementsByTagName("input");
    selectorInputs[index].checked = !selectorInputs[index].checked;
    if(selectorInputs[index].checked) {
      this.myAnswerList.push(selectorInputs[index].value);
    } else {
      for(let i=0; i<this.myAnswerList.length; i++) {
        if(this.myAnswerList[i] == selectorInputs[index].value) {
          this.myAnswerList.splice(i, 1);
        }
      }
    }
    this.myAnswer = "";
    for(let i=0; i<this.myAnswerList.length; i++) {
      this.myAnswer += this.myAnswerList[i] + " ";
    }

    if(this.myAnswerList.length == this.selectList.length) {
      this.submitAnswer();
      if(this.checkAnswer()) {
        this.correctCount++;
      } else {
        this.wrongCount++;
      }
      this.nextQuiz();
    }
    this.cdr.detectChanges();
  }

  submitAnswer() {
    quizContentHandler.submitAnswer(this.myAnswer);
  }

  checkAnswer() {
    console.log(this.myAnswer + " / " + this.quizAnswer + " = " + (this.myAnswer==this.quizAnswer))
    if (this.myAnswer == this.quizAnswer) {
      return true;
    } else {
      return false;
    }
  }

  nextQuiz() {
    console.log(this.correctCount+"/"+this.wrongCount);
    let selectorInputs = this.selectorGroup.nativeElement.getElementsByTagName("input");
    for(let i=0; i<selectorInputs.length; i++) {
      selectorInputs[i].checked = false;
    }
    this.myAnswer = "";
    this.myAnswerList = [];

    if (3 <= this.correctCount) {
      quizContentHandler.setLevel(10);
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
