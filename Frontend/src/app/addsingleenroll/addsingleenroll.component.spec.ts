import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddsingleenrollComponent } from './addsingleenroll.component';

describe('AddsingleenrollComponent', () => {
  let component: AddsingleenrollComponent;
  let fixture: ComponentFixture<AddsingleenrollComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddsingleenrollComponent]
    });
    fixture = TestBed.createComponent(AddsingleenrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
