import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { VideoContent } from './models/videocontent';
@Injectable({
  providedIn: 'root'
})
export class VideoService {

 
  constructor(private router: Router,private http: HttpClient) { }

  private baseUrl = 'http://localhost:8080';

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
  
  getCourseDetailsbyid(id:any){
    return this.http.get<any>(`${this.baseUrl}/getcoursebyid/${id}`);
  }
  

}
