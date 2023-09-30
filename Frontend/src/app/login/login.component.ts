import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { AuthGuardService } from '../auth-guard.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: any;
  password: any;

  constructor(private http: HttpClient, private router: Router, private authService: AuthGuardService) {}

  login() {
    // Define the authentication URL
    const authUrl = 'http://localhost:8080/login';

    // Create an object to hold the user's credentials
    const credentials = {
      email: this.email,
      password: this.password,
    };

    // Make an HTTP POST request to authenticate the user
    this.http.post(authUrl, credentials, { responseType: 'text' }).subscribe(
      (response: any) => {
        const role = response;
        this.authService.setAuthenticated(true);

    // Redirect to the desired page (e.g., /admin or /student
        if (role === 'IT') {
          this.router.navigate(['/admin']); // Redirect to admin page
        } else if (role === 'student') {
          this.router.navigate(['/upload-excel']); // Redirect to student page
        } else {
          console.error('Invalid role:', role);
        }
      },
      (error) => {
        console.error('Login failed:', error);
      }
    );
  }


  
}
