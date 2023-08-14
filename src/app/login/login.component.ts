import { Component,} from '@angular/core';


import { AuthenticationService } from '../authentication.service';
import { ReactiveFormsModule } from '@angular/forms';

import { Validator } from '@angular/forms';
import {OnInit} from '@angular/core';
import { inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotesService } from 'note.service';
import { RouterService } from 'router.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  });
 
  constructor(
    private authService: AuthenticationService,
    private notesService: NotesService,
    private route : RouterService
    
  ) {}

  aroute = inject(ActivatedRoute);
 

    
  ngOnInit(): void {}

  loginSubmit(){
    if (this.loginForm.invalid) {
      return;
    }

    this.notesService.login(this.loginForm.controls.username.value, this.loginForm.controls.password.value).subscribe(() => {
      console.log("Created");
    })
    console.log(this.loginForm.controls.username.value);
    console.log(this.loginForm.controls.password.value);
    

    var l=  this.authService.login(this.loginForm.controls.username.value,this.loginForm.controls.password.value)
    
    var returnUrl = this.aroute.snapshot.queryParams['returnUrl'];
    console.log("return url login component = "+ returnUrl);
    this.route.routeToDashboard();
 
    
  
}
}