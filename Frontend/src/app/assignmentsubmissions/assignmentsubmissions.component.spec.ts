import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentsubmissionsComponent } from './assignmentsubmissions.component';

describe('AssignmentsubmissionsComponent', () => {
  let component: AssignmentsubmissionsComponent;
  let fixture: ComponentFixture<AssignmentsubmissionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignmentsubmissionsComponent]
    });
    fixture = TestBed.createComponent(AssignmentsubmissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
