import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LogoutService } from '../logout.service';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
})
export class AdminComponent {
    constructor(private router: Router,private logoutService: LogoutService,private http: HttpClient) {}

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
