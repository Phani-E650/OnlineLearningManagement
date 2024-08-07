import { HttpClient } from '@angular/common/http';
import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent {
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private dialogRef:MatDialogRef<UserDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.email = data.useremail ;
  }
  email:any;
  cardData: any;
  isEditing: boolean = false; // Initially, editing is disabled
  newName: string = '';
  newDept: string = '';
  newPhone: string = '';
  newDOB: string = '';
  baseUrl = environment.apiURL;

  ngOnInit() {
    // this.route.params.subscribe((data1) => {
      // console.log(data1);
      // this.email = data1;

      this.http.get<any>(`${this.baseUrl}/table/getuserdetails/${this.email}`).subscribe((data) => {
        this.cardData = data;
      });
    // });
  }

  startEditing() {
    this.isEditing = true;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

 
  updateUser() {
    const updatedUserData = {
      name: this.newName,
      dept: this.newDept,
      phoneno: this.newPhone,
      dob: this.newDOB
      // Add other properties as needed
    };

    

    this.http.post(`${this.baseUrl}/table/updateuserdetails/${this.cardData.email}`, updatedUserData)
      .subscribe(
        (response) => {
          // Handle success response
          console.log(response);

          // Display a success message using Toastr
          this.toastr.success('User details updated successfully', 'Success');

          // Disable editing mode after successful update
          this.isEditing = false;

          // You can also update the cardData object with the updated values here
        },
        (error) => {
          // Handle error response
          console.error(error);

          // Display an error message using Toastr
          this.toastr.error('An error occurred while updating user details', 'Error');
        }
      );
  }
}
