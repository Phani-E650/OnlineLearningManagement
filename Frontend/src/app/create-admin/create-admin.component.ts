// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-create-admin',
//   templateUrl: './create-admin.component.html',
//   styleUrls: ['./create-admin.component.css']
// })
// export class CreateAdminComponent {

// }
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-admin',
  templateUrl: './create-admin.component.html',
  styleUrls: ['./create-admin.component.css']
})
export class CreateAdminComponent {
  email: string = '';
  role: string = '';

  constructor(private http: HttpClient) {}

  submitAdminCreationForm(): void {
    // Send a POST request to your backend API to create the admin
    const adminData = { email: this.email, role: this.role };

    this.http.post('http://localhost:8080/api/admin/create-student', adminData).subscribe(
      (response: any) => {
        if (response.status === 201) {
          // Send an email to the admin with the registration link
          // this.sendRegistrationEmail(this.email);
          console.log('Registration email sent to successful');
        } else {
          console.error('Admin creation failed.');
        }
      },
      (error: any) => {
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

