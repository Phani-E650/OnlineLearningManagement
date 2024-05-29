import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollexcelComponent } from './enrollexcel.component';

describe('EnrollexcelComponent', () => {
  let component: EnrollexcelComponent;
  let fixture: ComponentFixture<EnrollexcelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnrollexcelComponent]
    });
    fixture = TestBed.createComponent(EnrollexcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
