import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthGuardService } from '../auth-guard.service';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  myForm: FormGroup;
  showErrorMessage: boolean = false;
  errorMessage: string = '';
  showSuccessMessage:any

  constructor(
    private http: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthGuardService,
    private toastr: ToastrService,
    private notifyService: NotificationService
  ) {
    this.myForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  get email() {
    return this.myForm.get('email');
  }

  goToForgotPassword() {
    this.router.navigate(['/forgot-password']);
  }

  get password() {
    return this.myForm.get('password');
  }

  login() {
    const authUrl = 'http://localhost:8080/login';
  
    if (this.myForm.valid) {
      const formData = this.myForm.value;
  
      this.http.post(authUrl, formData).subscribe(
        (response: any) => {
          let role = response.role;
          let email = response.email;
          sessionStorage.setItem('loggedUser', email);
          sessionStorage.setItem('ROLE', role);
          sessionStorage.setItem('name', email);
          sessionStorage.setItem('gender', 'male');
          this.authService.setAuthenticated(true);
  
          if (role === 'admin') {
            this.notifyService.showSuccess('Login Successful', 'ItSolutionStuff.com');
            this.toastr.success('Login Successful', '');
            this.router.navigate(['/admin']);
          } else if (role === 'student') {
            this.toastr.success('Login Successful', '');
            this.router.navigate(['/student']);
          } else if (role === 'teacher') {
            this.toastr.success('Login Successful', '');
            this.router.navigate(['/teacherdashboard']);
          } else {
            this.showErrorMessage = true;
            this.toastr.error('Login Failed', '');
            this.errorMessage = 'Invalid role or login credentials.';
            console.error('Invalid role:', role);
          }
        },
        (error) => {
          this.showErrorMessage = true;
  
          if (error.status === 401 || error.status === 403) {
            // Unauthorized or Forbidden status code (authentication failure)
            this.router.navigate(['/login']);
            this.errorMessage = 'Invalid username or password.';
            this.toastr.error('Invalid username or password.', '');
          } else {
            this.errorMessage = 'An error occurred. Please try again later.';
          }
  
          console.error('Login failed:', error);
        }
      );
    }
  }
  
}
