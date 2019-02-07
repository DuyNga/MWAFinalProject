
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InvitationsService {
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(public http: HttpClient) { }

  getAllInvitation(): Observable<any> {
    console.log('getall invitation');
    return this.http.get('http://localhost:4000/invitation/get_all', {
      headers: this.headers
    });
  }

  randomQuestion() {
    return this.http.get('http://localhost:4000/question/get_random', {
      headers: this.headers
    });
  }

  sendEmail(data) {
    data.status="Sent";
    return this.http.post("http://localhost:4000/invitation/send_email",data, {
      headers: this.headers
    });
  }

  addNewInvitation(data) {
    if (data.hasOwnProperty('_id')) {
      return this.http.put("http://localhost:4000/invitation/"+data.id, data, {
        headers: this.headers
      });
    } else {
      return this.http.post("http://localhost:4000/invitation/add", data, {
        headers: this.headers
      });
    }
  }
  deactiveInvitationById(id) {
    return this.http.put('http://localhost:4000/invitation/updatestatus/' + id, {
      headers: this.headers
    });
  }

  getInvitationById(id) {
    return this.http.get('http://localhost:4000/invitation/' + id, {
      headers: this.headers
    });
  }
}
