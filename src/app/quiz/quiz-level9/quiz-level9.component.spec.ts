/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { QuizLevel9Component } from './quiz-level9.component';

describe('QuizLevel9Component', () => {
  let component: QuizLevel9Component;
  let fixture: ComponentFixture<QuizLevel9Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizLevel9Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizLevel9Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
