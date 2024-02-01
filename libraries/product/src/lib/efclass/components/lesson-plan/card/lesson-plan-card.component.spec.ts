import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonPlanCardComponent } from './lesson-plan-card.component';
import {FallbackImageComponent} from "../../../media/image/fallback/fallback-image.component";
import {ImageComponent} from "../../../media/image/image/image.component";

describe('LessonPlanCardComponent', () => {
  let component: LessonPlanCardComponent;
  let fixture: ComponentFixture<LessonPlanCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        FallbackImageComponent,
        ImageComponent,
        LessonPlanCardComponent
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonPlanCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
