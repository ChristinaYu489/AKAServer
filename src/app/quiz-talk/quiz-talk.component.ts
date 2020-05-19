import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { timerHandler } from '../quiz/timer/timer.component';
import { Router } from '@angular/router';
import { userMedia } from '../UserMedia';
import { jquery } from '../JQuery';
import { restApiInfo } from '../rest-api-info';
import { timer, VirtualTimeScheduler } from 'rxjs';

@Component({
  selector: 'app-quiz-talk',
  templateUrl: './quiz-talk.component.html',
  styleUrls: ['./quiz-talk.component.css']
})
export class QuizTalkComponent implements OnInit {
  quizSentence = "";
  mySentence = "";

  quizCount = 1;

  recorder;

  sessionId = 32;
  turnId = 226;

  onServerProccessing = false;

  constructor(private router: Router, private cdr : ChangeDetectorRef) {
  }

  ngOnInit() {
    this.recorder = userMedia.getRecorder();
    userMedia.accessMicrophone((stream) => {
      this.recorder.init(stream);
    });

    this.initSentenceSession((sessionId)=>{
      this.sessionId = sessionId;
      this.getSentenceFromServer();
    });
    //this.sessionId=48;
    //this.getSentenceFromServer();

    timerHandler.setTimeCount(0);
    timerHandler.setTimerCompleteListener(() => {
      //route to result page made by rammi
      this.nextQuiz();
      this.cdr.detectChanges()
    });
    timerHandler.start();
  }

  isRecording = false;

  startRecording() {
    if (userMedia.isAccessed==false) return;
    if(this.onServerProccessing == true) return;
    this.onServerProccessing = true;
    this.isRecording = true;
    this.recorder.startRecord();
    this.cdr.detectChanges()
  }

  stopRecording() {
    timerHandler.stop();
    this.recorder.stopRecord((url, blob) => {
      let reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        let base64data = reader.result;
        this.cdr.detectChanges()
        console.log(base64data);
        this.postSTTToServer(base64data, (str) => {
          console.log(str);
          this.mySentence = str;
          this.cdr.detectChanges()
          this.postSentenceToServer(str, () => {
            this.nextQuiz();
            this.onServerProccessing = false;
            this.cdr.detectChanges()
          }, ()=>{
            this.mySentence = "try again";
            this.onServerProccessing = false;
            this.cdr.detectChanges();
          });
        });
      };

      this.isRecording = false;
      this.cdr.detectChanges()
    });
  }

  initSentence() {
    this.quizSentence = "";
    this.mySentence = "";
  }

  addQuizCount() {
    this.quizCount += 1;
    if (this.quizCount > 10) {
      //route to result page made by rammi
    }
  }

  initSentenceSession(listener = (sessionId) => { }) {
    let apiInfo = restApiInfo.getChatCreateSessionInfo();
    jquery.ajax({
      type: apiInfo.method,
      url: apiInfo.url,
      headers: {
        "Authorization": apiInfo.auth
      },
      error: (data) => {
        console.log("init error");
      },
      success: (data) => {
        console.log("success init");
        console.log(data);
        listener(data['id']);
      }
    });
  }

  getSentenceFromServer() {
    //send rammi api
    let apiInfo = restApiInfo.getChatTakeMessageInfo();
    jquery.ajax({
      type: apiInfo.method,
      url: apiInfo.url,
      headers: {
        "Content-Type": "application/json",
        "Authorization": apiInfo.auth
      },
      data: JSON.stringify({
        "test_session_id": this.sessionId
      }),
      error: (data) => {
        console.log("error getSentence");
      },
      success: (data) => {
        console.log("success getSentence");
        this.quizSentence = data['question']['body'];
        this.turnId = data['id'];
        console.log("quiz :" + this.quizSentence);
        console.log("id :" + this.turnId);
        this.cdr.detectChanges();
      }
    });
  }

  postSentenceToServer(str, listener = ()=>{}, error = ()=>{}) {
    let apiInfo = restApiInfo.getChatSendMassegeInfo(this.turnId);
    jquery.ajax({
      type: apiInfo.method,
      url: apiInfo.url,
      headers: {
        "Content-Type": "application/json",
        "Authorization": apiInfo.auth
      },
      data: JSON.stringify({
        "answer": str
      }),
      error: (data) => {
        console.log("failed to post sentence");
        console.log(data);
        error();
      },
      success: (data) => {
        listener()
      }
    });
  }

  postSTTToServer(base64data, listener = (str) => { }) {
    let apiInfo = restApiInfo.getChatSTTInfo()
    jquery.ajax({
      type: apiInfo.method,
      url: apiInfo.url,
      headers: {
        "Access-Control-Allow-Origin": '*',
        "content-type": "application/json"
      },
      data: JSON.stringify({ "data": base64data }),
      error: (data) => {
        console.log("error stt");
      },
      success: (data) => {
        console.log("success stt");
        listener(data['text']);
      }
    });
  }

  nextQuiz() {
    this.quizCount++;
    if (this.quizCount > 10) {
      window.location.href = "https://bach.themusio.com/pt/result/" + this.sessionId;
    } else {
      this.mySentence = "";
      this.getSentenceFromServer();
      this.cdr.detectChanges();
      timerHandler.setTimeCount(0);
      timerHandler.start();
    }
  }
}
