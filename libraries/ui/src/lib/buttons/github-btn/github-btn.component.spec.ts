import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GithubBtnComponent } from './github-btn.component';

describe('GithubBtnComponent', () => {
  let component: GithubBtnComponent;
  let fixture: ComponentFixture<GithubBtnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [GithubBtnComponent]
    });
    fixture = TestBed.createComponent(GithubBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
