import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentSolutionComponent } from './assignment-solution.component';

describe('AssignmentSolutionComponent', () => {
  let component: AssignmentSolutionComponent;
  let fixture: ComponentFixture<AssignmentSolutionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignmentSolutionComponent]
    });
    fixture = TestBed.createComponent(AssignmentSolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
