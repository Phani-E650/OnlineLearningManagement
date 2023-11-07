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
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MyServiceService } from '../my-service.service';

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
  departmentList : any | undefined;

  constructor(private myService: MyServiceService,private route: ActivatedRoute, private router: Router, private http: HttpClient,private formBuilder: FormBuilder) { 
    this.myForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      dept: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      phoneno: ['', [Validators.required, Validators.pattern(/^\d{3}-\d{3}-\d{4}$/)]],
      dob: [null, [Validators.required]]
    });

    // this.myForm.get('dept')?.valueChanges.subscribe(deptValue => {
    //   // Do something with the selected department, e.g., log it
    //   this.myForm?.get('dept')?.setValue(this.myForm?.get('dept'));
    //   console.log('Selected department:', deptValue);
    // });
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
    // const adminData = { email: this.email, name: this.name, deptName:this.deptName ,password:this.password};
    if (this.myForm.valid) {
      const formData = this.myForm.value;
      const formData1={email:this.myForm.get('email')?.value,name:this.myForm.get('name')?.value,
      password:this.myForm.get('password')?.value,dept:this.myForm.get('dept')?.value,
      phoneno:this.myForm.get('phoneno')?.value,dob:this.myForm.get('dob')?.value}
      console.log( formData1);
    
    this.http.post('http://localhost:8080/api/student/registration', formData1).subscribe(
      (response: any) => {
        if (response.message === 'Student registration initiated successfully.') {
          // Send an email to the admin with the registration link
          // this.sendRegistrationEmail(this.email);
          this.router.navigate(['/admin']);
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
}
