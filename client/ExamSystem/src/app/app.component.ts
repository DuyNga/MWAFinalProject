import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavService } from './service/nav.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ExamSystem';
  isLogin: boolean;
  user;
  links: Array<{ text: string, path: string }>;
  isLoggedIn = false;
  constructor( private router: Router, public loginComponent: LoginService, private navService: NavService) {
    this.loginComponent.getLoggedInName.subscribe(result => {
      console.log(result)
      if ( result != null ) {
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    });
  }
  ngOnInit ( ) {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    console.log(user);
    if (this.user != null) {
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
    this.links = this.navService.getLinks();
    this.navService.getLoginStatus().subscribe(status => this.isLoggedIn = status);
  }

  logOut( ) {
    localStorage.clear();
    this.router.navigate(['/login']);
    this.isLogin = false;
    this.navService.updateLoginStatus(false);
  }
}
