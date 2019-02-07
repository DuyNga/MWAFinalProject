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
      if (currentUser === 'superAdmin') {
        return true;
      }
      const token = currentUser.token;
      if(currentUser!==null){
        if (currentUser.role === 'Staff') {
          return true;
        } else {
          alert("You are not authorized for this page!!!! \n You will be redirect to index now!!!")
          this.router.navigate(['/index']);
          return false;
        }
      } else {
        this.router.navigate(['/login']);
        return false;
      }

  }
}
