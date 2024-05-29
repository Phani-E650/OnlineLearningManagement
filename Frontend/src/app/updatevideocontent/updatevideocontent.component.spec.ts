import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatevideocontentComponent } from './updatevideocontent.component';

describe('UpdatevideocontentComponent', () => {
  let component: UpdatevideocontentComponent;
  let fixture: ComponentFixture<UpdatevideocontentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdatevideocontentComponent]
    });
    fixture = TestBed.createComponent(UpdatevideocontentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
