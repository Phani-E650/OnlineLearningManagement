import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursestableComponent } from './coursestable.component';

describe('CoursestableComponent', () => {
  let component: CoursestableComponent;
  let fixture: ComponentFixture<CoursestableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoursestableComponent]
    });
    fixture = TestBed.createComponent(CoursestableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
