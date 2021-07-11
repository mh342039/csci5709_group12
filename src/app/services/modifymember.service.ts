import { Injectable } from '@angular/core';
import { RequesterDetailsModalComponent } from '../components/request-list/requester-details-modal/requester-details-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { MemberProfileModel } from 'src/app/models/member-profile.model';

@Injectable({
  providedIn: 'root'
})
export class ModifymemberService {

  constructor(private dialog: MatDialog) { }

  isRecordUpdated: boolean = false;
}
