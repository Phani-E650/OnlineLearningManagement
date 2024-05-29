import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmissiondownloadComponent } from './submissiondownload.component';

describe('SubmissiondownloadComponent', () => {
  let component: SubmissiondownloadComponent;
  let fixture: ComponentFixture<SubmissiondownloadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubmissiondownloadComponent]
    });
    fixture = TestBed.createComponent(SubmissiondownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
