import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LogoutService } from '../logout.service';
import { HttpClient } from '@angular/common/http';
import { ColDef } from 'ag-grid-community';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.min.js';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
})
export class AdminComponent {
    gridApi: any;
    constructor(private router: Router,private logoutService: LogoutService,private http: HttpClient) {}
    
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

    showCreateUserForm() {
        this.router.navigate(['/create']);
    }

    showCreateMultipleUsersForm() {
        this.router.navigate(['/upload-excel']);
    }
    sentmail(){
        console.log("hi");
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
}
