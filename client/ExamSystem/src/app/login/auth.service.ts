import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  getUserInfo(acesstoken: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append(
      'Content-Type',
      'application/x-www-form-urlencoded'
    ); // add a new header, creating a new object
    headers = headers.append('x-access-token', acesstoken); // add a new header, creating a new object
      console.log(headers + "chay  toi day roi ne");
    return this.http.get('http://localhost:4000/user/verifyToken/' + acesstoken,  {
      headers: headers
    });
  }
}
