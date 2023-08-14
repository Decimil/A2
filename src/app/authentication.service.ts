import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { NotesService } from 'note.service';
import { Login } from 'login.model';
import { __core_private_testing_placeholder__ } from '@angular/core/testing';
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService implements OnInit{
  private serverUrl = 'http://localhost:3000/';
  user: Login = new Login();
  userList: Login[]=[];
  isAuth:boolean = false;
  logIN:any

  constructor(private apiService : NotesService, private http : HttpClient)   {}
  ngOnInit(): void {
   
  }
 
  login(username, password) {
    this.logIN = {
      user: username,
      pass: password
    }
  
    if(username == "user1" && password == "pwd"){
      this.isAuth = true;
      this.apiService.setBearerToken("ndjsanjddmkamdlamdlamldmadma");
      return true;
      
    }
    this.isAuth = false;
    return false;
  
  }
    



  isAuthenticate(){
    return this.isAuth;
  }


}