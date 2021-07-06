import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MessageComponent } from '../components/message/message.component';

@Injectable({
  providedIn: 'root'
})
export class PeerMentorshipRegistrationService {

  registeredUser:any;
  constructor(private dialog: MatDialog, private router: Router) { }

  saveUser(){
    this.dialog.open(MessageComponent, {
      data: {
        type: 'C',
        title:'Registration Successful',
        message: 'Registration request raised. You will be notified once it is approved.',
        duration:3000
      }
    });

  }
}
