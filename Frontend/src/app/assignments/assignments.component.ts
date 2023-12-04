import { Component } from '@angular/core';

import { Assignment } from '../models/assignment';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AssignmentService } from '../assignment.service';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent {

  assignment: Assignment = new Assignment();
  selectedFile: File | undefined;
  successMessage: string | null = null;
  courseId: any | null = null;

  constructor(private assignmentService: AssignmentService, private dialogRef: MatDialogRef<AssignmentsComponent>,private route: ActivatedRoute,private toastr:ToastrService) {}
  ngOnInit() {
    // Subscribe to route params to get courseId from the URL
    this.route.params.subscribe(params => {
      this.courseId = params['coursename'];
    });
    const courseIdString = sessionStorage.getItem('course');
    this.courseId = courseIdString ? +courseIdString : null;
  }
  Cancel(){
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('title', this.assignment.title);
      formData.append('description', this.assignment.description);
      formData.append('id',  this.courseId );
      formData.append('multipartfile', this.selectedFile);
      formData.append('marks', this.assignment.marks);
      formData.append('weightage', this.assignment.weightage);
      formData.append('deadlinedate', this.assignment.deadlinedate);
      this.dialogRef.close();
       // Ensure that 'multipartfile' matches the parameter name on the backend
       this.assignmentService.createAssignmentWithFileUpload(formData)
       .subscribe(
         (result: any) => {
           if (result.message == "success") {
            console.log(result.message)
             this.successMessage = 'Assignment created successfully';
             this.resetForm();
             console.log('Successful:', result);
             this.toastr.success(this.successMessage);
             location.reload();
           } 
           else {
             this.resetForm();
             this.successMessage = 'Assignment creation failed';
             console.log(result.status)
             console.log('Failed:', result);
             this.toastr.error(this.successMessage);
           }
         },
         (error) => {
          if(error.status===409){
            // this.toastr.error("weightage is above 100") ;
            if (error.error) {
              const errorBody = error.error;
              this.toastr.error(errorBody);
            } else {
              this.toastr.error('Conflict occurred.'); 
            }
          }
          else{
           this.resetForm();
           console.log(error.status)
           this.successMessage = 'Assignment creation failed';
           this.toastr.error(this.successMessage);
           console.error('Error:', error);
          }
         }
       );
     
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  resetForm() {
    this.assignment = new Assignment();
    this.selectedFile = undefined;
    this.dialogRef.close();
  }
}
