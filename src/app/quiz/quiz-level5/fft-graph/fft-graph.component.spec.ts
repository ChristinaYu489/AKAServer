/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FftGraphComponent } from './fft-graph.component';

describe('FftGraphComponent', () => {
  let component: FftGraphComponent;
  let fixture: ComponentFixture<FftGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FftGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FftGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
