import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: any;
  password: any;

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    // Define the authentication URL
    const authUrl = 'http://localhost:8080/login';

    // Create an object to hold the user's credentials
    const credentials = {
      email: this.email,
      password: this.password,
    };

    // Make an HTTP POST request to authenticate the user
    this.http.post<any>(authUrl, credentials).subscribe(
      (response) => {
        const role = response.message;
        if (role === 'IT') {
          this.router.navigate(['/upload-excel']); // Redirect to admin page
        } else if (role === 'student') {
          this.router.navigate(['/upload-excel']); // Redirect to student page
        }
      },
      (error) => {
        console.error('Login failed:', error);
      }
    );
  }
}
