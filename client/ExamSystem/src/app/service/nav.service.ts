import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavService {

  private links = new Array<{ text: string, path: string }>();
  private isLoggedIn = new Subject<boolean>();

  constructor() {
    //this.addItem({ text: 'Login', path: 'login' });
    //this.isLoggedIn.next(false);
  }

  getLinks() {
    return this.links;
  }

  getLoginStatus() {
    return this.isLoggedIn;
  }

  updateLoginStatus(status: boolean) {
    this.isLoggedIn.next(status);

    if (!status) {
      this.clearAllItems();
     // this.addItem({ text: 'Login', path: 'login' });
    }
  }

  updateNavAfterAuth(role: string): void {
    //this.removeItem({ text: 'Login' });

    if (role === '1' || role === 'admin') {
      this.addItem({ text: 'Manage User', path: 'admin/users' });
      this.addItem({ text: 'Manage Question', path: 'admin/questions' });
    } else if (role === '2' || role === 'staff') {
      this.addItem({ text: 'Manage Invitation', path: 'admin/invitations' });
    }
  }

  addItem({ text, path }) {
    this.links.push({ text: text, path: path });
  }

  removeItem({ text }) {
    this.links.forEach((link, index) => {
      if (link.text === text) {
        this.links.splice(index, 1);
      }
    });
  }

  clearAllItems() {
    this.links.length = 0;
  }
}
