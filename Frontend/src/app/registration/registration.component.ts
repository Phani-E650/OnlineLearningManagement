import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../category.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  // email: string = '';
  // name: string = '';
  // deptName: any;
  // password:any;
  myForm:FormGroup;
  presentemail='';
  baseUrl = environment.apiURL;
  departmentList : any | undefined;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient,private formBuilder: FormBuilder,private toastr: ToastrService,private myService:CategoryService) { 
    this.myForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      dept: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      phoneno: ['', [Validators.required, Validators.pattern(/^\d{3}-\d{3}-\d{4}$/)]],
      dob: [null, [Validators.required,this.dateNotInFutureValidator()]]
    });

    // this.myForm.get('dept')?.valueChanges.subscribe(deptValue => {
    //   // Do something with the selected department, e.g., log it
    //   this.myForm?.get('dept')?.setValue(this.myForm?.get('dept'));
    //   console.log('Selected department:', deptValue);
    // });
  }
  dateNotInFutureValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control.value) {
        const selectedDate = new Date(control.value);
        const currentDate = new Date();
  
        if (selectedDate > currentDate) {
          return { 'futureDate': true }; // Return an error object if the date is in the future
        }
      }
      return null; // Return null if the date is valid
    };
  }
  get email() {
    return this.myForm.get('email');
  }

  get password() {
    return this.myForm.get('password');
  }
  get name() {
    return this.myForm.get('name');
  }

  get dept() {
    return this.myForm.get('dept');
  }
  get phoneno() {
    return this.myForm.get('phoneno');
  }

  get dob() {
    return this.myForm.get('dob');
  }
  // set email(a:any){
  //   this.myForm[]);
  // }

  ngOnInit(): void {
    // Retrieve the email and token from the query parameters
    this.route.queryParams.subscribe(params => {
      //  this.myForm.value.email = params['email'];
      this.presentemail=params['email'];
       this.myForm?.get('email')?.setValue(params['email']);
       this.myForm.get('email')?.disable();
     
    });

this.myService.getAllCategoriesWithSubcategories().subscribe(data=>{
     this.departmentList=data;
     console.log(this.departmentList);
})
  }
  submitRegistrationForm(): void {
    if (this.myForm.valid) {
      const formData = this.myForm.value;
      const formData1 = {
        email: this.myForm.get('email')?.value,
        name: this.myForm.get('name')?.value,
        password: this.myForm.get('password')?.value,
        dept: this.myForm.get('dept')?.value,
        phoneno: this.myForm.get('phoneno')?.value,
        dob: this.myForm.get('dob')?.value
      };
  
      console.log(formData1);
  
      this.http.post(`${this.baseUrl}/api/student/registration`, formData1,{ responseType: 'text' }).subscribe(
        (response: any) => {
          if (response === 'Registration completed successfully.' ) {
            this.toastr.success("User Registration successful");
            // Send an email to the admin with the registration link
            // this.sendRegistrationEmail(this.email);
            this.router.navigate(['/login']);
            console.log('Registration successful');
          } else {
            console.error('Unexpected response status:', response.status);
            // Handle other status codes as needed
          }
        },
        (error: any) => {
          console.error('An error occurred while creating the user:', error);
          // Handle error cases
          if (error.status === 404) {
            // User not found
            this.toastr.error("User not found.");
          } else if (error.status === 500) {
            // Internal server error
            this.toastr.error("User Registered already Please Login");
            this.router.navigate(['/login']);
          } else {
            // Handle other status codes as needed
          }
        }
      );
    }
  }
  
}
