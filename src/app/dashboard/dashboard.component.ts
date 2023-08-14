import { Component , OnInit} from '@angular/core';

import { NotesService } from 'note.service';
import { Note } from 'note.model'; 
import { FormGroup, FormControl, MinValidator, MinLengthValidator } from '@angular/forms';
import { Validators } from '@angular/forms';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  profileForm = new FormGroup({
    heading: new FormControl('',[Validators.required,Validators.minLength(3)]),
    notes: new FormControl('',Validators.required),
  });
  
  constructor(private notesService: NotesService) { };
  note: Note = new Note();
  noteList: Note[]=[];
  text: any;
  title: any;
  jsonadd: any;
  errorMessage: string = '';
  

  get heading() 
  { 
    return this.profileForm.get('heading');
 } 
  onSubmit() {
    console.log(this.title + "  " + this.text);
    this.jsonadd = {
      "title": this.title,
      "text": this.text
    }
    this.notesService.addNote(this.jsonadd).subscribe(() => {
      console.log("Created");
    },
    (err) => {this.errorMessage = "Error while fetching data from server";}
    )
    this.profileForm.reset();
  }

  getAll(){
    this.notesService.getNotes().subscribe(
      (response) => {
        this.noteList = response;
      },  
       (err) => {this.errorMessage = "Error while fetching data from server";})
       
  }

  ngOnInit() { 
    
    
    this.getAll();
    this.notesService.refreshrequired.subscribe(response =>{ 
      this.getAll();
    } );
     ;
  }
}
