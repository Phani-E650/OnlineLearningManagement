import { Component } from '@angular/core';

@Component({
  selector: 'app-course-content',
  templateUrl: './course-content.component.html',
  styleUrls: ['./course-content.component.css']
})
export class CourseContentComponent {
  
  content: any = {}; // Store form data here
  selectedFile: File | null = null;

  onSubmit() {
    // Handle form submission here
    console.log('Form data:', this.content);
    if (this.selectedFile) {
      console.log('Selected file:', this.selectedFile);
    }
    // Add code to send the data to the backend API
  }

  onFileSelected(event: any) {
    // Handle file selection
    this.selectedFile = event.target.files[0];
  }

}
