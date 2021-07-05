import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-assign-mentor',
  templateUrl: './assign-mentor.component.html',
  styleUrls: ['./assign-mentor.component.css']
})
export class AssignMentorComponent implements OnInit {

  searchKeyword:any;
  displayedColumns: string[] = ['name', 'GroupName', 'Stream', 'location', 'action'];
  dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  groups: any[] = [
    {id: 'steak-0', name: 'Group1'},
    {id: 'pizza-1', name: 'Group2'},
    {id: 'tacos-2', name: 'Group3'}
  ];
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

  cancel(name: any){
    console.log(this.dataSource)
    var index = this.dataSource.filteredData.findIndex((o: any) => o.name == name)
    this.dataSource.filteredData[index].oldGroupName = this.dataSource.filteredData[index].GroupName
  }

  save(name:any){
    var index = this.dataSource.filteredData.findIndex((o: any) => o.name == name)
    this.dataSource.filteredData[index].GroupName = this.dataSource.filteredData[index].oldGroupName

    //save http call
  }

  getGroupData(){
    return [
      {GroupName: 'Group1',oldGroupName: 'Group1', Stream: "Science", location: 'Halifax', name: 'Manish', edit: false},
      {GroupName: 'Group2',oldGroupName: 'Group2', Stream: "Science", location: 'Halifax', name: 'Hamza', edit: false},
      {GroupName: 'Group3',oldGroupName: 'Group3', Stream: "Science", location: 'Halifax', name: 'Misbah', edit: false},
      {GroupName: 'Group4',oldGroupName: 'Group4', Stream: "Science", location: 'Halifax', name: 'Gurleen', edit: false},
      {GroupName: 'Group5',oldGroupName: 'Group5', Stream: "Science", location: 'Halifax', name: 'Mansi', edit: false},
      {GroupName: 'Un-assigned',oldGroupName: 'Un-assigned', Stream: "Science", location: 'Halifax', name: 'Divyansh', edit: false} 
    ];
  }

}
