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
import { UserDetailsComponent } from '../user-details/user-details.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-username-link-renderer',
  templateUrl: './username-link-renderer.component.html',
  styleUrls: ['./username-link-renderer.component.css']
  // <a [routerLink]="['/user-details', params.data.email]">{{ params.value }}</a>
 
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
  constructor(private http: HttpClient,private router: Router,public dialog: MatDialog) {}


  onClick(): void {
    // if (this.params.onClick) {
      console.log("hii");
      this.router.navigate(['user-details', this.params.data.email]);
     // this.params.onClick(this.params.data);
    // }
  }


  
  openUserDetails(): void {
    this.dialog.open(UserDetailsComponent, {
      
      width: '400px',
      height:'300px'
    });
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
