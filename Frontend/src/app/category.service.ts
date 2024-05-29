import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from './models/course';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

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

  addcategory(category:any):Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/category/addcategory`,category);
}
updateCategory(id:any,name:any){
  return this.http.put((`${this.baseUrl}/category/updatecategory/${id}/${name}`),null);
}


addCourse(course : Course) : Observable<any>
{
  return this.http.post<any>(`${this.baseUrl}/addCourse`,course);
}


}
