/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { QuizTalkComponent } from './quiz-talk.component';

describe('QuizTalkComponent', () => {
  let component: QuizTalkComponent;
  let fixture: ComponentFixture<QuizTalkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizTalkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizTalkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
