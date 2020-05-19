import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router'
import { ActivatedRoute } from '@angular/router';

import { timerHandler } from './timer/timer.component'
import { quizContentHandler } from './quiz-content-handler'
import { restApiInfo } from '../rest-api-info';
import { jquery } from '../JQuery';
import { userMedia } from '../UserMedia';


@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  quizLevel;

  constructor(private route : ActivatedRoute, private router: Router, public cdr: ChangeDetectorRef) {
    quizComponentHandler.init(this);
  }

  ngOnInit() {
    userMedia.accessMicrophone((stream)=>{
      userMedia.getRecorder().init(stream);
    });

    if(quizContentHandler.myAnswers==undefined) {
      //this.router.navigate(['']); return;
    }
    let info = restApiInfo.getMeInfo();
    let accessToken = localStorage.getItem('access_token');
    /*jquery.ajax({
      type: info.method,
      url: info.url,
      headers: {
        "Authorization": "Bearer " + accessToken
      },
      error: ()=>{
        this.router.navigate(['login']);
      },
      success: (data) => {
        if(data.status) {
          quizContentHandler.init(data.item);
          quizContentHandler.setOnSentenceChangedListener(()=>{
            this.quizSentence = quizContentHandler.getSentence();
          });
          quizContentHandler.setOnLevelChangedListener((level)=>{
            this.quizLevel = level;
          });
          quizContentHandler.setLevel(1);
          quizContentHandler.generateQuizList();
        } else {
          this.router.navigate(['login']);
        }
      }
    });*/
    if(true) {
      quizContentHandler.init({});
      quizContentHandler.setOnLevelChangedListener((level)=>{
        this.quizLevel = level;
      });
      quizContentHandler.setLevel(1);
      quizContentHandler.generateQuizList();
    } else {
      this.router.navigate(['login']);
    }
  }
}
class QuizComponentHandler {
  component;
  init(component) {
    this.component = component
  }
}
export const quizComponentHandler = new QuizComponentHandler;