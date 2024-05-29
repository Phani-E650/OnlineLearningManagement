import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherdashboardComponent } from './teacherdashboard.component';

describe('TeacherdashboardComponent', () => {
  let component: TeacherdashboardComponent;
  let fixture: ComponentFixture<TeacherdashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeacherdashboardComponent]
    });
    fixture = TestBed.createComponent(TeacherdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
