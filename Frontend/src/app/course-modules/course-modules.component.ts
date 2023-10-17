import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Course } from '../models/course';
import { MyServiceService } from '../my-service.service';

@Component({
  selector: 'app-course-modules',
  templateUrl: './course-modules.component.html',
  styleUrls: ['./course-modules.component.css']
})
export class CourseModulesComponent {
  moduleNames: string[] = ['Home', 'News', 'Contact', 'About'];
  video = 'P2wNzig_SLA';
  courseName = 'springboot';
  // chapterlist : Observable<Chapter[]> | undefined;
  chapter : any | undefined;
  // chapter = new Chapter();
  loggedUser = '';
  currRole = '';
  coursedetails : Observable<Course> | undefined;

  constructor(private _router : Router, private activatedRoute: ActivatedRoute,private courseService : MyServiceService) { }

  ngOnInit(): void {
    this.loggedUser = JSON.stringify(sessionStorage.getItem('loggedUser')|| '{}');
    this.loggedUser = this.loggedUser.replace(/"/g, '');

    this.currRole = JSON.stringify(sessionStorage.getItem('ROLE')|| '{}'); 
    this.currRole = this.currRole.replace(/"/g, '');
    // const coursename = +this.activatedRoute.snapshot.paramMap.get('id');
    // this.activatedRoute.params.subscribe((data1) => {
    //   const coursename = data1['id'];

    //   this.courseService.getCoursesByEmailandcoursename(this.loggedUser,coursename).subscribe((data) => {
    //     this.coursedetails = data;
    //   });
    //   console.log(this.coursedetails);
    // });
  
    // this.course = this.courseService.getCourseById(courseId);

    $("#overview").show();
    $("#qa, #notes, #announcements, #questions, #notestxt, #downloads").hide();
    $("#downloadalert").css("display","none");
    this.courseName = this.activatedRoute.snapshot.params['coursename'];
    this.courseService.getCoursesByEmailandcoursename(this.loggedUser,this.courseName).subscribe((data) => {
      this.coursedetails = data;
      console.log(this.coursedetails);
    });
  

    const target = 'https://www.youtube.com/iframe_api'

    if (!this.isScriptLoaded(target)) {
      const tag = document.createElement('script')
      tag.src = target
      document.body.appendChild(tag)
    }
    this.chapter=
    

    { coursename   : 'maths',
    chapter1name  : 'chapter1',
    chapter1id : 'jpvZXcGkUMY',
    chapter2name : 'chapter2',
    chapter2id: "C2M48s_EE9I",
    chapter3name: 'chapter3',
    chapter3id: 'jpvZXcGkUMY',
    chapter4name: 'chapter4',
    chapter4id: 'jpvZXcGkUMY',
    chapter5name: 'chapter5',
    chapter5id: 'jpvZXcGkUMY',
    chapter6name: 'chapter6',
    chapter6id: 'jpvZXcGkUMY',
    chapter7name: 'chapter7',
    chapter7id: 'jpvZXcGkUMY',
    chapter8name: 'chapter8',
    chapter8id: 'jpvZXcGkUMY',
 }
//  {
//   coursename   : 'maths',
//   chapter1name  : 'chapter1',
//   chapter1id : 'jpvZXcGkUMY',
//   chapter2name : 'chapter2',
//   chapter2id: "jpvZXcGkUMY",
//   chapter3name: 'chapter3',
//   chapter3id: 'jpvZXcGkUMY',
//   chapter4name: 'chapter4',
//   chapter4id: 'jpvZXcGkUMY',
//   chapter5name: 'chapter5',
//   chapter5id: 'jpvZXcGkUMY',
//   chapter6name: 'chapter6',
//   chapter6id: 'jpvZXcGkUMY',
//   chapter7name: 'chapter7',
//   chapter7id: 'jpvZXcGkUMY',
//   chapter8name: 'chapter8',
//   chapter8id: 'jpvZXcGkUMY',
//  }
// ]
    // this.chapterlist = this._service.getChappterListByCourseName(this.courseName);
    // this.courselist = this._service.getCourseListByName(this.courseName);

  }

  openOverview()
  {
    $("#overview").show();
    $("#qa,#announcements,#notes,#downloads").hide();
    $("#downloadalert").css("display","none");
  }
  openQandA()
  {
    $("#qa").show();
    $("#overview,#announcements,#notes,#downloads").hide();
    $("#downloadalert").css("display","none");
  }
  openNotes()
  {
    $("#notes").show();
    $("#overview,#announcements,#qa,#downloads").hide();
    $("#downloadalert").css("display","none");
  }
  openAnnouncements()
  {
    $("#announcements").show();
    $("#overview,#qa,#notes,#downloads").hide();
    $("#downloadalert").css("display","none");
  }
  openDownloads()
  {
    $("#downloads").show();
    $("#overview,#qa,#notes,#announcements").hide();
    $("#downloadalert").css("display","block");
  }
  newQuestion()
  {
    $("#questions").toggle();
  }
  newNotes()
  {
    $("#notestxt").toggle();
  }

  set1()
  {
    $(".box1").css("background-color","green");
    $(".chapter1").addClass("selected");
    $(".box2,.box3,.box4,.box5,.box6,.box7,.box8").css("background-color","white");
    $(".chapter2,.chapter3,.chapter4,.chapter5,.chapter6,.chapter7,.chapter8").removeClass("selected");
  }
  set2()
  {
    $(".box2").css("background-color","green");
    $(".chapter2").addClass("selected");
    $(".box1,.box3,.box4,.box5,.box6,.box7,.box8").css("background-color","white");
    $(".chapter1,.chapter3,.chapter4,.chapter5,.chapter6,.chapter7,.chapter8").removeClass("selected");
  }
  set3()
  {
    $(".box3").css("background-color","green");
    $(".chapter3").addClass("selected");
    $(".box1,.box2,.box4,.box5,.box6,.box7,.box8").css("background-color","white");
    $(".chapter1,.chapter2,.chapter4,.chapter5,.chapter6,.chapter7,.chapter8").removeClass("selected");
  }
  set4()
  {
    $(".box4").css("background-color","green");
    $(".chapter4").addClass("selected");
    $(".box1,.box2,.box3,.box5,.box6,.box7,.box8").css("background-color","white");
    $(".chapter1,.chapter2,.chapter3,.chapter5,.chapter6,.chapter7,.chapter8").removeClass("selected");
  }
  set5()
  {
    $(".box5").css("background-color","green");
    $(".chapter5").addClass("selected");
    $(".box1,.box2,.box3,.box4,.box6,.box7,.box8").css("background-color","white");
    $(".chapter1,.chapter2,.chapter3,.chapter4,.chapter6,.chapter7,.chapter8").removeClass("selected");
  }
  set6()
  {
    $(".box6").css("background-color","green");
    $(".chapter6").addClass("selected");
    $(".box1,.box2,.box3,.box4,.box5,.box7,.box8").css("background-color","white");
    $(".chapter1,.chapter2,.chapter3,.chapter4,.chapter5,.chapter7,.chapter8").removeClass("selected");
  }
  set7()
  {
    $(".box7").css("background-color","green");
    $(".chapter7").addClass("selected");
    $(".box1,.box2,.box3,.box4,.box5,.box6,.box8").css("background-color","white");
    $(".chapter1,.chapter2,.chapter3,.chapter4,.chapter5,.chapter6,.chapter8").removeClass("selected");
  }
  set8()
  {
    $(".box8").css("background-color","green");
    $(".chapter8").addClass("selected");
    $(".box1,.box2,.box3,.box4,.box5,.box6,.box7").css("background-color","white");
    $(".chapter1,.chapter2,.chapter3,.chapter4,.chapter5,.chapter6,.chapter7").removeClass("selected");
  }

  openChapter(chapterid : string)
  {
    this.video = chapterid;
  }

  isScriptLoaded(target: string): boolean
  {
    return document.querySelector('script[src="' + target + '"]') ? true : false
  }

}
