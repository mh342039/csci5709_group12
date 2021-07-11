import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { UtilityService } from '../../services/utilityservice.service';
import { RequesterDetailsModalComponent } from '../request-list/requester-details-modal/requester-details-modal.component';
import { ModifymemberService } from '../../services/modifymember.service';
import { MemberProfileModel } from 'src/app/models/member-profile.model';

@Component({
  selector: 'app-modifymember',
  templateUrl: './modifymember.component.html',
  styleUrls: ['./modifymember.component.css']
})
export class ModifymemberComponent implements OnInit {

  displayedColumns: string[] = ['name', 'email', 'requestStatus', 'date'];

  dataSource = new MatTableDataSource<MemberProfileModel>(this.dataservice.memberData);
  email = new FormControl('', Validators.pattern('[a-z0-9._%+-]+@(dal)+\\.(ca)'));
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  disableAccountForm: any;

  isSubmitted: boolean = false;

  success: boolean = false;

  dialogValue: boolean;

  index: number;

  searchEmail: string;

  constructor(private fb: FormBuilder, public util: UtilityService, private dataservice: ModifymemberService){
    this.disableAccountForm = this.fb.group({
      email: ["", [Validators.pattern('[a-z0-9._%+-]+@(dal)+\\.(ca)')]]
    });
  }

  ngOnInit(){
    this.util.sectionTitle="Modify Access";
  }

  search(searchValue: any) {
    console.log(searchValue);
    const result = this.dataservice.searchPoolMemberData.filter(elem => elem.email === searchValue);
      if(result.length == 0){
        this.disableAccountForm.controls.email.setErrors({invalid: true});
      }
      else{
        const DupResult = this.dataservice.memberData.filter(elem => elem.email === searchValue);
        if(DupResult.length > 0){
          this.disableAccountForm.controls.email.setErrors({duplicate: true});
        }
        else{
          this.disableAccountForm.controls.email.setErrors(null);
          this.success = true;
          for(let i = 0; i < this.dataservice.searchPoolMemberData.length; i++){
            if(this.dataservice.searchPoolMemberData[i].email === searchValue){
              console.log(i);
              this.index = i;
              break;
            }
          }
          this.searchEmail = searchValue;
        }
      }
  }

  validate(){
    if(!this.isSubmitted){
       if (this.disableAccountForm.controls.email.hasError('pattern')){
         return 'Invalid email format';
       }
    }
    else{
      if (this.disableAccountForm.controls.email.hasError('invalid')){
        this.isSubmitted = false;
        this.success = false;
        return 'User not found';
      }
      if (this.disableAccountForm.controls.email.hasError('duplicate')){
        this.isSubmitted = false;
        this.success = false;
        return 'Account already deactivated';
      }
    }
  }

  openDialog(){
    this.dataservice.openDialog(this.index, this.searchEmail);
    this.dataSource = new MatTableDataSource<MemberProfileModel>(this.dataservice.memberData);
  }
}
