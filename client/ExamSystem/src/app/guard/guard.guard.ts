import { NavService } from './../service/nav.service';
import { AuthService } from '../login/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ifError } from 'assert';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService, private navService:NavService
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      console.log(currentUser);
      if (currentUser === 'superAdmin') {
        return true;
      }
      const token = currentUser.token;

      if (token) {
        this.authService.getUserInfo(token).subscribe(
          response => {
            if (response.role === '1') {
              this.navService.updateNavAfterAuth('Admin');
              this.navService.updateLoginStatus(true);
              this.router.navigate(['/admin/invitations']);
              // This means already logged-in
              return true;
<<<<<<< HEAD
=======
            } else if (response.role === '2') {
              this.navService.updateNavAfterAuth('Staff');
              this.navService.updateLoginStatus(true);
              this.router.navigate(['/admin/invitations']);
              // This means already logged-in
              return true;
>>>>>>> 0e90494b1e71306e64a936bd43624e0d8857a907
            } else {
              // This means token expire
              localStorage.clear();
              this.router.navigate(['/login']);
              return false;
            }
          },
          err => {
            localStorage.clear();
            this.router.navigate(['/login']);
            return false;
          }
        );
      } else {
        // not logged in so redirect to login page
        this.router.navigate(['/login']);
        return false;
      }
    return true;
  }
}
