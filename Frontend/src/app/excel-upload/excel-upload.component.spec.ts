import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcelUploadComponent } from './excel-upload.component';

describe('ExcelUploadComponent', () => {
  let component: ExcelUploadComponent;
  let fixture: ComponentFixture<ExcelUploadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExcelUploadComponent]
    });
    fixture = TestBed.createComponent(ExcelUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
