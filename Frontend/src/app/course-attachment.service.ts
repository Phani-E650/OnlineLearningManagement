import { Injectable } from '@angular/core';
import { Assignment } from './models/assignment';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseAttachmentService {

  

  constructor(private router: Router,private http: HttpClient) { }

  private baseUrl = 'http://localhost:8080';



createCourseAttachmentsWithFileUpload(formData: FormData): Observable<any> {
  return this.http.post(`${this.baseUrl}/courseattach/upload`, formData);
}


getFileNamesByCourseId(courseId: string) {
  return this.http.get<string[]>(`${this.baseUrl}/courseattach/get-courseattach/${courseId}`);
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



}
