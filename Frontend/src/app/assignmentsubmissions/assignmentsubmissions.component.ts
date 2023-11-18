import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MyServiceService } from '../my-service.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ColDef } from 'ag-grid-community';
import { AssignmarksComponent } from '../assignmarks/assignmarks.component';
import { MarkssubmitComponent } from '../markssubmit/markssubmit.component';
import { DeadlinedatevalueComponent } from '../deadlinedatevalue/deadlinedatevalue.component';
import { SubmissiondownloadComponent } from '../submissiondownload/submissiondownload.component';

@Component({
  selector: 'app-assignmentsubmissions',
  templateUrl: './assignmentsubmissions.component.html',
  styleUrls: ['./assignmentsubmissions.component.css']
})
export class AssignmentsubmissionsComponent {
  assignmentid:any;
  submissiondata:any;
  submitdata:any;
  public columnDefs: ColDef[]= [
    {
      headerName: 'Username',
      field: 'email',
      cellStyle: { textAlign: 'left' },
      filter:true,
      width:200
    },
    { headerName: 'Name', field: 'name', cellStyle: { textAlign: 'left' },filter:true,width:150 },
    { headerName: 'Department', field: 'dept', cellStyle: { textAlign: 'left' },filter:true,width:150 },
    { headerName: 'Status', field: 'status', cellStyle: { textAlign: 'left' },filter:true, },
    { headerName: 'Submittedfile', field: 'filename', cellStyle: { textAlign: 'left' },filter:true,cellRenderer: SubmissiondownloadComponent, },
    { headerName: 'SubmittedDate', field: 'submitteddate', cellStyle: { textAlign: 'left' },filter:true,cellRenderer: DeadlinedatevalueComponent, },
    { headerName: 'Assignmarks', field: 'assignmarks', cellStyle: { textAlign: 'left' },filter:true,
      cellRenderer: AssignmarksComponent,
      cellRendererParams: {
        // enableDisableCallback: this.enableDisableCallback.bind(this),
        label: 'marks',
      },
      width:100
   },
    { headerName: 'Totalmarks', field: 'totalmarks', cellStyle: { textAlign: 'left' },filter:true, width:100},
    { headerName: 'Action', field: 'assignmarks', cellStyle: { textAlign: 'left' },filter:true,
    cellRenderer: MarkssubmitComponent,
    cellRendererParams: {
      // enableDisableCallback: this.enableDisableCallback.bind(this),
      label: 'marks',
    },
 },

  //   { headerName: 'SubmittedDate', field: 'submitteddate' , cellStyle: { textAlign: 'left' },
  //   cellRenderer: ActionCellRendererComponent,
  //   cellRendererParams: {
  //     enableDisableCallback: this.enableDisableCallback.bind(this),
  //     label: 'Delete',
  //   },
  //  },
  //   {
  //     headerName: 'Action', cellStyle: { textAlign: 'left' },
  //     cellRenderer: UsernameLinkRendererComponent,
  //     cellRendererParams: {
  //       label: 'view',
  //     },
  //   }
  ];

  pageSize = 10;
  gridApi: any;
  courseId:any
  constructor(public dialog: MatDialog,private _router : Router, private activatedRoute: ActivatedRoute,private myService : MyServiceService,private toastr: ToastrService) { }
  ngOnInit() {
      this.assignmentid = this.activatedRoute.snapshot.params['assignid'];
      this.getsubmissions(this.assignmentid);
      const courseIdString = sessionStorage.getItem('course');
      this.courseId = courseIdString ? +courseIdString : null;
  }
  getsubmissions(assignmentid:any){
    this.myService.getsubmissionsbyassignid(assignmentid).subscribe((response)=>{
      this.submitdata=response;
      console.log(this.submitdata);
    })
  }
  onGridReady(params: any) {
    this.gridApi = params.api;
  }
  dateRenderer(params: any) {
    const epochTime = params.value;
    const date = new Date(epochTime);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are 0-based, so add 1
    const year = date.getFullYear();
  
    // Format the date as "dd/mm/yyyy"
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  }
  download(filename:string){
    this.myService.getdownload(filename).subscribe((response:ArrayBuffer)=>
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

}
