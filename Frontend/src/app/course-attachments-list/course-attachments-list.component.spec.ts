import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseAttachmentsListComponent } from './course-attachments-list.component';

describe('CourseAttachmentsListComponent', () => {
  let component: CourseAttachmentsListComponent;
  let fixture: ComponentFixture<CourseAttachmentsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourseAttachmentsListComponent]
    });
    fixture = TestBed.createComponent(CourseAttachmentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
