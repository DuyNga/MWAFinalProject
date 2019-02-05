import { LoginService } from './login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  constructor( private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router, private loginService: LoginService) {
  }

  ngOnInit() {
      this.loginForm = this.formBuilder.group({
        userName: ['', Validators.required],
        password: ['', Validators.required]
    });
  }
  onSubmit() {
    console.log(this.loginForm.value);
    this.loginService.login(JSON.stringify(this.loginForm.value)).subscribe(result => {
      this.loading = true;
      localStorage.clear();
      localStorage.setItem('currentUser', JSON.stringify(result));
      if (result.role === '1') {
        this.router.navigate(['/admin/users']);
      } else if (result.role === '2') {
        this.router.navigate(['admin/questions']);
      }
      this.loading = false;
    },
    err => { this.errormessage = 'User name Or Password is incorrect. Please try again !!!';
    });

  }
}
