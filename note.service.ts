import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs';
import { Note } from './note.model';
import { Subject } from 'rxjs';
import { AuthenticationService } from 'src/app/authentication.service';
import { HttpHeaders } from '@angular/common/http';
import { Login } from 'login.model';
@Injectable({
  providedIn: 'root',
})
export class NotesService {
  private serverUrl = 'http://localhost:3000/notes';
  private Url = 'http://localhost:3000/login';
  private aUrl = 'http://localhost:3000/';
  
  data:any
  constructor(private http: HttpClient) { }
  private _refresh = new Subject<void>();
  get refreshrequired()
  {
      return this._refresh;
  }

  setBearerToken(token: string): void {
    localStorage.setItem('bearerToken', token);
  }

  getBearerToken(): string {
    return localStorage.getItem('bearerToken');
  }

  getNotes(): Observable<Note[]> {
    const token = this.getBearerToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log(token)
    return this.http.get<Note[]>(this.serverUrl, { headers });
  }
  login(username: string, password: string) {
    return this.http.post(this.Url, { username, password });
  }



  addNote(note: Note): Observable<Note> {
    const token = this.getBearerToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<Note>(this.serverUrl, note, { headers }).pipe(tap(()=>{this._refresh.next();}));
  }
  
 
}