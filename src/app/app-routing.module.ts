import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { SignupComponent } from './signup/signup.component';
import { QuizTypeSelectComponent } from './quiz-type-select/quiz-type-select.component';
import { QuizComponent } from './quiz/quiz.component';
import { LoginComponent } from './login/login.component';
import { ResultComponent } from './result/result.component';
import { Error404Component } from './error404/error404.component';
import { QuizTalkComponent } from './quiz-talk/quiz-talk.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'quiz/type_select', component: QuizTypeSelectComponent },
  { path: 'quiz', component: QuizComponent },
  { path: 'quiz/talk', component: QuizTalkComponent },
  { path: 'result', component: ResultComponent },
  { path: 'talk', component: QuizTalkComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
}