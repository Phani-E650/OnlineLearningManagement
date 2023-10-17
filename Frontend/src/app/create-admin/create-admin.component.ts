import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-create-admin',
  templateUrl: './create-admin.component.html',
  styleUrls: ['./create-admin.component.css']
})
export class CreateAdminComponent {
  email: string = '';
  role: string = '';

  constructor(private http: HttpClient,private toastr: ToastrService,private router:Router) {}
  dropdownOptions = [
    { value: 'admin', label: 'Admin' },
    { value: 'student', label: 'Student' },
    { value: 'teacher', label: 'teacher' },
  ];

  submitAdminCreationForm(): void {
    // Send a POST request to your backend API to create the admin
    console.log(this.role);
    const adminData = { email: this.email, role: this.role };

    this.http.post('http://localhost:8080/api/admin/create-student', adminData).subscribe(
      (response: any) => {
        if (response.status === 201) {
          // Send an email to the admin with the registration link
          // this.sendRegistrationEmail(this.email);
          console.log('Registration email sent to successful');
          this.router.navigate(['/admin']); // Redirect to student page
          //this.toastr.success('User details updated successfully', 'Success');

          this.toastr.success('User Creation SuccessFul', '', {
            timeOut: 3000, // Adjust the duration as needed
            progressBar: false,
            closeButton: false,
            positionClass: 'toastr-success', // Apply the custom CSS class
            tapToDismiss: false, // Disable click to dismiss
          });
        } else {
          console.error('Admin creation failed.');
        }
      },
      (error: any) => {
        this.router.navigate(['/admin']); // Redirect to student page
          //this.toastr.success('User details updated successfully', 'Success');

          this.toastr.success('User Creation Failed', '', {
            timeOut: 3000, // Adjust the duration as needed
            progressBar: false,
            closeButton: false,
            positionClass: 'toastr-success', // Apply the custom CSS class
            tapToDismiss: false, // Disable click to dismiss
          });
        console.error('An error occurred while creating the admin:', error);
      }
    );
  }

  // sendRegistrationEmail(recipientEmail: string): void {
  //   // Send an HTTP request to your backend API to send the registration email
  //   this.http.post('/student/registration', { email: recipientEmail }).subscribe(
  //     (response: any) => {
  //       if (response.message === 'Email sent successfully') {
  //         console.log('Registration email sent to', recipientEmail);
  //       } else {
  //         console.error('Email sending failed.');
  //       }
  //     },
  //     (error: any) => {
  //       console.error('An error occurred while sending the email:', error);
  //     }
  //   );
  // }
}

