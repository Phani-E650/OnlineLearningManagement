import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import * as XLSX from 'xlsx';
import { AdduserComponent } from '../adduser/adduser.component';
import { ToastrService } from 'ngx-toastr';
import { AssignmentService } from '../assignment.service';

@Component({
  selector: 'app-assignmentfilesubmission',
  templateUrl: './assignmentfilesubmission.component.html',
  styleUrls: ['./assignmentfilesubmission.component.css']
})
export class AssignmentfilesubmissionComponent {
  email: any;
  role: any;
  index: any;
  selectedFile: File | null = null;
  loggedUser="";
  constructor( @Inject(MAT_DIALOG_DATA) public data: any,
  private assignmentService: AssignmentService,private AssignmentfilesubmissionComponent: MatDialogRef<AssignmentfilesubmissionComponent>,private http: HttpClient, public dialog: MatDialog, private toastr:ToastrService) {
    this.index = data.assignmentid ;
  }
  ngOnInit(){
  this.loggedUser = JSON.stringify(sessionStorage.getItem('loggedUser')|| '{}');
  this.loggedUser = this.loggedUser.replace(/"/g, '');
  }
Cancel(){
  this.AssignmentfilesubmissionComponent.close();
}
onFileSelected(event: any) {
  const files: FileList = event.target.files;
  
  if (files && files.length > 0) {
    const file: File = files[0];
    this.selectedFile=file;
    // You can perform additional checks on the file if needed

    // For now, store the file in a variable or process it as needed
    // You may want to use a form to handle multiple files and corresponding indices
  }
  console.log('fileupload');
}


uploadAnswer() {
  //const file: File = 'hhh';/* Retrieve the file based on the index */
  // const uploadUrl = 'http://localhost:8080/upload-answer'; // Replace with your actual upload endpoint
  this.AssignmentfilesubmissionComponent.close();
  const formData: FormData = new FormData();
  console.log('filesubmitted');
  //formData.append('file', file, file.name);
  if(this.selectedFile){
  formData.append('assignmentIndex', this.index); // Pass the index to identify the assignment
  formData.append('usermail', this.loggedUser);
  formData.append("answer",this.selectedFile);
  console.log('filesubmitted');
  }
  // Perform the file upload using HttpClient
  console.log('filesubmitted');
  this.assignmentService.addassignsubmission(formData).subscribe(
    (response) => {
      console.log(response); // Handle success response
    },
    error => {
      console.error(error); // Handle error response
    }
  );
}
}
