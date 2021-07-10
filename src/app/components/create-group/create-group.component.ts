import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GroupFormation, Mentee } from 'src/app/models/groupFormation.model';
import { HttpService } from 'src/app/services/httpservice.service';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent implements OnInit {
  groupData: GroupFormation
  criteria:string = "faculty"
  menteeList: Mentee[] = [];  
  savedMentee: Mentee[] = [];
  constructor(private httpservice: HttpService, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    if(this.data.isEdit){
      this.httpservice.getServiceCall("/group-management/mentees/"+this.data.groupData._id)
      .subscribe((result: any)=>{
        if(result.status){
          this.groupData = new GroupFormation()
          this.groupData._id = this.data.groupData._id
          this.groupData.faculty = this.data.groupData.faculty
          this.groupData.groupName = this.data.groupData.groupName
          this.groupData.location = this.data.groupData.location
          for (let mentee in result.data){
            let temp = result.data[mentee]
            temp.checked = true
            this.menteeList.push(temp)
            this.savedMentee.push(temp)
            this.groupData.mentee.push({menteeId: temp._id, flag: ""})
          }
        }
        else{
          console.log(result)
        }
      },(error: any)=>{
        console.log(error)
      })

    }
    else{
    this.groupData = new GroupFormation()
    }
  }

  search(){
    var value;
    if(this.criteria == "faculty"){ value = this.groupData.faculty}
    else if(this.criteria == "location"){value = this.groupData.location}
    this.httpservice.getServiceCall("/group-management/mentees/"+this.criteria+"/"+value)
    .subscribe((result:  any)=>{
      if(result.status){
        var temp :any[] = []
        this.menteeList.forEach(o=>{ 
          if(o.checked){
            temp.push(o)
          }
        })
        this.menteeList = temp

        for(let i in result.data){
          console.log(temp)
          console.log(result.data[i]._id)
          console.log(temp.findIndex((o)=>{return o._id == result.data[i]._id}))
          if(temp.findIndex((o)=>{return o._id == result.data[i]._id}) < 0){
            this.menteeList.push(result.data[i])
          }
        }
      }
      else{
        console.log(result)
      }
    },(error: any)=>{ 
      console.log(error)
    })
  }

  updateMentee(checked: any, menteeId: any){
    if(this.savedMentee.findIndex(o=>{ return o._id == menteeId})>0 && this.groupData.mentee){
      if(checked){
        this.groupData.mentee[this.groupData.mentee.findIndex(o=>{ return o.menteeId == menteeId})].flag = ""
            }
      else{
        this.groupData.mentee[this.groupData.mentee.findIndex(o=>{ return o.menteeId == menteeId})].flag = "R"
      }
    }
    else{
      if(checked){
        this.groupData.mentee.push({menteeId: menteeId, flag: "A"})
      }
      else{
        if(this.groupData.mentee){
          this.groupData.mentee.splice(this.groupData.mentee.findIndex(o => {o.menteeId = menteeId}), 1);
        }
      }
    }
  }

  save(){
    console.log(this.groupData)
    if(this.data.isEdit){
      this.edit();
    }
    else{
      this.create();
    }
  }

  create(){
    this.httpservice.postServiceCall("/group-management/create", this.groupData)
    .subscribe((result: any)=>{
      if(result.status){
        console.log(result)
      }
      else{
        console.log(result)
      }
    },(error: any)=>{
      
    })
  }

  edit(){
    this.httpservice.putServiceCall("/group-management/update", this.groupData)
    .subscribe((result: any)=>{
      if(result.status){
        console.log(result)
      }
      else{
        console.log(result)
      }
    },(error: any)=>{

    })

  }

  delete(){
    console.log(JSON.stringify( this.groupData))
    this.httpservice.deleteServiceCall("/group-management/delete/"+this.groupData._id, {})
    .subscribe((result: any)=>{
      if(result.status){
        console.log(result)
      }
      else{
        console.log(result)
      }
    },(error: any)=>{
      console.log(error)
    })
  }
  
}
