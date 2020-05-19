import { Component, OnInit } from '@angular/core';
import { quizContentHandler } from '../quiz/quiz-content-handler';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz-type-select',
  templateUrl: './quiz-type-select.component.html',
  styleUrls: ['./quiz-type-select.component.css']
})
export class QuizTypeSelectComponent implements OnInit {

  constructor(private router :Router) { }

  ngOnInit() {
    quizContentHandler.initMyAnswers();
  }


  routeQuiz() {
    let skill = localStorage.getItem("skill");
    if(skill == "1") {
      this.router.navigate(['quiz']);
    } else if(skill == "2") {
      this.router.navigate(['talk']);
    }
  }
}
