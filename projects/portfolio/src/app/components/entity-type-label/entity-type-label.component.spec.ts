import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityTypeLabelComponent } from './entity-type-label.component';

describe('EntityTypeLabelComponent', () => {
  let component: EntityTypeLabelComponent;
  let fixture: ComponentFixture<EntityTypeLabelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [EntityTypeLabelComponent]
    });
    fixture = TestBed.createComponent(EntityTypeLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
