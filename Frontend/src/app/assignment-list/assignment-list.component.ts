// assignment-list.component.ts

import { Component, OnInit } from '@angular/core';
import { MyServiceService } from '../my-service.service';
import { Assignment } from '../models/assignment';
@Component({
  selector: 'app-assignment-list',
  templateUrl: './assignment-list.component.html',
  styleUrls: ['./assignment-list.component.css']
})
export class AssignmentListComponent implements OnInit {
  assignments: Assignment[] = [];

  constructor(private assignmentService: MyServiceService) {}

  ngOnInit() {
    this.assignmentService.getAllAssignments().subscribe((assignments) => {
      this.assignments = assignments;
  
      // Debugging: Log the pdfFilePath and pdfFileName for each assignment
      this.assignments.forEach(assignment => {
        console.log('PDF File Path:', assignment.pdfFilePath);
        console.log('PDF File Name:', assignment.pdfFileName);
      });
    });
  }

  downloadFile(pdfFilePath: string) {
    // Create a link element to trigger the download
    const link = document.createElement('a');
    link.href = pdfFilePath;
    link.target = '_blank';
    link.download = pdfFilePath.substring(pdfFilePath.lastIndexOf('/') + 1); // Extract the filename from the path
    link.click();
  }
  
}
