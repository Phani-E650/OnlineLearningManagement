import { Component } from '@angular/core';
import { MyServiceService } from '../my-service.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-deadlinedatevalue',
  templateUrl: './deadlinedatevalue.component.html',
  styleUrls: ['./deadlinedatevalue.component.css']
})
export class DeadlinedatevalueComponent implements ICellRendererAngularComp{
  refresh(params: ICellRendererParams<any, any, any>): boolean {
    throw new Error('Method not implemented.');
  }
  constructor(private myService : MyServiceService, private _router : Router, private http : HttpClient) { }
  params:any;
  label:any;
  value:any;
  enddate:any;
  agInit(params: any) {
    this.params = params;
    this.label = params.label || '';
    console.log(this.params.data.submitteddate);
    // this.onClick = params.onClick || (() => {});
    if(this.params.data.status=="submitted"){
       this.enddate=this.dateRenderer(this.params.data.submitteddate)
    }
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
