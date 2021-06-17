import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotesService } from 'src/app/services/notesdata.service';
import { UtilityService } from 'src/app/services/utilityservice.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  Notes: any;

  constructor(public dataservice: NotesService, private utilityService:  UtilityService, private router: Router) { }

  ngOnInit(): void {
    this.getNotes();
    this.utilityService.sectionTitle = "Notes"
  }

  openCard(index: any){
    this.dataservice.setNote(this.Notes[index]);
    this.router.navigate(["/main/notes-detail"])
  }

  
  getNotes() {
    this.Notes = this.dataservice.getNotes()
  }


}
