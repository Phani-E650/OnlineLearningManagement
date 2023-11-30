import { Component, NgModule, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from 'src/app/models/course';

import * as $ from 'jquery';

import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../category.service';
@Component({
  selector: 'app-addcourse',
  templateUrl: './addcourse.component.html',
  styleUrls: ['./addcourse.component.css']
})
export class AddcourseComponent implements OnInit {

  course = new Course();
  msg = ' ';
  subcategories: any;
  categories:any;
  startdatemsg:any;
  constructor(private courseService : CategoryService, private _router : Router, private http : HttpClient, private toastr: ToastrService) { }

  ngOnInit(): void 
  {
    // this.http.get<string[]>('http://localhost:8080/category/leaf').subscribe((response) => {
    //   this.subcategories = response;
    // });
    this.courseService.getmaincategories().subscribe((categories)=>{
      this.categories=categories;
    })
    const p=sessionStorage.getItem('loggedUser');
    this.course.professorName=p;
  }

  checkDateValidity() {
    const startDate = new Date(this.course.startDate);
    const endDate = new Date(this.course.endDate);

    if (endDate < startDate) {
      this.msg = 'End date should be greater than or equal to start date';
    } else {
      this.msg = ''; 
    }
  }
  checkstartDateValidity(){
    const selectedDate = new Date(this.course.startDate);
    const currentDate = new Date();
        if (selectedDate < currentDate) {
          this.startdatemsg = 'Start date should be greater than current date';
        } else {
          this.startdatemsg = ''; 
        }
  }

  addCourse()
  {
    this.courseService.addCourse(this.course).subscribe(
      data => {
        console.log("Course added Successfully !!!");
        this._router.navigate(['/teacherdashboard']);
        this.toastr.success("Course approve request sent to admin")
        this.course.department='';
      },
      error => {
        console.log("Process Failed");
        console.log(error.error);
        this.msg = "Course with "+this.course.courseName+" already exists !!!";
      }
    )
  }
  getsubcategories(event:any){
    const selectedOption = event;
    const selectedIndex = event.target.selectedIndex;
    const selectedOptionobject = event.target.options[selectedIndex];
    const selectedOptionValue = selectedOptionobject.value;
    // const department=this.categories.filter((cat:any)=>{cat.id===selectedOptionValue}).name;
    // console.log(selectedOptionValue);
    // console.log(department);
    let department;
    for (var char of this.categories) {
      // console.log(char.id); 
      if(char.id==selectedOptionValue){
        department=char.name;
      }
    }
    //  console.log(department);
    // this.course.department=department;
    // console.log(this.categories.filter((cat:any)=>{cat.id===selectedOptionValue})[0]);
    this.courseService.getsubCategoriesofcategories(selectedOptionValue).subscribe((categories)=>{
      this.subcategories=categories;
    })
  }

}
