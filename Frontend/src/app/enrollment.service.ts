import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Course } from './models/course';
import { Enrollment } from './models/enroll';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {

 
  constructor(private router: Router,private http: HttpClient) { }

  private baseUrl = 'http://localhost:8080';



  addenrollment(enroll:Enrollment,id:any){
    return this.http.post<any>(`${this.baseUrl}/addenrollment/${id}`,enroll);
 }
 deleteenrollment(id:any){
   return this.http.delete<any>(`${this.baseUrl}/deleteenroll/${id}`);
 }


 
 getCourseDetailsbyid(id:any){
  return this.http.get<any>(`${this.baseUrl}/getcoursebyid/${id}`);
}



getUsersBycourseid(id:any) : Observable<any>
{
  return this.http.get<any>(`${this.baseUrl}/getenrolledusers/${id}`);
}
}
