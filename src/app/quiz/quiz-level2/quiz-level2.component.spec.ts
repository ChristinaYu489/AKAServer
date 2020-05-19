/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { QuizLevel2Component } from './quiz-level2.component';

describe('QuizLevel2Component', () => {
  let component: QuizLevel2Component;
  let fixture: ComponentFixture<QuizLevel2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizLevel2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizLevel2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
