// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-username-link-renderer',
//   templateUrl: './username-link-renderer.component.html',
//   styleUrls: ['./username-link-renderer.component.css']
// })
// export class UsernameLinkRendererComponent {

// }
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-username-link-renderer',
  // <a [routerLink]="['/user-details', params.data.email]">{{ params.value }}</a>
  template: `
      <button (click)="onClick()">View Details</button>
  `,
})
export class UsernameLinkRendererComponent implements ICellRendererAngularComp {
  // router: any;
  refresh(params: ICellRendererParams<any, any, any>): boolean {
    throw new Error('Method not implemented.');
  }
  params: any;

  agInit(params: any): void {
    this.params = params;
  }
  constructor(private http: HttpClient,private router: Router) {}


  onClick(): void {
    // if (this.params.onClick) {
      console.log("hii");
      this.router.navigate(['user-details', this.params.data.email]);
     // this.params.onClick(this.params.data);
    // }
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
