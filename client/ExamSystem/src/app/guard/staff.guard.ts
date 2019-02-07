import { AuthService } from './../login/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NavService } from '../service/nav.service';

@Injectable({
  providedIn: 'root'
})
export class StaffGuard implements CanActivate {
  constructor(private router: Router,
    private authService: AuthService, private navService:NavService){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      console.log("Staff Gaurd");
      if (currentUser === 'superAdmin') {
        return true;
      }
      const token = currentUser.token;

      if (token) {
        console.log("subcribe");

        this.authService.getUserInfo(token).subscribe(
          response => {

           console.log("subcribe");

            if (response.role === '2' || response.role.toLowerCase() === 'staff'){
              this.navService.updateNavAfterAuth('staff');
              this.navService.updateLoginStatus(true);
              this.router.navigate(['/admin/invitations']);
              return true;
            } else {
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
        this.router.navigate(['/login']);
        return false;
      }
  }
}
