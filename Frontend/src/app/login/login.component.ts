import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthGuardService } from '../auth-guard.service';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from '../notification.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // email: any;
  // password: any;
  myForm: FormGroup;

  // constructor(private http: HttpClient, private router: Router, private authService: AuthGuardService) {}
  // constructor(private http: HttpClient, private router: Router) {}
  constructor(private http: HttpClient, private router: Router,private formBuilder: FormBuilder, private authService: AuthGuardService, private toastr: ToastrService, private notifyService : NotificationService) {
    this.myForm = this.formBuilder.group({
      // name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      // phone: ['', [Validators.required, Validators.pattern(/^\d{3}-\d{3}-\d{4}$/)]]
    });
  }
  get email() {
    return this.myForm.get('email');
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
        let status = response.status;
        sessionStorage.setItem('loggedUser', email);
        sessionStorage.setItem('ROLE', role);
        sessionStorage.setItem('name', email);
        sessionStorage.setItem('gender', "male");
        this.authService.setAuthenticated(true);

    
        if (role === 'admin') {
          console.log("debug")
          this.notifyService.showSuccess("Data shown successfully !!", "ItSolutionStuff.com")
          this.toastr.success('Login SuccessFul', '', );
          this.router.navigate(['/admin']); // Redirect to admin page
        } else if (role === 'student') {
          console.log("debugin")
         
          this.toastr.success('Login SuccessFul', '', );

          this.router.navigate(['/admin']); // Redirect to student page
          //this.toastr.success('User details updated successfully', 'Success');

          


        } else {
          window.alert('Wrong username or password! Please try again!');
          console.error('Invalid role:', role);
        }
        if(response==null){
          window.alert('Wrong username or password! Please try again!');

        }
      },
      (error) => {
        window.alert('Wrong username or password! Please try again!');
        console.error('Login failed:', error);
      }
    );
    }
  }


  
}
