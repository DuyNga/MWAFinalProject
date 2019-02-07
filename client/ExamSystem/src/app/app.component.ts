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
export class AppComponent implements OnInit {
  title = 'ExamSystem';
  isLogin: boolean;
  user;
  links: Array<{ text: string, path: string }>;
  isLoggedIn = false;
  constructor( private router: Router, public loginComponent: LoginService, private navService: NavService) {

    this.navService.getLoginStatus().subscribe(status => this.isLoggedIn = status);

  }
  ngOnInit ( ) {
    const user = JSON.parse(localStorage.getItem('currentUser'));

    if (user != null) {
      this.isLoggedIn = true;
<<<<<<< HEAD
      if (user.role === '1' || user.role.toLowerCase() === 'admin') {
        this.navService.updateNavAfterAuth('admin');
        this.navService.updateLoginStatus(true);
      } else if (user.role === '2' || user.role.toLowerCase() === 'staff') {
=======
      if (user.role === '1' || user.role === 'Admin') {
        this.navService.updateNavAfterAuth('Admin');
        this.navService.updateLoginStatus(true);
      } else if (user.role === '2' || user.role === 'Staff') {
>>>>>>> 0e90494b1e71306e64a936bd43624e0d8857a907
        this.navService.updateLoginStatus(true);
        this.navService.updateNavAfterAuth('Staff');
      }
    } else {
      this.navService.updateLoginStatus(false);
      this.isLoggedIn = false;
    }
    this.links = this.navService.getLinks();
  }

  logOut( ) {
    localStorage.clear();
    this.router.navigate(['/login']);
    this.isLogin = false;
    this.navService.updateLoginStatus(false);
  }
}
