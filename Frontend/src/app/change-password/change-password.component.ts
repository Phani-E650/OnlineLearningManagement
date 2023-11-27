// change-password.component.ts

import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MyServiceService } from '../my-service.service';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  changePasswordForm: FormGroup;
  loggedUser : any;  

  constructor(private formBuilder: FormBuilder, private userService: AuthenticationService,@Inject(MAT_DIALOG_DATA) public data: any,private toastr: ToastrService) {
    this.changePasswordForm = this.formBuilder.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8)]]

    });
    this.loggedUser = data.userId;
    console.log(this.loggedUser)
    console.log(this.loggedUser)

    
  }

  


  // ngOnit() : void{
  //   const user = sessionStorage.getItem('loggedUser');
  //   this.loggedUser = user ? +user : null;
  // }
  

  onSubmit() {

    
    if (this.changePasswordForm.valid) {
      const userId = this.loggedUser; 
      const currentPassword = this.changePasswordForm.value.currentPassword;
      const newPassword = this.changePasswordForm.value.newPassword;

      console.log(this.loggedUser)
      this.userService.changePassword(this.loggedUser, currentPassword, newPassword)
        .subscribe(
          response => {
            
            console.log('Password changed successfully:', response);
            if(response.message=="Password changed successfully"){
              console.log('Password changed successfully:', response);
              this.toastr.success("Password change Successfully")
              }
              else{
                this.toastr.error("Please enter correct current password")
              }
          },
          error => {
            if(error.status==200){
              console.log('Password changed successfully:', error);
              this.toastr.success("Password change Successfully")
              }
              else{
                this.toastr.error("Please enter correct current password")
              }
            
          }
        );
    }
  }
}
