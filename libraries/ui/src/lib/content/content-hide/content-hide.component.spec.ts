import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentHideComponent } from './content-hide.component';

describe('ModuleUsageComponent', () => {
  let component: ContentHideComponent;
  let fixture: ComponentFixture<ContentHideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentHideComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentHideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
