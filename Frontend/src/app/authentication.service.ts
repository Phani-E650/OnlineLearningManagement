import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  
  constructor(private router: Router,private http: HttpClient) { }

  private baseUrl = 'http://localhost:8080';


  
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

}
