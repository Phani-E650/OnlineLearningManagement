import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MyServiceService } from '../my-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthenticationService,private toastr: ToastrService,private router: Router) { }

  ngOnInit(): void {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      otp: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
    })!; // <- Adding the non-null assertion operator here
  }
  
  
   
  sendOtp() {
    const email = this.forgotPasswordForm.get('email')!.value;

    this.authService.sendOtp(email).subscribe(
      response => {
        console.log(response); // Handle success response
      },
      error => {
        console.error(error); // Handle error response
      }
    );
  }

  resetPassword() {
    const email = this.forgotPasswordForm?.get('email')?.value;
const otp = this.forgotPasswordForm?.get('otp')?.value;
const newPassword = this.forgotPasswordForm?.get('newPassword')?.value;
const confirmPassword = this.forgotPasswordForm?.get('confirmPassword')?.value;


    if (newPassword === confirmPassword) {
      this.authService.resetPassword(email, otp, newPassword).subscribe(
        response => {
          console.log(response); // Handle success response
          this.router.navigate(['/login'])
          this.toastr.success("password changed successfully");
        },
        error => {
          this.router.navigate(['/login'])
          this.toastr.success("password changed successfully");
          console.error(error); // Handle error response
        }
      );
    } else {
      this.toastr.error("Passwords do not match");
      console.error('Passwords do not match');
    }
  }

}


