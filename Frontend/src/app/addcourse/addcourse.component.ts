import { Component, NgModule, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from 'src/app/models/course';

import * as $ from 'jquery';
import { MyServiceService } from '../my-service.service';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

// @NgModule({
//   declarations: [AddcourseComponent],
//   imports: [FormsModule, NgSelectModule], // Add FormsModule or ReactiveFormsModule and NgSelectModule here
// })
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
  constructor(private courseService : MyServiceService, private _router : Router, private http : HttpClient, private toastr: ToastrService) { }

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
    // $("#websitelink, #youtubelink").css("display","none");
    // $("#websitelink").hide();
    // $("select").on('change', function() {
    //   $(this).find("option:selected").each(function() {
    //       var option = $(this).attr("value");
    //       if(option === "Website") {
    //         $("#websitelink").css("display","block");
    //         $("#youtubelink").css("display","none");
    //       } 
    //       else if(option === "Youtube")
    //       {
    //         $("#youtubelink").css("display","block");
    //         $("#websitelink").css("display","none");
    //       }
    //   });
    // }).change();
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
