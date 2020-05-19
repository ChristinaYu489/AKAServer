import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopbarComponent } from './topbar/topbar.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { QuizComponent } from './quiz/quiz.component';
import { ResultLodingComponent } from './result-loding/result-loding.component';
import { ResultComponent } from './result/result.component';
import { ResultDetailComponent } from './result-detail/result-detail.component';
import { QuizTypeSelectComponent } from './quiz-type-select/quiz-type-select.component';
import { BottomComponent } from './bottom/bottom.component';
import { Error404Component } from './error404/error404.component';
import { TimerComponent } from './quiz/timer/timer.component';
import { QuizLevel1Component } from './quiz/quiz-level1/quiz-level1.component';
import { QuizLevel2Component } from './quiz/quiz-level2/quiz-level2.component';
import { QuizLevel3Component } from './quiz/quiz-level3/quiz-level3.component';
import { QuizLevel4Component } from './quiz/quiz-level4/quiz-level4.component';
import { QuizLevel5Component } from './quiz/quiz-level5/quiz-level5.component';
import { QuizLevel6Component } from './quiz/quiz-level6/quiz-level6.component';
import { QuizLevel7Component } from './quiz/quiz-level7/quiz-level7.component';
import { QuizLevel8Component } from './quiz/quiz-level8/quiz-level8.component';
import { QuizLevel9Component } from './quiz/quiz-level9/quiz-level9.component';
import { QuizLevel10Component } from './quiz/quiz-level10/quiz-level10.component';
import { AudioPlayerComponent } from './quiz/audio-player/audio-player.component';
import { FftGraphComponent } from './quiz/quiz-level5/fft-graph/fft-graph.component';
import { QuizTalkComponent } from './quiz-talk/quiz-talk.component';

export function HttpLoaderFactory(http: HttpClient) {
   return new TranslateHttpLoader(http, "/assets/i18n/");
}

@NgModule({
   declarations: [
      AppComponent,
      TopbarComponent,
      LandingComponent,
      LoginComponent,
      SignupComponent,
      QuizComponent,
      ResultLodingComponent,
      ResultComponent,
      ResultComponent,
      ResultDetailComponent,
      QuizTypeSelectComponent,
      BottomComponent,
      TimerComponent,
      Error404Component,
      QuizLevel1Component,
      QuizLevel2Component,
      QuizLevel3Component,
      QuizLevel4Component,
      QuizLevel5Component,
      QuizLevel6Component,
      QuizLevel7Component,
      QuizLevel8Component,
      QuizLevel9Component,
      QuizLevel10Component,
      AudioPlayerComponent,
      FftGraphComponent,
      QuizTalkComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      TranslateModule.forRoot({
         loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
         }
      }),
      AppRoutingModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
