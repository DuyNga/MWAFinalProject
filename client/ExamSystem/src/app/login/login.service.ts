import { Observable, Subject } from 'rxjs';
import { Injectable, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter } from 'events';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public getLoggedInName = new Subject();
  private result: Observable<any>;
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient) { }
  login(loginModel): Observable<any> {

    return this.http.post('http://localhost:4000/user/authenticate/', loginModel, {
        headers: this.headers
    });
    // this.getLoggedInName.next(this.result.subscribe(s => console.log(s.token)));
    // return this.result;
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
