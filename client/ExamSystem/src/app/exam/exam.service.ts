import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  constructor(private http: HttpClient) { }
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  getRandom(): Observable<any> {
    console.log('get random Question');
    return this.http.get('http://localhost:4000/question/get_random/', {
      headers: this.headers
    });
  }
}
