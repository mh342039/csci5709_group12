import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from 'src/app/services/dataservice.service';
import { HttpService } from 'src/app/services/httpservice.service';
import { UtilityService } from 'src/app/services/utilityservice.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile: any
  isEdit: boolean = false
  constructor(private httpservice: HttpService, private userdataservice: DataService, private utilityservice: UtilityService) { }

  ngOnInit(): void {
    this.utilityservice.sectionTitle = "Profile"
    this.profile = this.userdataservice.loggedInUser.data
  }

  save(form: NgForm){
    if (form.invalid){
      return;
    }
    this.httpservice.putServiceCall("/updateprofile/" + this.userdataservice.loggedInUser.data._id,this.profile)
      .subscribe((result: any)=>{
        console.log(result)
      },(error: any)=>{
        console.log(error)
      })
  }

  delete(){

  }

}
