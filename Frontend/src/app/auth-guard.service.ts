import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  private isAuthenticated = false;

  constructor() {
   
    const storedAuthStatus = localStorage.getItem('isAuthenticated');
    this.isAuthenticated = storedAuthStatus ? JSON.parse(storedAuthStatus) : false;
  }

  // Call this method to set the user as authenticated
  setAuthenticated(value: boolean) {
    this.isAuthenticated = value;
    
    // Store the authentication status in local storage
    localStorage.setItem('isAuthenticated', JSON.stringify(value));
  }

  // Call this method to check if the user is authenticated
  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }
}
