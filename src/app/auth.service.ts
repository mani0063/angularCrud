// auth.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router) { }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('authToken');
    console.log('Token found:', token);
    return !!token;
  }

  checkAuthentication(): void {
    if (!this.isAuthenticated()) {
      console.log('Not authenticated, redirecting to login...');
      this.router.navigate(['/login']);
    } else {
      console.log('User is authenticated.');
    }
  }
}
