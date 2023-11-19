import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovecourseComponent } from './approvecourse.component';

describe('ApprovecourseComponent', () => {
  let component: ApprovecourseComponent;
  let fixture: ComponentFixture<ApprovecourseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApprovecourseComponent]
    });
    fixture = TestBed.createComponent(ApprovecourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
