import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MessageComponent } from '../components/message/message.component';

@Injectable({
  providedIn: 'root'
})

export class RateMentorserviceService {

  Mentor:any[];
  constructor(private dialog: MatDialog, private router: Router) { 

  this.Mentor=[
    {
      name:"Nikunj Goenka"
    },
    {
      name:"Shehzeen Huda"
    }
  ]

  }

  getMentors(){
    return this.Mentor;
  }

  submitMentorFeedback(){
    
    this.dialog.open(MessageComponent, {
      data: {
        type: 'C',
        title:'Submitted',
        message: 'Mentor Feedback submitted successfully.',
        duration:2000
      }
    });
    this.router.navigate(['/main/rate-mentor']);
  }

}
