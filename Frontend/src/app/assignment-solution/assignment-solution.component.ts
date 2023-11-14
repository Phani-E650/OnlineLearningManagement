import { Component, OnInit } from '@angular/core';
import { MyServiceService } from '../my-service.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-assignment-solution',
  templateUrl: './assignment-solution.component.html',
  styleUrls: ['./assignment-solution.component.css']
})
export class AssignmentSolutionComponent implements OnInit {
  pdfUrls: SafeResourceUrl[] = [];
  fileNames: string[] = []; // Dynamically set from the API
  courseId: any | null = null;
  constructor(private assignmentService: MyServiceService, private sanitizer: DomSanitizer, private http: HttpClient,private route: ActivatedRoute) {}

  ngOnInit() {
    //const courseId = '20'; // Replace with the actual course ID
    this.route.params.subscribe(params => {
      this.courseId = params['coursename'];
    });
    const courseIdString = sessionStorage.getItem('course');
    this.courseId = courseIdString ? +courseIdString : null;
    // Fetch the file names from the API
    this.assignmentService.getFileNamesByCourseId(this.courseId).subscribe(
      (fileNames: string[]) => {
        // Set the file names
        this.fileNames = fileNames;
        // Load PDFs based on the file names
        this.loadPdfs();
      },
      (error) => {
        console.error('API error:', error);
      }
    );
  }

  loadPdfs() {
    // Iterate through the file names and load the corresponding PDFs
    this.fileNames.forEach((fileName) => {
      this.http
        .get(`http://localhost:8080/files/download-pdf?fileName=${fileName}`, { responseType: 'arraybuffer' })
        .subscribe(
          (response: ArrayBuffer) => {
            const blob = new Blob([response], { type: 'application/pdf' });
            const blobUrl = window.URL.createObjectURL(blob);
            const pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(blobUrl);
            console.log(pdfUrl)
            this.pdfUrls.push(pdfUrl);
          },
          (error) => {
            console.error('API error:', error);
          }
        );
    });
  }
  onFileSelected(event: any, index: number) {
    const files: FileList = event.target.files;
    
    if (files && files.length > 0) {
      const file: File = files[0];
      // You can perform additional checks on the file if needed
  
      // For now, store the file in a variable or process it as needed
      // You may want to use a form to handle multiple files and corresponding indices
    }
  }
  

  uploadAnswer(index: number) {
    //const file: File = 'hhh';/* Retrieve the file based on the index */
    const uploadUrl = 'http://localhost:8080/upload-answer'; // Replace with your actual upload endpoint

    const formData: FormData = new FormData();
    //formData.append('file', file, file.name);
    formData.append('assignmentIndex', index.toString()); // Pass the index to identify the assignment

    // Perform the file upload using HttpClient
    this.http.post(uploadUrl, formData).subscribe(
      response => {
        console.log(response); // Handle success response
      },
      error => {
        console.error(error); // Handle error response
      }
    );
  }
}
