import { Component, OnInit } from '@angular/core';

import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AssignmentsComponent } from '../assignments/assignments.component';
import { AssignmentService } from '../assignment.service';
import { CourseAttachmentsComponent } from '../course-attachments/course-attachments.component';
import { CourseAttachmentService } from '../course-attachment.service';

@Component({
  selector: 'app-course-attachments-list',
  templateUrl: './course-attachments-list.component.html',
  styleUrls: ['./course-attachments-list.component.css']
})
export class CourseAttachmentsListComponent implements OnInit {
  pdfUrls: SafeResourceUrl[] = [];
  fileNames: any; // Dynamically set from the API
  courseId: any | null = null;
  constructor(private assignmentService: CourseAttachmentService, private sanitizer: DomSanitizer, private http: HttpClient,private route: ActivatedRoute,public dialog: MatDialog,private toastr:ToastrService) {}
  ngOnInit() {
    //const courseId = '20'; // Replace with the actual course ID
    this.route.params.subscribe(params => {
      this.courseId = params['coursename'];
    });
    const courseIdString = sessionStorage.getItem('course');
    this.courseId = courseIdString ? +courseIdString : null;
   
    this.assignmentService.getFileNamesByCourseId(this.courseId).subscribe(
      (fileNames) => {
        // Set the file names
        this.fileNames = fileNames;
        for (let obj of this.fileNames) {
          obj.deadlinedate=this.dateRenderer(obj.deadlinedate);
        }
        // Load PDFs based on the file names
        // this.loadPdfs();
      },
      (error) => {
        console.error('API error:', error);
      }
    );
  }

  
  openAssignments(): void {
    this.dialog.open(CourseAttachmentsComponent, {
      
      width: '400px',
      height:'400px'
    });
  }

  download(filename:string){
    this.assignmentService.getdownload(filename).subscribe((response:ArrayBuffer)=>
    {
      this.handleFileDownload(response,filename);
       console.log("successfullydownloaded")
    })
  }

  
 handleFileDownload(data: ArrayBuffer,filename:string) {
    const blob = new Blob([data], { type: 'application/octet-stream' });

    // Create a URL for the Blob
    const url = window.URL.createObjectURL(blob);

    // Create a link element and click on it to trigger the download
    const a = document.createElement('a');
    a.href = url;
    a.download = filename; // Set the desired filename
    document.body.appendChild(a);
    a.click();

    // Clean up: remove the link and revoke the URL
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }
  dateRenderer(params: any) {
    const epochTime = params;
    const date = new Date(epochTime);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are 0-based, so add 1
    const year = date.getFullYear();
  
    // Format the date as "dd/mm/yyyy"
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  }
}
