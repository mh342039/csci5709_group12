import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }
  sectionTitle:any;
  accordionDetails : any ={};
  opened :boolean = true
  getaccordionDetails(){
   return this.accordionDetails;
  }
  setaccordionDetails(obj:any){
    this.accordionDetails = obj;
  }
  sidenavWidth = 5;
  sidenavMargin = 70;
  pinned: boolean = false;
  mouseenter: boolean = false;
  isDefaultSized: boolean = true;
  toggleshowIcon(){
    this.opened = !this.opened
  }
  open() {
		this.sidenavWidth = 19;
    this.sidenavMargin = 270;
    this.opened = true
	 }
	 close() {
    if(!this.pinned){
  		this.sidenavWidth = 5;
      this.sidenavMargin = 70;
    }
    this.opened = false
}
  pin(status:boolean){
    this.pinned  = status
    if (status){
    this.opened = true
    }
    else{

    }
  }
}
