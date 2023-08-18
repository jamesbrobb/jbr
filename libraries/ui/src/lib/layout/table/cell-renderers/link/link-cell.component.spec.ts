import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkCellComponent } from './link-cell.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('LinkCellComponent', () => {
  let component: LinkCellComponent;
  let fixture: ComponentFixture<LinkCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [LinkCellComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
