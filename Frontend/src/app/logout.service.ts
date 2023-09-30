

// logout.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(private router: Router) { }

  logout() {
    // Implement your logout logic here (e.g., clear session data, tokens, etc.)
    
    // Redirect to the login page after logout
    this.router.navigate(['/login']);
  }
}
