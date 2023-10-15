import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Observable } from 'rxjs';
import { AllCourses } from 'src/app/models/allcourses';
import { Course } from '../models/course';
import { MyServiceService } from '../my-service.service';


@Component({
  selector: 'app-all-courses',
  templateUrl: './all-courses.component.html',
  styleUrls: ['./all-courses.component.css']
})
export class AllCoursesComponent {

  myenrollments : Observable<AllCourses[]> | undefined;
  loggedUser = '';
  currRole = '';
  courses : Observable<Course[]> | undefined;
  constructor( private _router : Router,private courseService : MyServiceService) { }

  ngOnInit(): void 
  {
    this.loggedUser = JSON.stringify(sessionStorage.getItem('loggedUser')|| '{}');
    this.loggedUser = this.loggedUser.replace(/"/g, '');

    this.currRole = JSON.stringify(sessionStorage.getItem('ROLE')|| '{}'); 
    this.currRole = this.currRole.replace(/"/g, '');

    this.courses = this.courseService.getCoursesByEmail(this.loggedUser);

    const target = 'https://www.youtube.com/iframe_api'

  if (!this.isScriptLoaded(target)) {
    const tag = document.createElement('script')
    tag.src = target
    document.body.appendChild(tag)
  }
  }

  isScriptLoaded(target: string): boolean
  {
    return document.querySelector('script[src="' + target + '"]') ? true : false
  }

  visitCourse(coursename : string)
  {
    this._router.navigate(['/allcourses', coursename]);
  }

  owlDragging(e: any){
    console.log(e);
  }
  
   owlOptions: OwlOptions = {
     loop: true,
     mouseDrag: true,
     touchDrag: true,
     margin: 50,
     stagePadding: 20,
     pullDrag: true,
     dots: false,
     navSpeed: 1000,
     autoplay: true,
     navText: ['Previous', 'Next'],
     responsive: {
       0: {
         items: 1 
       },
       400: {
         items: 2
       },
       767: {
         items: 2
       },
       1024: {
         items: 3
       }
     },
     nav: true
   }

}
