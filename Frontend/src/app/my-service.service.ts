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
  getmaincategories(): Observable<any[]> {
    const url = `${this.baseUrl}/category/maincategories`;
    return this.http.get<any[]>(url);
  }
  getsubCategoriesofcategories(id:any): Observable<any[]> {
    const url = `${this.baseUrl}/category/categories/${id}`;
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
  updateCategory(id:any,name:any){
    return this.http.put((`${this.baseUrl}/category/updatecategory/${id}/${name}`),null);
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
  addenrollment(enroll:Enrollment,id:any){
     return this.http.post<any>(`${this.baseUrl}/addenrollment/${id}`,enroll);
  }
  deleteenrollment(id:any){
    return this.http.delete<any>(`${this.baseUrl}/deleteenroll/${id}`);
  }
  // getUsersByEmailandcoursename(loggedUser : string,cousename:string) : Observable<any>
  // {
  //   return this.http.get<any>(`${this.baseUrl}/getenrolledusers/${loggedUser}/${cousename}`);
  // }
  getUsersBycourseid(id:any) : Observable<any>
  {
    return this.http.get<any>(`${this.baseUrl}/getenrolledusers/${id}`);
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
 getmoduleById(id:any){
  return this.http.get<any>(`${this.baseUrl}/modules/getmodulesbyid/${id}`);
 }
 
//  getvideocontent(loggedUser : string,cousename:string,modulename:string) : Observable<any>
//  {
//   const params = new HttpParams()
//   .set('instructorName', loggedUser)
//   .set('courseName', cousename)
//   .set('moduleName',modulename);
//   return this.http.get<any>(`${this.baseUrl}/video-content/getcoursecontent`,{params:params});
//  }
 getvideocontentbyid(moduleid:any){
  return this.http.get<any>(`${this.baseUrl}/video-content/getcoursecontentbyid/${moduleid}`);
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
  return this.http.post(`${this.baseUrl}/files/upload`, formData);
}

// assignment.service.ts

getAllAssignments(fileName : string): Observable<Assignment[]> {
  return this.http.get<Assignment[]>(`${this.baseUrl}/files/download-pdf?fileName=${fileName}`);
}


getFileNamesByCourseId(courseId: string) {
  return this.http.get<string[]>(`${this.baseUrl}/files/find-assignment/${courseId}`);
}


changePassword(userId: string, currentPassword: string, newPassword: string): Observable<any> {
  console.log(userId)
  const url = `${this.baseUrl}/table/change-password/${userId}`;
  const body = { currentPassword: currentPassword, newPassword:newPassword };
  return this.http.put(url, body);
}


sendOtp(email: string): Observable<string> {
  const sendOtpUrl = `${this.baseUrl}/api/send-otp`;
  const payload = { email };

  return this.http.post<string>(sendOtpUrl, payload);
}

resetPassword(email: string, otp: string, newPassword: string): Observable<string> {
  const resetPasswordUrl = `${this.baseUrl}/api/reset-password`;
  const payload = { email, otp, newPassword };

  return this.http.post<string>(resetPasswordUrl, payload);
}
addassignsubmission(data: FormData) {

  return this.http.post(`${this.baseUrl}/assignmentsubmissions/upload-answer`, data);
}
getdownload(fileName: String):Observable<ArrayBuffer> {
  // return this.http.get<ArrayBuffer>(`${this.baseUrl}/files/download-pdf?fileName=${fileName}`);
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    // Add any other headers if needed
  });

  return this.http.get(`${this.baseUrl}/files/download-pdf?fileName=${fileName}`, {
    headers: headers,
    responseType: 'arraybuffer'
  });
}
getsubmissionsbyassignid(assignid:any){
  return this.http.get<any>(`${this.baseUrl}/assignmentsubmissions/getsubmissions/${assignid}`);
 }
assignmarks(summittedid:any,marks:any){
  return this.http.post(`${this.baseUrl}/assignmentsubmissions/markssubmission?submissionid=${summittedid}&marks=${marks}`,null);
}
}
