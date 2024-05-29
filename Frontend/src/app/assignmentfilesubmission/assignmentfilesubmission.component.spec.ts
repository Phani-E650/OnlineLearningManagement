import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentfilesubmissionComponent } from './assignmentfilesubmission.component';

describe('AssignmentfilesubmissionComponent', () => {
  let component: AssignmentfilesubmissionComponent;
  let fixture: ComponentFixture<AssignmentfilesubmissionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignmentfilesubmissionComponent]
    });
    fixture = TestBed.createComponent(AssignmentfilesubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
