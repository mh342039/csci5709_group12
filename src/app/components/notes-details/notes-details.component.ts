import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { COMMA, ENTER, SPACE } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { Router } from '@angular/router';
import { Note } from 'src/app/models/notes.model';
import { NotesService } from 'src/app/services/notesdata.service';

@Component({
  selector: 'app-notes-details',
  templateUrl: './notes-details.component.html',
  styleUrls: ['./notes-details.component.css']
})
export class NotesDetailsComponent implements OnInit {
  note: Note = new Note();
  separatorKeysCodes: number[] = [ENTER, COMMA, SPACE];
  TitleFormControl = new FormControl();
  tagFormControl = new FormControl();
  tags: string[] = [];
  isCreate : boolean=false; 
  @ViewChild('tagInput') tagInput!: ElementRef<HTMLInputElement>;

  constructor(private ref: ChangeDetectorRef, private dataservice: NotesService, private router: Router) {
  }

  ngOnInit(): void {
    this.getNote();
    this.ref.detectChanges();
  }

  getNote() {
    let temp = this.dataservice.getNote();
    if (temp) {
      this.note = temp;
      this.isCreate = true;

    }
    else {
      this.note = new Note();
    }
  }

  goBackToNotes() {
    this.dataservice.setNote(null);
    this.router.navigate(['/main/notes']);
  }

  addTag(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.note.tags.push(value);
    }
    event.value = "";
    this.tagFormControl.setValue(null);
  }

  removeTag(tag: string): void {
    const index = this.note.tags.indexOf(tag);

    if (index >= 0) {
      this.note.tags.splice(index, 1);
    }
  }

  saveNote() {
    if (this.note._id == -1) {
      // should be removed later
      this.note._id = Math.floor(Math.random() * 10000);
      this.dataservice.addNote(this.note);
      this.router.navigate(['/main/notes']);
    }
    else {
      let index = this.dataservice.getNoteIndex(this.note._id);
      if (index > -1) {
        this.dataservice.saveNote(index, this.note);
      }
    }
  }

  deleteNote() {
    let index = this.dataservice.getNoteIndex(this.note._id);
    if (index > -1) {
      this.dataservice.deleteNote(index);

    }
  }

}
