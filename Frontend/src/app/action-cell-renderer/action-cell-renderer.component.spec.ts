import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionCellRendererComponent } from './action-cell-renderer.component';

describe('ActionCellRendererComponent', () => {
  let component: ActionCellRendererComponent;
  let fixture: ComponentFixture<ActionCellRendererComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActionCellRendererComponent]
    });
    fixture = TestBed.createComponent(ActionCellRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
