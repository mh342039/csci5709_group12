import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MessageComponent } from '../components/message/message.component';
import { Note } from '../models/notes.model';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  note:any;
  allNotes: Note[] = [];
  constructor( private dialog: MatDialog, private router: Router) { 
    this.allNotes = [
      {
        _id: 12312,
        title: "CSCI 5709 L5V2 CSCI 5709 L5V2 CSCI 5709 L5V2 CSCI 5709 L5V2",
        tags: ["web", "5709"],
        content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
      },
      {
        _id: 17312,
        title: "CSCI 5409 L7",
        tags: ["cloud", "5409", "containers"],
        content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
      },
      {
        _id: 12319,
        title: "CSCI 57410 L6",
        tags: ["serverless", "5410", "lambda"],
        content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
      },
      {
        _id: 12812,
        title: "CSCI 5709 L2V1",
        tags: ["web", "5709"],
        content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
      },
      {
        _id: 12412,
        title: "CSCI 5409 L1",
        tags: ["cloud", "5409", "containers"],
        content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
      },
      {
        _id: 12322,
        title: "CSCI 57410 L8",
        tags: ["serverless", "5410", "lambda"],
        content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
      },
    ];
  }

  setNote(note:any){
    this.note = note;
  }

  getNote(){
    return this.note;
  }

  getNotes(){
    return this.allNotes;
  }

  deleteNote(index: any){
    const dialogRef = this.dialog.open(MessageComponent, {
      data: {
        type: 'W',
        title:'Are you sure?',
        message: 'You will not be able to recover this note!',
        buttonText:'Yes, delete it!',
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.data == "Y"){
        this.allNotes.splice(index,1);
        this.router.navigate(['/main/notes']);
        this.dialog.open(MessageComponent, {
          data: {
            type: 'C',
            title:'Deleted',
            message: 'Note deleted successfully.',
            duration:2000
          }
        });
      }
    });
  }

  saveNote(index:any, obj:any){
    this.allNotes[index] = obj;
    this.dialog.open(MessageComponent, {
      data: {
        type: 'C',
        title:'Saved',
        message: 'Note saved successfully.',
        duration:2000
      }
    });

  }

  addNote(obj: any){
    this.allNotes.push(obj);
    this.dialog.open(MessageComponent, {
      data: {
        type: 'C',
        title:'Added',
        message: 'New note added successfully.',
        duration:2000
      }
    });

  }
  getNoteIndex(id:number){
    return this.allNotes.map(o => o._id).indexOf(id);
  }
}
