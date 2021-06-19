import { Component, OnInit, Output, Inject, EventEmitter, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UtilityService } from '../../../services/utilityservice.service';

@Component({
  selector: 'app-requester-details-modal',
  templateUrl: './requester-details-modal.component.html',
  styleUrls: ['./requester-details-modal.component.css']
})
export class RequesterDetailsModalComponent implements OnInit {

  accepted: boolean;

  confirmed: boolean;

  originalValue: string;

  enableConfirmBtn: boolean = false;

  requestType: string;

  ngOnInit(): void {
  }

  constructor(
    public dialogRef: MatDialogRef<RequesterDetailsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public util: UtilityService) {
      dialogRef.disableClose = true;
      util.modalTitle="Member Details";
      this.originalValue = data.requestType;
    }

  close(): void {
    this.dialogRef.close({event: 'close', accepted: this.accepted, requestType: this.requestType, confirmed: this.confirmed});
  }

  roles = ['Role Change', 'Remove Member', 'Deactivate Account'];

  selected = this.roles[0];

  enableConfirm(value: string){
    if(this.originalValue != value){
      this.requestType = value;
      this.enableConfirmBtn = true;
    }
    else{
      this.requestType = this.data.requestType;
      this.enableConfirmBtn = false;
    }
  }
}
