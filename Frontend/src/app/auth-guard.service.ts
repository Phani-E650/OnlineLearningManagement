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

  
  setAuthenticated(value: boolean) {
    this.isAuthenticated = value;
    

    localStorage.setItem('isAuthenticated', JSON.stringify(value));
  }

  
  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }
}
