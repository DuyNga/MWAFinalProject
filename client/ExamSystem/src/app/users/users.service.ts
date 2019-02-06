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

  addNewUser(data) {
    return this.http.post('http://localhost:4000/user/register', data, {
      headers: this.headers
    });
  }
  deactiveUserById(id) {
    return this.http.put('http://localhost:4000/user/updatestatus/' + id, {
      headers: this.headers
    });
  }

  deleteUserById(id) {
    return this.http.delete('http://localhost:4000/user/' + id, {
      headers: this.headers
    });
  }
}
