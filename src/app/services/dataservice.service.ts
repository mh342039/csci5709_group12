import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import { MainComponent } from '../components/main/main.component';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  role:any
  loggedInUser: any
  isAdmin: boolean= false
  // constructor(private router: Router, private mainComp: MainComponent) { }
  constructor(private router: Router) { }
  setLoggedInUser(obj: any){
    this.loggedInUser = obj;
    // this.loggedInUser.role=this.mainComp.allUsers.filter((user: any) => {
    //   return user.role == this.loggedInUser.data.role
    // })
    this.isAdmin = (this.loggedInUser.data.role == "ADMIN")
  }

  logout(){
    this.loggedInUser.status = false
    this.isAdmin = false
    this.router.navigateByUrl('/signin')
  }
  
}
