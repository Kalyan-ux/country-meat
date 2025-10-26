// src/app/services/auth.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInState = new BehaviorSubject<boolean>(false);
  private userName = new BehaviorSubject<string>(''); 

  isLoggedIn$: Observable<boolean> = this.loggedInState.asObservable();
  userName$: Observable<string> = this.userName.asObservable();

  constructor() {
    // Restore user login info from localStorage if available
    const savedUser = localStorage.getItem('userName');
    if (savedUser) {
      this.loggedInState.next(true);
      this.userName.next(savedUser);
    }
  }

  // Called when login is successful
  loginUser(userName: string): void {
    this.loggedInState.next(true);
    this.userName.next(userName);
    localStorage.setItem('userName', userName);
  }

  // Called when user logs out
  logoutUser(): void {
    this.loggedInState.next(false);
    this.userName.next('');
    localStorage.removeItem('userName');
  }
}
