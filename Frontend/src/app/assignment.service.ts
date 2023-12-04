import { Injectable } from '@angular/core';
import { Assignment } from './models/assignment';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AssignmentService {

 
  constructor(private router: Router,private http: HttpClient) { }

  private baseUrl = 'http://localhost:8080';

  
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
getstudentresult(courseId: string,user:string) {
  return this.http.get<string[]>(`${this.baseUrl}/assignmentsubmissions/find-results/${courseId}/${user}`);
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
deleteassignment(assignmentid:any){
  return this.http.delete<any>(`${this.baseUrl}/files/deleteassignment/${assignmentid}`);
}

}



