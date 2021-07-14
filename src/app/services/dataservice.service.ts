import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  loggedInUser: any
  constructor(private router: Router) { }

  setLoggedInUser(obj: any){
    this.loggedInUser = obj;
  }

  logout(){
    this.loggedInUser.status = false
    this.router.navigateByUrl('/signin')
  }
  
}
