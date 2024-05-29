import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleheaderComponent } from './moduleheader.component';

describe('ModuleheaderComponent', () => {
  let component: ModuleheaderComponent;
  let fixture: ComponentFixture<ModuleheaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModuleheaderComponent]
    });
    fixture = TestBed.createComponent(ModuleheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
