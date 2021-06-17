import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-requester-details-modal',
  templateUrl: './requester-details-modal.component.html',
  styleUrls: ['./requester-details-modal.component.css']
})
export class RequesterDetailsModalComponent implements OnInit {

  ngOnInit(): void {
  }

  food: string;

  constructor(
    public dialogRef: MatDialogRef<RequesterDetailsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close({
    });
  }
}
