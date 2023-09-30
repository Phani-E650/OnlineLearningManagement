import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsernameLinkRendererComponent } from './username-link-renderer.component';

describe('UsernameLinkRendererComponent', () => {
  let component: UsernameLinkRendererComponent;
  let fixture: ComponentFixture<UsernameLinkRendererComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsernameLinkRendererComponent]
    });
    fixture = TestBed.createComponent(UsernameLinkRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
