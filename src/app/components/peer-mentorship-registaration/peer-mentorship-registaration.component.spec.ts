import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeerMentorshipRegistarationComponent } from './peer-mentorship-registaration.component';

describe('PeerMentorshipRegistarationComponent', () => {
  let component: PeerMentorshipRegistarationComponent;
  let fixture: ComponentFixture<PeerMentorshipRegistarationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeerMentorshipRegistarationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeerMentorshipRegistarationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
