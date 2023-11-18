import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-assignmarks',
  templateUrl: './assignmarks.component.html',
  styleUrls: ['./assignmarks.component.css']
})
export class AssignmarksComponent implements ICellRendererAngularComp {
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
  onInputChange(): void {
    // Update the data in the row node when the input changes
    this.params.node.setDataValue('assignmarks', this.value);
  }
}
