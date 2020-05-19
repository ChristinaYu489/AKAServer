/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { QuizTypeSelectComponent } from './quiz-type-select.component';

describe('QuizTypeSelectComponent', () => {
  let component: QuizTypeSelectComponent;
  let fixture: ComponentFixture<QuizTypeSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizTypeSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizTypeSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
