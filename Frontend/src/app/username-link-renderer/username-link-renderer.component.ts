// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-username-link-renderer',
//   templateUrl: './username-link-renderer.component.html',
//   styleUrls: ['./username-link-renderer.component.css']
// })
// export class UsernameLinkRendererComponent {

// }
import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-username-link-renderer',
  template: `
    <a [routerLink]="['/user-details', params.data.email]">{{ params.value }}</a>
  `,
})
export class UsernameLinkRendererComponent implements ICellRendererAngularComp {
  refresh(params: ICellRendererParams<any, any, any>): boolean {
    throw new Error('Method not implemented.');
  }
  params: any;

  agInit(params: any): void {
    this.params = params;
  }
  // public params!: ICellRendererParams;
  // public color!: string;
  // agInit(params: ICellRendererParams): void {
  //   this.params = params;
  //   this.color = this.params.node.group ? 'coral' : 'lightgreen';
  // }

  // refresh(params: ICellRendererParams) {
  //   return false;
  // }
}
