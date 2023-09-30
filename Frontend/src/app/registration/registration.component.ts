// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-registration',
//   templateUrl: './registration.component.html',
//   styleUrls: ['./registration.component.css']
// })
// export class RegistrationComponent {

// }



import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  email: string = '';
  name: string = '';
  deptName: any;
  password:any;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    // Retrieve the email and token from the query parameters
    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
      
      // You can also retrieve and use the token if needed
    });
  }

  submitRegistrationForm(): void {
    const adminData = { email: this.email, name: this.name, deptName:this.deptName ,password:this.password};

    this.http.post('http://localhost:8080/api/student/registration', adminData).subscribe(
      (response: any) => {
        if (response.message === 'Student registration initiated successfully.') {
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
}
