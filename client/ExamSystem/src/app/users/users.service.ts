import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient) { }

  getAllUser(): Observable<any> {
    console.log('getall user');
    return this.http.get('http://localhost:4000/user/', {
      headers: this.headers
    });
  }
}
