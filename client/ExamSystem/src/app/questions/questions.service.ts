
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(public http: HttpClient) { }

  getAllQuestion(): Observable<any> {
    console.log('getall question');
    return this.http.get('http://localhost:4000/question/get_all', {
      headers: this.headers
    });
  }

  addNewQuestion(data) {
    console.log('EEEE');
    console.log(data);
    console.log(data.id);
    console.log(data._id);
    if (data.hasOwnProperty('_id')) {
      return this.http.put("http://localhost:4000/question/"+data.id, data, {
        headers: this.headers
      });
    } else {
      return this.http.post("http://localhost:4000/question/add", data, {
        headers: this.headers
      });
    }
  }
  deactiveQuestionById(id) {
    return this.http.put('http://localhost:4000/question/updatestatus/' + id, {
      headers: this.headers
    });
  }

}


