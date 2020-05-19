/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { QuizLevel5Component } from './quiz-level5.component';

describe('QuizLevel5Component', () => {
  let component: QuizLevel5Component;
  let fixture: ComponentFixture<QuizLevel5Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizLevel5Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizLevel5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
