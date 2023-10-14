import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LogoutService } from '../logout.service';
import { HttpClient } from '@angular/common/http';
import { ColDef } from 'ag-grid-community';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.min.js';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from '../notification.service';
@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
})
export class AdminComponent {
    gridApi: any;
  rowDataUsers: string="";
    constructor(private router: Router,private logoutService: LogoutService,private http: HttpClient,private toastr:ToastrService,private notifyService : NotificationService) {}
    loggedUser = '';
  currRole = '';
  title = '';
  //UsersTable
    
     public columncouseDefs: ColDef[] = [
        { headerName: 'ID', field: 'id', cellStyle: { textAlign: 'left' } },
        { headerName: 'Course Name', field: 'coursename', cellStyle: { textAlign: 'left' } },
        { headerName: 'Course Category', field: 'coursecategory', cellStyle: { textAlign: 'left' } },
        { headerName: 'Degree', field: 'degree' , cellStyle: { textAlign: 'left' }},
        { headerName: 'Semester', field: 'semester', cellStyle: { textAlign: 'left' } },
        { headerName: 'Status', field: 'status', cellStyle: { textAlign: 'left' } }
      ];
    
      rowDatacourse = [
        { id: 1, coursename: 'Course 1', coursecategory: 'Category A', degree: 'BSc', semester: 2, status: 'Active' },
        { id: 2, coursename: 'Course 2', coursecategory: 'Category B', degree: 'MBA', semester: 1, status: 'Inactive' },
        // Add more data as needed
      ];
      onGridReady(params: any) {
        this.gridApi = params.api;
        params.api.autoSizeAllColumns();
      }
      // loadData() {
      //   this.http.get<any[]>('http://localhost:8080/table/getdata').subscribe((data) => {
      //     this.rowDataUsers = data;
      //   });
      //   console.log("hiiihihih");
      // }
      
    

    showCreateUserForm() {
        this.router.navigate(['/create']);
    }

    showCreateMultipleUsersForm() {
        this.router.navigate(['/upload-excel']);
    }
    sentmail(){
        console.log("hi");
        this.toastr.success('User Creation SuccessFul', '', {
          timeOut: 3000, // Adjust the duration as needed
          progressBar: false,
          closeButton: false,
          positionClass: 'toastr-success', // Apply the custom CSS class
          tapToDismiss: false, // Disable click to dismiss
        });
        this.http.post('http://localhost:8080/api/admin/sentmail',null).subscribe(
            (response: any) => {
                console.log("hiiiiii");
                if (response.message === 'Mails sent successfully.') {
                    console.log('Registration email sent to successful');
                    
                  } else {
                    console.error('Admin creation failed.');
                  }
            },
            (error: any) => {
                console.error('An error occurred while creating the admin:', error);
              })
    }

    logout() {
        this.logoutService.logout();
      }
    UsesTable(){
      this.rowDataUsers="user";
      }
      studentTable(){
        this.rowDataUsers="student";
      }
      teacherTable(){
        this.rowDataUsers="teacher";
      }
  ngOnInit(){
        // console.log("ggh")
        //  this.loadData();
        //this.notifyService.showSuccess("Data shown successfully !!", "ItSolutionStuff.com")
        this.loggedUser = JSON.stringify(sessionStorage.getItem('loggedUser')|| '{}');
        this.loggedUser = this.loggedUser.replace(/"/g, '');
    
        this.currRole = JSON.stringify(sessionStorage.getItem('ROLE')|| '{}'); 
        this.currRole = this.currRole.replace(/"/g, '');
    
        if(this.currRole === "admin"){
          this.title = "Admin Dashboard";
        }
        else if(this.currRole === "professor"){
          this.title = "";
        }
        else if(this.currRole === "user"){
          this.title = "";
        }
       
      }
}
