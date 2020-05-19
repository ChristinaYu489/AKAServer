/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ResultLodingComponent } from './result-loding.component';

describe('ResultLodingComponent', () => {
  let component: ResultLodingComponent;
  let fixture: ComponentFixture<ResultLodingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultLodingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultLodingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
