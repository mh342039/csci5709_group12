import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-group-formation',
  templateUrl: './group-formation.component.html',
  styleUrls: ['./group-formation.component.css']
})
export class GroupFormationComponent implements OnInit {
  searchKeyword:any;
  displayedColumns: string[] = ['GroupName', 'Stream', 'location', 'mentor'];
  dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() { }

  ngOnInit(): void {
    var temp = new MatTableDataSource(this.getGroupData());
    this.dataSource = temp;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  openGroupDetail(){

  }

  getGroupData(){
    return [
      {GroupName: 'Group1', Stream: "Science", location: 'Halifax', mentor: 'Manish'},
      {GroupName: 'Group2', Stream: "Science", location: 'Halifax', mentor: 'Hamza'},
      {GroupName: 'Group3', Stream: "Science", location: 'Halifax', mentor: 'Misbah'},
      {GroupName: 'Group4', Stream: "Science", location: 'Halifax', mentor: 'Gurleen'},
      {GroupName: 'Group5', Stream: "Science", location: 'Halifax', mentor: 'Mansi'},
      {GroupName: 'Group6', Stream: "Science", location: 'Halifax', mentor: 'Divyansh'},
      {GroupName: 'Group7', Stream: "Science", location: 'Halifax', mentor: 'Manish'},
      {GroupName: 'Group8', Stream: "Science", location: 'Halifax', mentor: 'Hamza'},
      {GroupName: 'Group9', Stream: "Science", location: 'Halifax', mentor: 'Misbah'},
      {GroupName: 'Group10', Stream: "Science", location: 'Halifax', mentor: 'Gurleen'},
      {GroupName: 'Group11', Stream: "Science", location: 'Halifax', mentor: 'Mansi'},
      {GroupName: 'Group12', Stream: "Science", location: 'Halifax', mentor: 'Divyansh'},
 
    ];
  }
}
