import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LogoutService } from '../logout.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-studentdashboard',
  templateUrl: './studentdashboard.component.html',
  styleUrls: ['./studentdashboard.component.css']
})
export class StudentdashboardComponent {
  constructor(private router: Router,private logoutService: LogoutService,private http: HttpClient) {}
  loggedUser = '';
currRole = '';
title = '';
logout() {
  this.logoutService.logout();
}
  ngOnInit(){
    // console.log("ggh")
    //  this.loadData();
    
    this.loggedUser = JSON.stringify(sessionStorage.getItem('loggedUser')|| '{}');
    this.loggedUser = this.loggedUser.replace(/"/g, '');

    this.currRole = JSON.stringify(sessionStorage.getItem('ROLE')|| '{}'); 
    this.currRole = this.currRole.replace(/"/g, '');

    if(this.currRole === "admin"){
      this.title = "Admin Dashboard";
    }
    else if(this.currRole === "teacher"){
      this.title = "Teacher Dashboard";
    }
    else if(this.currRole === "student"){
      this.title = "Student Dashboard";
    }
   
  }

}
