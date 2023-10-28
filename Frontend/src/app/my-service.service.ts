import { HttpClient, HttpParams } from '@angular/common/http';
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
  addCategory(category: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/category`, category);
  }

  addSubcategory(parentCategoryId: any, subcategory: any): Observable<any> {
    const url = `${this.baseUrl}/category/${parentCategoryId}/subcategories`;
    return this.http.post<any>(url, subcategory);
    
  }
  getAllCategoriesWithSubcategories(): Observable<any[]> {
    const url = `${this.baseUrl}/category/getcategories`;
    return this.http.get<any[]>(url);
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
  addcategory(category:any):Observable<any>{
      return this.http.post<any>(`${this.baseUrl}/category/addcategory`,category);
  }

  getCoursesByEmail(loggedUser : string) : Observable<any>
  {
    return this.http.get<any>(`${this.baseUrl}/getcoursebyemail/`+loggedUser);
  }
  getCoursesByEmailandcoursename(loggedUser : string,cousename:string) : Observable<any>
  {
    return this.http.get<any>(`${this.baseUrl}/getcoursebycousename/${loggedUser}/${cousename}`);
  }
  addenrollment(enroll:Enrollment){
     return this.http.post<any>(`${this.baseUrl}/addenrollment`,enroll);
  }
  deleteenrollment(id:any){
    return this.http.delete<any>(`${this.baseUrl}/deleteenroll/${id}`);
  }
  getUsersByEmailandcoursename(loggedUser : string,cousename:string) : Observable<any>
  {
    return this.http.get<any>(`${this.baseUrl}/getenrolledusers/${loggedUser}/${cousename}`);
  }
  addmodule(module:Module){
    return this.http.post<any>(`${this.baseUrl}/modules/add`,module);
 }
 deletemodule(id:any){
  return this.http.delete<any>(`${this.baseUrl}/modules/${id}`);
}
updatemodule(id:any,module:any){
  return this.http.put<any>(`${this.baseUrl}/modules/${id}/${module}`,null);
}
 getmoduleByEmailandcoursename(loggedUser : string,cousename:string) : Observable<any>
 {
   return this.http.get<any>(`${this.baseUrl}/modules/getmodules/${loggedUser}/${cousename}`);
 }
 
 getvideocontent(loggedUser : string,cousename:string,modulename:string) : Observable<any>
 {
  const params = new HttpParams()
  .set('instructorName', loggedUser)
  .set('courseName', cousename)
  .set('moduleName',modulename);
  return this.http.get<any>(`${this.baseUrl}/video-content/getcoursecontent`,{params:params});
 }
 addvideo(video:VideoContent){
  return this.http.post<any>(`${this.baseUrl}/video-content/add`,video);
}
deletevideo(id:any){
  return this.http.delete<any>(`${this.baseUrl}/video-content/delete/${id}`);
}
updatevideo(id:any,video:VideoContent){
  return this.http.put<any>(`${this.baseUrl}/video-content/update/${id}`,video);
}

createAssignmentWithFileUpload(formData: FormData): Observable<any> {
  return this.http.post(`${this.baseUrl}/assignments/upload`, formData);
}

// assignment.service.ts

getAllAssignments(): Observable<Assignment[]> {
  return this.http.get<Assignment[]>(`${this.baseUrl}/assignments/assignments`);
}

  
}
