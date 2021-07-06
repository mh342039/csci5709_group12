import { TestBed } from '@angular/core/testing';

import { PeerMentorshipRegistrationService } from './peer-mentorship-registration.service';

describe('PeerMentorshipRegistrationService', () => {
  let service: PeerMentorshipRegistrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeerMentorshipRegistrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
