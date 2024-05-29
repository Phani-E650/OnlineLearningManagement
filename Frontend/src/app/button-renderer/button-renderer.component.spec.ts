import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonRendererComponent } from './button-renderer.component';

describe('ButtonRendererComponent', () => {
  let component: ButtonRendererComponent;
  let fixture: ComponentFixture<ButtonRendererComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonRendererComponent]
    });
    fixture = TestBed.createComponent(ButtonRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
