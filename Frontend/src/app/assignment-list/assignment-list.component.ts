import { Component, OnInit } from '@angular/core';
import { MyServiceService } from '../my-service.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-assignment-list',
  templateUrl: './assignment-list.component.html',
  styleUrls: ['./assignment-list.component.css']
})
export class AssignmentListComponent implements OnInit {
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
}
