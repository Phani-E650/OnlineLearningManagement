import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../models/course';
import { ActivatedRoute, Router } from '@angular/router';
import { MyServiceService } from '../my-service.service';
import { Enrollment } from '../models/enroll';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent {
  users: string[] = ['ayyappa','mahesh','suresh'];
  loggedUser = '';
  currRole = '';
  coursedetails : Observable<Course> | undefined;
  enrollers : Enrollment[]=[];
  courseName = 'springboot';
  // enroll : Enrollment | undefined;
   enroll: Enrollment = new Enrollment();
   data: any[] = [];
   

  constructor(private _router : Router, private activatedRoute: ActivatedRoute,private courseService : MyServiceService) { }
  addUser() {
    let userName = prompt('Enter a new user name:');
    this.enroll.coursename=this.courseName;
    if(userName!==null){
         this.enroll.enrolledusername=userName;
    }
    this.enroll.instructorname=this.loggedUser;

    if (userName) {
      this.courseService.addenrollment(this.enroll).subscribe((data)=>
      {
        this.getusers();
        console.log(data);
      });
      // this.users = this.userService.getUsers();
    }
  }
  ngOnInit(): void {
    this.loggedUser = JSON.stringify(sessionStorage.getItem('loggedUser')|| '{}');
    this.loggedUser = this.loggedUser.replace(/"/g, '');

    this.currRole = JSON.stringify(sessionStorage.getItem('ROLE')|| '{}'); 
    this.currRole = this.currRole.replace(/"/g, '');
    this.courseName = this.activatedRoute.snapshot.params['coursename'];
    this.courseService.getCoursesByEmailandcoursename(this.loggedUser,this.courseName).subscribe((data) => {
      this.coursedetails = data;
      console.log(this.coursedetails);
    });
    this.getusers();
  }
  getusers(){
    this.courseService.getUsersByEmailandcoursename(this.loggedUser,this.courseName).subscribe((data) => {
      this.enrollers = data;
      console.log(this.coursedetails);
    });
  }


  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        this.data = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      };
      reader.readAsArrayBuffer(file);
    }
  }

  uploadData(): void {
    
    if (this.data) {

      
      this.data.forEach((row) => {
        const adminData = { email: row.email, role: row.role };
        this.enroll.coursename=this.courseName;
         this.enroll.enrolledusername=row.studentname;
        this.enroll.instructorname=this.loggedUser;
        
        
   this.courseService.addenrollment(this.enroll).subscribe(
    (response: any) => {
      this.getusers();
      if (response.message === 'Student registration initiated successfully.') {
       
        console.log('Registration email sent to successful');
      } else {
        console.error('Admin creation failed.');
      }
    },
    (error: any) => {
      console.error('An error occurred while creating the admin:', error);
    }
  );
        
      });
    }
  }

}
