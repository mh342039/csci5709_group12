import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HttpService } from 'src/app/services/httpservice.service';
import { resourceLimits } from 'worker_threads';

@Component({
  selector: 'app-assign-mentor',
  templateUrl: './assign-mentor.component.html',
  styleUrls: ['./assign-mentor.component.css']
})
export class AssignMentorComponent implements OnInit {

  searchKeyword:any;
  displayedColumns: string[] = ['groupName', 'faculty', 'location', 'mentor','action'];
  dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  mentorList: any[] = []
  constructor(private httpservice: HttpService) { }

  ngOnInit(): void {
    this.httpservice.getServiceCall("/group-management/groups")
    .subscribe((result: any)=>{
      if(result.status){
        console.log(result)
        var temp = new MatTableDataSource(result.data);
        this.dataSource = temp;

        this.httpservice.getServiceCall("/group-management/mentors")
        .subscribe((result: any)=>{
          if(result.status){
            console.log(result)
            this.mentorList = result.data
          }
          else{
            console.log(result)
          }

        },(error: any)=>{
          
        })
  
      }
      else{
        console.log(result)
      }
    },(error: any)=>{
      console.log(error)
    })


  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  cancel(name: any){
    console.log(this.dataSource)
    var index = this.dataSource.filteredData.findIndex((o: any) => o.name == name)
    this.dataSource.filteredData[index].oldMentorValue = this.dataSource.filteredData[index].mentor
  }

  save(obj:any){
    //save http call
    this.httpservice.postServiceCall("/group-management/assign-mentor", obj)
    .subscribe((result: any)=>{
      console.log(result)

      if(result.status){
        console.log(result)
        this.httpservice.getServiceCall("/group-management/groups")
        .subscribe((result: any)=>{
          if(result.status){
            console.log(result)
            var temp = new MatTableDataSource(result.data);
            this.dataSource = temp;
              }
          else{
            console.log(result)
          }
        },(error: any)=>{
          console.log(error)
        })
    
      }
      else{
        console.log(result)
      }
    },(error: any)=>{
      console.log(error)
    })
  }

  getMentorName(id: any){
    let index = this.mentorList.findIndex(o=>{return o._id == id})
    if(index <0 ){
      return "un-assigned";
    }
    else {
      return this.mentorList[index].name
    }
  }
  getGroupData(){
    return [
      {GroupName: 'Group1',oldMentorValue: 'Group1', Stream: "Science", location: 'Halifax', name: 'Manish', edit: false},
      {GroupName: 'Group2',oldMentorValue: 'Group2', Stream: "Science", location: 'Halifax', name: 'Hamza', edit: false},
      {GroupName: 'Group3',oldMentorValue: 'Group3', Stream: "Science", location: 'Halifax', name: 'Misbah', edit: false},
      {GroupName: 'Group4',oldMentorValue: 'Group4', Stream: "Science", location: 'Halifax', name: 'Gurleen', edit: false},
      {GroupName: 'Group5',oldMentorValue: 'Group5', Stream: "Science", location: 'Halifax', name: 'Mansi', edit: false},
      {GroupName: 'Un-assigned',oldMentorValue: 'Un-assigned', Stream: "Science", location: 'Halifax', name: 'Divyansh', edit: false} 
    ];
  }

}
