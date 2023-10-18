import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent {

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  cardData: any;
  isEditing: boolean = false; // Initially, editing is disabled
  newName: string = '';
  newDept: string = '';
  newPhone: string = '';
  newDOB: string = '';

  ngOnInit() {
    this.route.params.subscribe((data1) => {
      const email = data1['id'];

      this.http.get<any>(`http://localhost:8080/table/getuserdetails/${email}`).subscribe((data) => {
        this.cardData = data;
      });
    });
  }

  startEditing() {
    this.isEditing = true;
  }

  updateUser() {
    const updatedUserData = {
      name: this.newName,
      dept: this.newDept,
      phoneno: this.newPhone,
      dob: this.newDOB
      // Add other properties as needed
    };

    this.http.post(`http://localhost:8080/table/updateuserdetails/${this.cardData.email}`, updatedUserData)
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
