import { Component, OnInit } from '@angular/core';
import { quizContentHandler } from '../quiz/quiz-content-handler';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  percent;
  stat;
  myAnswers;

  constructor(private router:Router) {
    this.percent=17;this.stat = [
      "F",
      "F",
      "F",
      "F",
      "F",
      "F"
    ];
  }

  ngOnInit() {
    this.myAnswers = quizContentHandler.getMyAnswers();
    console.log(this.myAnswers);
    if(this.myAnswers == undefined) {
      console.log("?");
      this.router.navigate(['']);
      return;
    }
    let ch1 = this.getSelectPartPoint(1);
    let ch2 = this.getSelectPartPoint(2);
    let ch3 = this.getSttPartPoint(3);
    let ch4 = this.getSelectPartPoint(4);
    let ch5 = this.getSttPartPoint(5);
    let ch6 = this.getSelectPartPoint(6);
    let ch7 = this.getSttPartPoint(7);
    let ch8 = this.getSelectPartPoint(8);
    let ch9 = this.getSelectPartPoint(9);
    let ch10 = this.getSelectPartPoint(10);
    this.stat = [
      this.convertPointToAlphabet((ch1+ch3+ch5+ch7)/4),
      this.convertPointToAlphabet((ch1+ch2)/2),
      this.convertPointToAlphabet((ch3+ch4+ch6+ch8)/4),
      this.convertPointToAlphabet((ch8+ch9+ch10)/3),
      this.convertPointToAlphabet((ch1+ch3+ch5+ch7)/4),
      this.convertPointToAlphabet((ch5+ch6+ch9+ch10)/4)
    ];
    this.percent = 100 - (ch1+ch2+ch3+ch4+ch5+ch6+ch7+ch8+ch9+ch10/90 * 100)
  }

  convertPointToAlphabet(p) {
    p = Math.round(p);
    if(9<=p) return "A";
    else if(6<=p) return "B";
    else if(4<=p) return "C";
    else if(2<=p) return "D";
    else if(1<=p) return "E";
    else if(0<=p) return "F";
    else return "F"
  }

  getPoint(correct, incorrect) {
    if(correct == 3 && incorrect == 0) {
      return 9;
    } else if(correct == 3 && incorrect == 1) {
      return 6;
    } else if(correct == 3 && incorrect == 2) {
      return 4;
    } else if(correct == 2 && incorrect == 3) {
      return 2;
    } else if(correct == 1 && incorrect == 3) {
      return 1
    } else {
      return 0;
    }
  }

  getPartPoint(condition, lv) {
    let correct = 0;
    let incorrect = 0;
    let answers = this.myAnswers[lv-1];
    if(answers==undefined) {
      return 0;
    }
    for(let i=0; i<answers.length; i++) {
      let myAnswerData = answers[i]['answer'];
      let correctAnswerData = answers[i]['quiz'];
      if(typeof myAnswerData != undefined && typeof correctAnswerData != undefined) {
        //do scoring
        if(condition(myAnswerData, correctAnswerData['answer'])) {
          correct++;
        } else {
          incorrect++;
        }
      } else {
        return this.getPoint(correct, incorrect);
      }
    }
    return this.getPoint(correct, incorrect);
  }

  getSelectPartPoint(lv) {
    return this.getPartPoint((myAnswerData, correctAnswerData)=>{
      if(myAnswerData == undefined || correctAnswerData == undefined) {
        return false;
      } else if(myAnswerData == correctAnswerData) {
        return true;
      } else {
        return false;
      }
    }, lv);
  }

  getSttPartPoint(lv) {
    return this.getPartPoint((myAnswerData, correctAnswerData)=>{
      if(myAnswerData == true) {
        return true;
      } else {
        return false;
      }
    }, lv);
  }
}
