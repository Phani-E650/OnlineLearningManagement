import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeadlinedatevalueComponent } from './deadlinedatevalue.component';

describe('DeadlinedatevalueComponent', () => {
  let component: DeadlinedatevalueComponent;
  let fixture: ComponentFixture<DeadlinedatevalueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeadlinedatevalueComponent]
    });
    fixture = TestBed.createComponent(DeadlinedatevalueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
