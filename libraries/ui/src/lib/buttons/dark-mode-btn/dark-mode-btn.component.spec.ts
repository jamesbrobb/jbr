import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DarkModeBtnComponent } from './dark-mode-btn.component';

describe('DarkModeBtnComponent', () => {
  let component: DarkModeBtnComponent;
  let fixture: ComponentFixture<DarkModeBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DarkModeBtnComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DarkModeBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
