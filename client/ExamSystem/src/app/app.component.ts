import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ExamSystem';
  isLogin: boolean;
  user;
  ngOnInit ( ) {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    console.log(user);
    if (this.user) {
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
  }
}
