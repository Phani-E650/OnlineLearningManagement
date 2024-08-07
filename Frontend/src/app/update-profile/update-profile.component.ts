import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { CategoryService } from '../category.service';
import { environment } from 'src/environments/environment';

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
    private toastr: ToastrService,
    private myService: CategoryService,
  ) {}
  datemsg:any;
  baseUrl = environment.apiURL;
  cardData: any;
  isEditing: boolean = false; // Initially, editing is disabled
  newName: string = '';
  newDept: string = '';
  newPhone: string = '';
  newDOB: string = '';
  departmentList : any | undefined;
  defaultSelectedDepartment:any;
  ngOnInit() {
    this.route.params.subscribe((data1) => {
      const email = data1['id'];

      this.http.get<any>(`${this.baseUrl}/table/getuserdetails/${email}`).subscribe((data) => {
        this.cardData = data;
        this.newName=this.cardData.name;
        this.newDept=this.cardData.dept;
        this.defaultSelectedDepartment= this.cardData.dept;
        this.newPhone= this.cardData.phoneno;
        this.newDOB= this.cardData.dob;
      });
    });
    this.myService.getAllCategoriesWithSubcategories().subscribe(data=>{
      this.departmentList=data;
      console.log(this.departmentList);
 })
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

    this.http.post(`${this.baseUrl}/table/updateuserdetails/${this.cardData.email}`, updatedUserData)
      .subscribe(
        (response) => {
          // Handle success response
          console.log(response);

          // Display a success message using Toastr
          this.toastr.success('User details updated successfully', 'Success');

          // Disable editing mode after successful update
          this.isEditing = false;
          this.ngOnInit();

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
  checkstartDateValidity(){
    const selectedDate = new Date(this.newDOB);
    const currentDate = new Date();
        if (selectedDate > currentDate) {
          this.datemsg = 'Date of birth cannot be in the future';
        } else {
          this.datemsg = ''; 
        }
  }
}