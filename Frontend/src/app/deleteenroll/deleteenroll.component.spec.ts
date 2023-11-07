import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteenrollComponent } from './deleteenroll.component';

describe('DeleteenrollComponent', () => {
  let component: DeleteenrollComponent;
  let fixture: ComponentFixture<DeleteenrollComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteenrollComponent]
    });
    fixture = TestBed.createComponent(DeleteenrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
