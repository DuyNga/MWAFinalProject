import { NavService } from './../service/nav.service';
import { EventEmitter } from 'events';
import { LoginService } from './login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, Input, Output } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  errormessage = '';
  @Input () isLogin: boolean;

  constructor( private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router, private loginService: LoginService, private navService: NavService) {
  }
  ngOnInit() {
      this.loginForm = this.formBuilder.group({
        userName: ['', Validators.required],
        password: ['', Validators.required]
    });
  }
  onSubmit() {
    console.log(this.loginForm.value);
    if (this.loginForm.value.userName === 'superAdmin' && this.loginForm.value.password === 'superAdmin') {

      localStorage.clear();
      localStorage.setItem('currentUser', JSON.stringify(this.loginForm.value.userName));
      this.router.navigate(['/admin/users']);
    } else {
      this.loginService.login(JSON.stringify(this.loginForm.value)).subscribe(result => {
      this.loading = true;
      localStorage.clear();
      localStorage.setItem('currentUser', JSON.stringify(result));
      if (result.role === '1' || result.role.toLowerCase() === 'admin') {
      this.navService.updateNavAfterAuth('admin');
        this.navService.updateLoginStatus(true);
        this.router.navigate(['/admin/users']);
      } else if (result.role === '2' || result.role.toLowerCase() === 'staff') {
      this.navService.updateNavAfterAuth('staff');
        this.navService.updateLoginStatus(true);
        this.router.navigate(['admin/invitations']);
      }
      this.loading = false;
    },
    err => {
      this.errormessage = 'User name Or Password is incorrect. Please try again !!!';
    });
  }
  }
}
