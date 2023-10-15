import { Component } from '@angular/core';

@Component({
  selector: 'app-action-cell-renderer',
  // <button (click)="enableDisable()">{{params.data.status}}</button>
  template: `
    <div *ngIf="params.data.status==='Req Sent'">
              <p>Req Sent</p>
  <!-- Content to display when the condition is true -->
</div>
<div *ngIf="params.data.status==='active'">
   <button (click)="enableDisable()" class="btn btn-primary">inactive</button>
<!-- Content to display when the condition is true -->
</div>
<div *ngIf="params.data.status==='inactive'">
   <button (click)="enableDisable()" class="btn btn-primary">active</button>
<!-- Content to display when the condition is true -->
</div>


  `,
})
export class ActionCellRendererComponent {
  params: any;

  agInit(params: any): void {
    this.params = params;
  }

  enableDisable(): void {
    if (this.params.enableDisableCallback) {
      // console.log(this.params.data);
      
      this.params.enableDisableCallback(this.params.data);
      
    }
  }

  deleteRow(): void {
    if (this.params.deleteCallback) {
      this.params.deleteCallback(this.params.data);
    }
  }
}
