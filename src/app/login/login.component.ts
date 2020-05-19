import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { restApiInfo } from '../rest-api-info';
import { jquery } from '../JQuery';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isFailedToLogin = false;

  @ViewChild('id') id: ElementRef;
  @ViewChild('pw') pw: ElementRef;
  

  constructor(private router:Router) { }

  ngOnInit() {
    let accessToken = localStorage.getItem("access_token");
    this.checkMe(accessToken);
  }

  checkMe(accessToken) {
    let info = restApiInfo.getMeInfo();
    jquery.ajax({
      type: info.method,
      url: info.url,
      headers: {
        "Access-Control-Allow-Origin": '*',
        "Authorization": "Bearer " + accessToken
      },
      success: (data) => {
        if(data.status) {
          this.router.navigate(['quiz/type_select']);
        }
      }
    });
  }

  login() {
    let info = restApiInfo.getLoginInfo();
    /*jquery.ajax({
      type: info.method,
      url: info.url,
      headers: {
        "Access-Control-Allow-Origin": '*'
      },
      data: {
        "id": this.id.nativeElement.value,
        "pw": this.pw.nativeElement.value
      },
      error: (data) => {
        console.log("error");
        console.log(data);
        this.isFailedToLogin = true;
      },
      success: (data) => {
        console.log("success");
        console.log(data);
        if(data.status) {
          this.isFailedToLogin = false;
          localStorage.setItem('access_token', data.access_token);
          this.router.navigate(['quiz/type_select']);
        } else {
          this.isFailedToLogin = true;
        }
      }
    });*/
    let id = this.id.nativeElement.value;
    let pw = this.pw.nativeElement.value;
    if(id=="test1"&&pw=="test1") {
      localStorage.setItem('skill', '1');
      this.router.navigate(['quiz/type_select']);
    } else if(id=="test2"&&pw=="test2") {
      localStorage.setItem('skill', '2');
      this.router.navigate(['quiz/type_select']);
    } else if(id=="lexie1@akaintelligence.com"&&pw=="1234") {
      localStorage.setItem('skill', '1');
      this.router.navigate(['quiz/type_select']);
    } else if(id=="lexie2@akaintelligence.com"&&pw=="1234") {
      localStorage.setItem('skill', '2');
      this.router.navigate(['quiz/type_select']);
    } else {
      this.isFailedToLogin = true;
    }
  }

}
