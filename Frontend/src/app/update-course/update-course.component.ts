import { HttpClient } from '@angular/common/http';
import { Component , Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../models/course';

@Component({
  selector: 'app-update-course',
  templateUrl: './update-course.component.html',
  styleUrls: ['./update-course.component.css']
})
export class UpdateCourseComponent {
  courseId:any;
  course = new Course();
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any , private http: HttpClient,  private activatedRoute: ActivatedRoute,private dialogRef:MatDialogRef<UpdateCourseComponent>) {
    
    this.courseId = data.courseId;
    this.course.id = this.courseId;
  }
  ngOnInit(): void 
  {
    console.log(this.courseId)
    
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  
  submitForm() {
    console.log(this.course);
    
    this.http.put('http://localhost:8080/updatecourse', this.course).subscribe(
      (response) => {
        console.log('Announcement submitted:', response);
        
        // Reset the form
      },
      (error) => {
        console.error('Error submitting announcement:', error);
      }
    );
  }





}
