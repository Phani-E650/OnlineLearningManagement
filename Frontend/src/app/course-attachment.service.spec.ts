import { TestBed } from '@angular/core/testing';

import { CourseAttachmentService } from './course-attachment.service';

describe('CourseAttachmentService', () => {
  let service: CourseAttachmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseAttachmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
