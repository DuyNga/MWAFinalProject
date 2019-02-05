import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient) { }

    login(loginModel): Observable<any> {
      return this.http.post('http://localhost:4000/user/authenticate', loginModel, {
        headers: this.headers
  });
  }
}
class Loginmodel {
  userName: string;
  password: string;

  constructor() {
    this.userName = 'test';
    this.password = 'test';
  }
}
