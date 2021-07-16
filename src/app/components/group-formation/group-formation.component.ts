// <!-- Mohammed Hamza Jasnak mh342039@dal.ca -->
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HttpService } from 'src/app/services/httpservice.service';
import { CreateGroupComponent } from '../create-group/create-group.component';

@Component({
  selector: 'app-group-formation',
  templateUrl: './group-formation.component.html',
  styleUrls: ['./group-formation.component.css']
})
export class GroupFormationComponent implements OnInit {
  searchKeyword:any;
  displayedColumns: string[] = ['groupName', 'faculty', 'location'];
  dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private httpservice: HttpService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getGroups()
  }

  getGroups(){
    this.httpservice.getServiceCall("/group-management/groups")
    .subscribe((result: any)=>{
      if (result.status){
        console.log(result)
        var temp = new MatTableDataSource(result.data);
        this.dataSource = temp;
    
      }
      else{
        console.log(result)
      }
    }, (error: any)=>{
      console.log(error)
    })
  }
  ngAfterViewInit() {
    if(this.dataSource){
    this.dataSource.paginator = this.paginator;
    }
  }

  createGroup(){
    const dialogRef = this.dialog.open(CreateGroupComponent, {
      width: '60%',
      height:"90%",
      data: {isEdit: false}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getGroups();
    });
  }
  

  openGroupDetail(group: any){
    const dialogRef = this.dialog.open(CreateGroupComponent, {
      width: '60%',
      height:"80%",
      data: {isEdit: true, groupData: group }
    });

    dialogRef.afterClosed().subscribe(result => {
     this.getGroups()
    });
  }

}
