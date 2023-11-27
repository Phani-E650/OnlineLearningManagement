import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { MyServiceService } from '../my-service.service';
import { AssignmentService } from '../assignment.service';

@Component({
  selector: 'app-markssubmit',
  templateUrl: './markssubmit.component.html',
  styleUrls: ['./markssubmit.component.css']
})
export class MarkssubmitComponent implements ICellRendererAngularComp {
  constructor(private activatedRoute: ActivatedRoute,private myService: AssignmentService, private router: Router,private toastr: ToastrService,public dialog: MatDialog) { }

  refresh(params: ICellRendererParams<any, any, any>): boolean {
    throw new Error('Method not implemented.');
  }
  params:any;
  label:any;
  value:any;
  agInit(params: any) {
    this.params = params;
    this.label = params.label || '';
    // this.onClick = params.onClick || (() => {});
  }
  onKeyPress(event: any): void {
    // Add your logic here, if needed
  }
  submitMarks(): void {
    // Here, you can perform any action when the "Submit" button is clicked
    // For example, you might want to send the value to an API
    const rowData = this.params.node.data;
    const marksValue = rowData['assignmarks']; // Get the marks value from the row data
    console.log('Submitted marks:', marksValue);
    this.myService.assignmarks(rowData.submissionid,marksValue).subscribe((response)=>
    {
      console.log("successfully updated");
    })
    // Add your API call or any other logic here
  }
}