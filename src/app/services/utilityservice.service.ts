import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityserviceService {

  constructor() { }

  sidenavWidth = 5;
  sidenavMargin = 70;
  pinned: boolean = false;
  mouseenter: boolean = false;
  isDefaultSized: boolean = true;

  open() {
		this.sidenavWidth = 19;
    this.sidenavMargin = 270;
    console.log(this.mouseenter);

	}
	close() {
    if(!this.pinned){
  		this.sidenavWidth = 5;
      this.sidenavMargin = 70;
    }
    console.log(this.mouseenter);
	}
  pin(){
    if(this.pinned){
      this.pinned = false;
      this.close();
    }
    else{
      this.open();
      this.pinned = true;
    }
  }
}
