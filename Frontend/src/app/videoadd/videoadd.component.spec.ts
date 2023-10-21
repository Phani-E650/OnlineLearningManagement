import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoaddComponent } from './videoadd.component';

describe('VideoaddComponent', () => {
  let component: VideoaddComponent;
  let fixture: ComponentFixture<VideoaddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VideoaddComponent]
    });
    fixture = TestBed.createComponent(VideoaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
