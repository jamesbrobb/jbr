import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonsterDetailComponent } from './monster-detail.component';

describe('MonsterDetailComponent', () => {
  let component: MonsterDetailComponent;
  let fixture: ComponentFixture<MonsterDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MonsterDetailComponent]
    });
    fixture = TestBed.createComponent(MonsterDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
