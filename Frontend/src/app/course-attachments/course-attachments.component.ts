import { Component } from '@angular/core';

import { Assignment } from '../models/assignment';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AssignmentService } from '../assignment.service';
import { CourseAttachments } from '../models/courseattachments';
import { CourseAttachmentService } from '../course-attachment.service';

@Component({
  selector: 'app-course-attachments',
  templateUrl: './course-attachments.component.html',
  styleUrls: ['./course-attachments.component.css']
})
export class CourseAttachmentsComponent {

  
  assignment: CourseAttachments = new CourseAttachments();
  selectedFile: File | undefined;
  successMessage: string | null = null;
  courseId: any | null = null;

  constructor(private assignmentService: CourseAttachmentService, private dialogRef: MatDialogRef<CourseAttachmentsComponent>,private route: ActivatedRoute,private toastr:ToastrService) {}
  ngOnInit() {
    // Subscribe to route params to get courseId from the URL
    this.route.params.subscribe(params => {
      this.courseId = params['coursename'];
    });
    const courseIdString = sessionStorage.getItem('course');
    this.courseId = courseIdString ? +courseIdString : null;
  }

  onSubmit() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('title', this.assignment.title);
      formData.append('description', this.assignment.description);
      formData.append('id',  this.courseId );
      formData.append('multipartfile', this.selectedFile);
     
      this.dialogRef.close();
       // Ensure that 'multipartfile' matches the parameter name on the backend
       this.assignmentService.createCourseAttachmentsWithFileUpload(formData)
       .subscribe(
         (result: any) => {
           if (result.message == "success") {
            console.log(result.message)
             this.successMessage = 'Course Attachment added successfully';
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
            this.toastr.error("weightage is above 100") ;
          }
          else{
           this.resetForm();
           console.log(error.status)
           this.successMessage = 'Course Attachment added failed';
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
    this.assignment = new CourseAttachments();
    this.selectedFile = undefined;
    this.dialogRef.close();
  }

}
