import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from 'src/app/models/course';

import * as $ from 'jquery';
import { MyServiceService } from '../my-service.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-addcourse',
  templateUrl: './addcourse.component.html',
  styleUrls: ['./addcourse.component.css']
})
export class AddcourseComponent implements OnInit {

  course = new Course();
  msg = ' ';
  categories: any;

  constructor(private courseService : MyServiceService, private _router : Router, private http : HttpClient) { }

  ngOnInit(
    
  ): void 
  {
    this.http.get<string[]>('http://localhost:8080/category/leaf').subscribe((response) => {
      this.categories = response;
    });
    $("#websitelink, #youtubelink").css("display","none");
    $("#websitelink").hide();
    const p=sessionStorage.getItem('loggedUser');
    this.course.professorName=p;
    $("select").on('change', function() {
      $(this).find("option:selected").each(function() {
          var option = $(this).attr("value");
          if(option === "Website") {
            $("#websitelink").css("display","block");
            $("#youtubelink").css("display","none");
          } 
          else if(option === "Youtube")
          {
            $("#youtubelink").css("display","block");
            $("#websitelink").css("display","none");
          }
      });
    }).change();
  }

  addCourse()
  {
    this.courseService.addCourse(this.course).subscribe(
      data => {
        console.log("Course added Successfully !!!");
        this._router.navigate(['/addchapter']);
      },
      error => {
        console.log("Process Failed");
        console.log(error.error);
        this.msg = "Course with "+this.course.courseName+" already exists !!!";
      }
    )
  }

}
