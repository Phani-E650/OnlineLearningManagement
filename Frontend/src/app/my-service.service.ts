import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Course } from './models/course';
import { Enrollment } from './models/enroll';
import { Module } from './models/module';
import { VideoContent } from './models/videocontent';
import { Assignment } from './models/assignment';

@Injectable({
  providedIn: 'root'
})
export class MyServiceService {

  constructor(private router: Router,private http: HttpClient) { }

  private baseUrl = 'http://localhost:8080';


  addCourse(course : Course) : Observable<any>
  {
    return this.http.post<any>(`${this.baseUrl}/addCourse`,course);
  }
  getCourse() : Observable<any>
  {
    return this.http.get<any>(`${this.baseUrl}/getcourses`);
  }
  enablecourse(id:any):Observable<any>{
    return this.http.put((`${this.baseUrl}/enablecourse/${id}`),null);
  }

  getCoursesByEmail(loggedUser : string) : Observable<any>
  {
    return this.http.get<any>(`${this.baseUrl}/getcoursebyemail/`+loggedUser);
  }
  getstudentCoursesByEmail(loggedUser : string) : Observable<any>
  {
    return this.http.get<any>(`${this.baseUrl}/table/getstudentcourses/`+loggedUser);
  }
  getCoursesByEmailandcoursename(loggedUser : string,cousename:string) : Observable<any>
  {
    return this.http.get<any>(`${this.baseUrl}/getcoursebycousename/${loggedUser}/${cousename}`);
  }
  getCourseDetailsbyid(id:any){
    return this.http.get<any>(`${this.baseUrl}/getcoursebyid/${id}`);
  }
  // addenrollment(enroll:Enrollment){
  //    return this.http.post<any>(`${this.baseUrl}/addenrollment`,enroll);
  // }
  
  // getUsersByEmailandcoursename(loggedUser : string,cousename:string) : Observable<any>
  // {
  //   return this.http.get<any>(`${this.baseUrl}/getenrolledusers/${loggedUser}/${cousename}`);
  // }
  getUsersBycourseid(id:any) : Observable<any>
  {
    return this.http.get<any>(`${this.baseUrl}/getenrolledusers/${id}`);
  }
//  getvideocontent(loggedUser : string,cousename:string,modulename:string) : Observable<any>
//  {
//   const params = new HttpParams()
//   .set('instructorName', loggedUser)
//   .set('courseName', cousename)
//   .set('moduleName',modulename);
//   return this.http.get<any>(`${this.baseUrl}/video-content/getcoursecontent`,{params:params});
//  }
 


}