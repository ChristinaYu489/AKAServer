/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { QuizLevel4Component } from './quiz-level4.component';

describe('QuizLevel4Component', () => {
  let component: QuizLevel4Component;
  let fixture: ComponentFixture<QuizLevel4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizLevel4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizLevel4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
