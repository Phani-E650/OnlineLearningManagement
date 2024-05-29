import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Course } from '../models/course';


@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private router: Router,private http: HttpClient) { }

  private baseUrl = 'http://localhost:8080';

  
  getCoursesByEmail(loggedUser : string) : Observable<any>
  {
    return this.http.get<any>(`${this.baseUrl}/getcoursebyemail/`+loggedUser);
  }

  
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

}
