import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelCellComponent } from './label-cell.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('LabelCellComponent', () => {
  let component: LabelCellComponent;
  let fixture: ComponentFixture<LabelCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [LabelCellComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
