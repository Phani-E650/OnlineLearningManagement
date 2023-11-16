import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MyServiceService } from '../my-service.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ColDef } from 'ag-grid-community';

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
    },
    { headerName: 'Name', field: 'name', cellStyle: { textAlign: 'left' },filter:true, },
    { headerName: 'Department', field: 'dept', cellStyle: { textAlign: 'left' },filter:true, },
    { headerName: 'Status', field: 'status', cellStyle: { textAlign: 'left' },filter:true, },
    { headerName: 'Submittedfile', field: 'filename', cellStyle: { textAlign: 'left' },filter:true, },
    { headerName: 'SubmittedDate', field: 'submitteddate', cellStyle: { textAlign: 'left' },filter:true, },
    { headerName: 'Assignmarks', field: 'assignmarks', cellStyle: { textAlign: 'left' },filter:true, },
    { headerName: 'Totalmarks', field: 'totalmarks', cellStyle: { textAlign: 'left' },filter:true, },

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

  constructor(public dialog: MatDialog,private _router : Router, private activatedRoute: ActivatedRoute,private myService : MyServiceService,private toastr: ToastrService) { }
  ngOnInit() {
      this.assignmentid = this.activatedRoute.snapshot.params['assignid'];
      this.getsubmissions(this.assignmentid);
  }
  getsubmissions(assignmentid:any){
    this.myService.getsubmissionsbyassignid(assignmentid).subscribe((response)=>{
      this.submitdata=response;
    })
  }
  onGridReady(params: any) {
    this.gridApi = params.api;
  }


}
