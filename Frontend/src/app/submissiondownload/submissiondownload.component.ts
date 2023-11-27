import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { AssignmentService } from '../assignment.service';

@Component({
  selector: 'app-submissiondownload',
  templateUrl: './submissiondownload.component.html',
  styleUrls: ['./submissiondownload.component.css']
})
export class SubmissiondownloadComponent implements ICellRendererAngularComp  {
  refresh(params: ICellRendererParams<any, any, any>): boolean {
    throw new Error('Method not implemented.');
  }
  constructor(private myService : AssignmentService, private _router : Router, private http : HttpClient) { }
  params:any;
  label:any;
  value:any;
  agInit(params: any) {
    this.params = params;
    console.log(this.params.data.filename);
    this.label = params.label || '';
    // this.onClick = params.onClick || (() => {});
  }
  download(filename:string){
    console.log(filename)
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
