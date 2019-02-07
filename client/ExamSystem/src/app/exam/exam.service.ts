import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExamService {
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient) {
      this.headers.set('Access-Control-Allow-Origin', '*');
   }
  getRandom(): Observable<any> {
    console.log('get random Question');
    return this.http.get('http://localhost:4000/question/get_random/', {
      headers: this.headers
    });
  }

  addTokenToBlackList(token) {
    return this.http.post('http://localhost:4000/invitation/blacklist', token, {
      headers: this.headers
    });
  }

  getBlackListToken(token){
    return this.http.get('http://localhost:4000/invitation/blacklist/' + token, {
      headers: this.headers
    });
  }

  submitAnswer(data){
    return this.http.post('http://localhost:4000/invitation/answer/' , data, {
      headers: this.headers
    });
  }
}
