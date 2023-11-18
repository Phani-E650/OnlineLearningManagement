import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmarksComponent } from './assignmarks.component';

describe('AssignmarksComponent', () => {
  let component: AssignmarksComponent;
  let fixture: ComponentFixture<AssignmarksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignmarksComponent]
    });
    fixture = TestBed.createComponent(AssignmarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
