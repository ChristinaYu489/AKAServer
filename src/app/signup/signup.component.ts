import { Component, OnInit, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router'

import { restApiInfo } from '../rest-api-info';
import { jquery } from '../JQuery';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
  @ViewChild('id') id: ElementRef;
  @ViewChild('pw') pw: ElementRef;
  @ViewChild('pw_check') pwCheck: ElementRef;
  @ViewChild('grade1') grade1: ElementRef;
  @ViewChild('grade2') grade2: ElementRef;
  @ViewChild('skill') skill: ElementRef;

  signupInfo = restApiInfo.getSignUpInfo();

  grade1List = [
    { value: 0, name: '미취학' },
    { value: 1, name: '초등학교' },
    { value: 2, name: '중학교' },
    { value: 3, name: '고등학교' },
  ];
  selectedGrade1Value = 0;

  grade2List = [
    [
      { value: 1, name: '미취학' }
    ],
    [
      { value: 0, name: '선택' },
      { value: 1, name: '1학년' },
      { value: 2, name: '2학년' },
      { value: 3, name: '3학년' },
      { value: 4, name: '4학년' },
      { value: 5, name: '5학년' },
      { value: 6, name: '6학년' }
    ],
    [
      { value: 0, name: '선택' },
      { value: 1, name: '1학년' },
      { value: 2, name: '2학년' },
      { value: 3, name: '3학년' }
    ],
    [
      { value: 0, name: '선택' },
      { value: 1, name: '1학년' },
      { value: 2, name: '2학년' },
      { value: 3, name: '3학년' }
    ]
  ]

  isInvalidId = false;
  isUnmatchedPw = false;

  constructor(private rd: Renderer2, private router: Router) {
  }

  ngOnInit() {
  }

  grade1Changed(value: number) {
    this.selectedGrade1Value = value;
  }

  signup() {
    this.isInvalidId = false;
    this.isUnmatchedPw = false;
    console.log("type: " + this.signupInfo.method);
    console.log("url: " + this.signupInfo.url);
    jquery.ajax({
      type: this.signupInfo.method,
      url: this.signupInfo.url,
      headers: {
        "Access-Control-Allow-Origin": '*'
      },
      data: {
        "id": this.id.nativeElement.value,
        "pw": this.pw.nativeElement.value,
        "pw_check": this.pwCheck.nativeElement.value,
        "grade1": this.grade1.nativeElement.options[this.grade1.nativeElement.selectedIndex].value,
        "grade2": this.grade2.nativeElement.options[this.grade2.nativeElement.selectedIndex].value,
        "skill": this.skill.nativeElement.options[this.skill.nativeElement.selectedIndex].value
      },
      error: (data) => {
        console.log("error");
        console.log(data);
      },
      success: (data) => {
        console.log("success");
        console.log(data);
        if (data.status) {
          this.successSignup(data);
        } else if(data.code==1) {
          this.isInvalidId = true;
        } else if(data.code==2) {
          this.isUnmatchedPw = true;
        }
      }
    });
  }

  successSignup(data) {
    localStorage.setItem("access_token", data.access_token);
    this.router.navigate(['quiz/type_select'])
  }
}
