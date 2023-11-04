import { Component } from '@angular/core';
import { MyServiceService } from '../my-service.service';
import { Assignment } from '../models/assignment';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent {

  assignment: Assignment = new Assignment();
  selectedFile: File | undefined;
  successMessage: string | null = null;

  constructor(private assignmentService: MyServiceService, private dialogRef: MatDialogRef<AssignmentsComponent>) {}

  onSubmit() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('title', this.assignment.title);
      formData.append('description', this.assignment.description);
      formData.append('id', '7'); // Replace '123' with the actual courseId
      formData.append('multipartfile', this.selectedFile); // Ensure that 'multipartfile' matches the parameter name on the backend
      
      this.assignmentService.createAssignmentWithFileUpload(formData)
        .subscribe((result: any) => {
          if (result && result.message === 'success') {
            this.successMessage = 'Assignment created successfully';
            this.resetForm();
          } else {
            this.resetForm();
            this.successMessage = 'Assignment creation failed';
          }
        });
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
