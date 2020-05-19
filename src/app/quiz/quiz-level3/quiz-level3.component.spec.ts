/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { QuizLevel3Component } from './quiz-level3.component';

describe('QuizLevel3Component', () => {
  let component: QuizLevel3Component;
  let fixture: ComponentFixture<QuizLevel3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizLevel3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizLevel3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
