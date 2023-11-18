import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkssubmitComponent } from './markssubmit.component';

describe('MarkssubmitComponent', () => {
  let component: MarkssubmitComponent;
  let fixture: ComponentFixture<MarkssubmitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MarkssubmitComponent]
    });
    fixture = TestBed.createComponent(MarkssubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
