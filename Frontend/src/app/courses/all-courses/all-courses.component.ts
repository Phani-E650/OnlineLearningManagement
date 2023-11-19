import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Observable } from 'rxjs';
import { AllCourses } from 'src/app/models/allcourses';


import { MatDialog } from '@angular/material/dialog';
import { UpdateCourseComponent } from '../update-course/update-course.component';
import { CourseService } from '../course-service.service';
import { Course } from 'src/app/models/course';


@Component({
  selector: 'app-all-courses',
  templateUrl: './all-courses.component.html',
  styleUrls: ['./all-courses.component.css']
})
export class AllCoursesComponent {

  myenrollments : Observable<AllCourses[]> | undefined;
  loggedUser = '';
  currRole = '';
  courses : any;
  approvedcourses:any;
  unapprovedcourses:any;
  constructor( private _router : Router,private courseService : CourseService, private dialog : MatDialog) { }

  ngOnInit(): void 
  {
    this.loggedUser = JSON.stringify(sessionStorage.getItem('loggedUser')|| '{}');
    this.loggedUser = this.loggedUser.replace(/"/g, '');

    this.currRole = JSON.stringify(sessionStorage.getItem('ROLE')|| '{}'); 
    this.currRole = this.currRole.replace(/"/g, '');

    this.courseService.getCoursesByEmail(this.loggedUser).subscribe((data)=>
    {
      this.courses=data;
      // this.approvedcourses=this.courses.forEach((value)=>{ value.courseStatus});
      this.approvedcourses = this.courses.filter((course: Course) => course.courseStatus === 'active');
      this.unapprovedcourses = this.courses.filter((course: Course) => course.courseStatus === 'inactive');
    });
   

    const target = 'https://www.youtube.com/iframe_api'

  if (!this.isScriptLoaded(target)) {
    const tag = document.createElement('script')
    tag.src = target
    document.body.appendChild(tag)
  }
  }


  updateCourse(courseId : any): void {
    this.dialog.open(UpdateCourseComponent, {
      data: { courseId: courseId },
      width: '500px',
      height:'500px'
    });
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
