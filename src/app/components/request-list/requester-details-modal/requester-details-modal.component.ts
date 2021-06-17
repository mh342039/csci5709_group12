import { Component, OnInit, Output, Inject, EventEmitter, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Requests } from '../requests';

@Component({
  selector: 'app-requester-details-modal',
  templateUrl: './requester-details-modal.component.html',
  styleUrls: ['./requester-details-modal.component.css']
})
export class RequesterDetailsModalComponent implements OnInit {

  accepted: boolean;

  ngOnInit(): void {
  }

  constructor(
    public dialogRef: MatDialogRef<RequesterDetailsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      dialogRef.disableClose = true;
    }

  close(): void {
    this.dialogRef.close({event: 'close', data: this.accepted});
  }

  onNoClick(): void {
    this.dialogRef.close({event: 'close', data: this.accepted});
  }

  /*updateRequests(){
    this.requestData.emit();
  }*/
}
