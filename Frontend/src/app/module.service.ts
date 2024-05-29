import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Course } from './models/course';
import { Enrollment } from './models/enroll';
import { Module } from './models/module';
@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  constructor(private router: Router,private http: HttpClient) { }

  private baseUrl = 'http://localhost:8080';


  
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
 getmoduleById(id:any){
  return this.http.get<any>(`${this.baseUrl}/modules/getmodulesbyid/${id}`);
 }
 
}
