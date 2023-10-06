// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-table',
//   templateUrl: './table.component.html',
//   styleUrls: ['./table.component.css']
// })
// export class TableComponent {

// }


import { Component, NgModule } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ColDef, IGroupCellRendererParams } from 'ag-grid-community';
// import { ActionCellRendererComponent } from '../action-cell-renderer/action-cell-renderer.component';
 import { UsernameLinkRendererComponent } from '../username-link-renderer/username-link-renderer.component';
import { AgGridAngular } from 'ag-grid-angular';
// @import '~ag-grid-community/styles/ag-grid.scss';
// @import '~ag-grid-community/styles/ag-theme-alpine.scss';
import { ButtonRendererComponent } from '../button-renderer/button-renderer.component';
import { ActionCellRendererComponent } from '../action-cell-renderer/action-cell-renderer.component';



@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
  // template: `
  //   <ag-grid-angular
  //     style="width: 100%; height: 500px;"
  //     class="ag-theme-alpine"
  //     [rowData]="rowData"
  //     [columnDefs]="columnDefs"
  //     [pagination]="true"
  //     [paginationPageSize]="pageSize"
  //     (gridReady)="onGridReady($event)"
  //   >
  //   </ag-grid-angular>
  // `
})
export class TableComponent {
  public columnDefs: ColDef[]= [
    {
      headerName: 'Username',
      field: 'email',
      // cellRenderer: UsernameLinkRendererComponent,
      // cellRendererParams: {
      //   innerRenderer: (params: { value: any; }) => {
      //     return `<a href="${params.value}">${params.value}</a>`;
      //   }
      // }

      // cellRenderer: 'UsernameLinkRendererComponent',
      // cellRendererParams: {
      //   innerRenderer: 'UsernameLinkRenderer',
      //   suppressCount: true,
      // }as IGroupCellRendererParams,
    },
    { headerName: 'Role', field: 'role' },
    // { headerName: 'Dept', field: 'dept', filter: true },
    // { headerName: 'Status', field: 'status1' },
    { headerName: 'Status', field: 'status' ,
    cellRenderer: ActionCellRendererComponent,
    cellRendererParams: {
      enableDisableCallback: this.enableDisableCallback.bind(this),
      label: 'Delete',
    },
   },
    {
      headerName: 'Action',
      cellRenderer: UsernameLinkRendererComponent,
      cellRendererParams: {
        label: 'view',
      },
    }
  //   {
  //     headerName: 'Action',
  //     cellRenderer: ButtonRendererComponent,
  //     cellRendererParams: {
  //       onClick: this.deleteRow.bind(this),
  //       label: 'Delete',
  //     },
    //   cellRendererFramework  : ButtonRendererComponent, // Use your custom cell renderer component here
    //   cellRendererParams: {
    //    onClick: this.deleteRow.bind(this), // Add any custom parameters or event handlers here
    //  },
      // cellRenderer: 'UsernameLinkRendererComponent',
      // cellRendererParams: {
      //   enableDisableCallback: this.enableDisable.bind(this),
      //   deleteCallback: this.deleteRow.bind(this),
      // },
    // },
  ];

  pageSize = 10;
  gridApi: any;
  // rowData: any[];
  // rowData1
 
  rowData1 = [
    {
      id: 1,
      username: 'User1',
      role: 'Admin',
      dept: 'IT',
      status: 'Active',
      disable :'disable'
    },
    {
      id: 2,
      username: 'User2',
      role: 'User',
      dept: 'HR',
      status: 'Inactive',
      disable :'disable'
    },
    {
      id: 3,
      username: 'User3',
      role: 'User',
      dept: 'Finance',
      status: 'Active',
      disable :'disable'
    },
    {
      id: 2,
      username: 'User2',
      role: 'User',
      dept: 'HR',
      status: 'Inactive',
      disable :'enable'
    },
    {
      id: 3,
      username: 'User3',
      role: 'User',
      dept: 'Finance',
      status: 'Active',
      disable :'enable'
    },
    {
      id: 2,
      username: 'User2',
      role: 'User',
      dept: 'HR',
      status: 'Inactive',
      disable :'enable'
    },
    {
      id: 3,
      username: 'User3',
      role: 'User',
      dept: 'Finance',
      status: 'Active',
      disable :'enable'
    },
    {
      id: 2,
      username: 'User2',
      role: 'User',
      dept: 'HR',
      status: 'Inactive',
      disable :'enable'
    },
    {
      id: 3,
      username: 'User3',
      role: 'User',
      dept: 'Finance',
      status: 'Active',
      disable :'enable'
    },
    {
      id: 2,
      username: 'User2',
      role: 'User',
      dept: 'HR',
      status: 'Inactive',
      disable :'enable'
    },
    {
      id: 3,
      username: 'User3',
      role: 'User',
      dept: 'Finance',
      status: 'Active',
      disable :'enable'
    },
    {
      id: 2,
      username: 'User2',
      role: 'User',
      dept: 'HR',
      status: 'Inactive',
      disable :'enable'
    },
    {
      id: 3,
      username: 'User3',
      role: 'User',
      dept: 'Finance',
      status: 'Active',
      disable :'enable'
    },
    // Add more rows as needed
  ];
  

  constructor(private http: HttpClient) {}

  rowData!: any[];
  ngOninit(){
    this.loadData();
  }
  onGridReady(params: any) {
    this.gridApi = params.api;
    this.loadData();
  }

  loadData() {
    
    this.http.get<any[]>('http://localhost:8080/table/getdata').subscribe((data) => {
      this.rowData = data;
    });
  }

  enableDisableCallback(data: any) {
    
    const id=data.id;
    const url=`http://localhost:8080/table/update/${id}`;
    this.http.put(url,null).subscribe((response)=>{
      console.log('Update:',response);
      this.loadData();
    },
    (error: HttpErrorResponse) => {
      
      if (error.status === 200) {
        console.log('UPDATE request was successful with status 200');
        this.loadData();
      } else {
        console.error('UPDATE request failed with status code:', error.status);
      }

     
      const errorData = error.error;

      
    }
      )

  
    console.log('Enable/Disable:', data);
  }

  // deleteRow(data: any) {
  //   // Implement row deletion logic based on data
  //   const id=data.id;
  //   const url=`http://localhost:8080/table/delete/${id}`;
  //   this.http.delete(url).subscribe((response)=>{
  //     console.log('Delete:',response);},
  //   (error: HttpErrorResponse) => {
  //     // Handle errors here
  //     if (error.status === 200) {
  //       console.log('DELETE request was successful with status 200');
  //       this.loadData();
  //     } else {
  //       console.error('DELETE request failed with status code:', error.status);
  //     }

  //     // You can access error.error to get the error response data if needed
  //     const errorData = error.error;

  //     // Handle errors as needed
  //   }
  //     )
  
  //   console.log('Delete:', data);
  // }
}

// import { Component } from '@angular/core';
// import { ColDef, GridOptions } from 'ag-grid-community';

// @Component({
//   selector: 'app-table',
//   templateUrl: './table.component.html',
//   styleUrls: ['./table.component.css']
// })
// export class TableComponent {
//   public gridOptions: GridOptions;
//   columnDefs: ColDef[] = [
//     {
//       headerName: 'Username',
//       field: 'username',
//       cellRenderer: 'agGroupCellRenderer',
//       cellRendererParams: {
//         innerRenderer: 'usernameLinkRenderer',
//         suppressCount: true,
//       },
//     },
//     { headerName: 'Role', field: 'role' },
//     { headerName: 'Dept', field: 'dept' },
//     { headerName: 'Status', field: 'status' },
//     {
//       headerName: 'Action',
//       cellRenderer: 'actionCellRenderer',
//       cellRendererParams: {
//         enableDisableCallback: this.enableDisable.bind(this),
//         deleteCallback: this.deleteRow.bind(this),
//       },
//     },
//   ];

//   pageSize = 10;

//   rowData: any[] = [
//     {
//       id: 1,
//       username: 'User1',
//       role: 'Admin',
//       dept: 'IT',
//       status: 'Active'
//     },
//     {
//       id: 2,
//       username: 'User2',
//       role: 'User',
//       dept: 'HR',
//       status: 'Inactive'
//     },
//     {
//       id: 3,
//       username: 'User3',
//       role: 'User',
//       dept: 'Finance',
//       status: 'Active'
//     },
//     // Add more rows as needed
//   ];

//   constructor() {
//     this.gridOptions = <GridOptions>{
//       columnDefs: this.columnDefs,
//       pagination: true,
//       paginationPageSize: this.pageSize,
//     };
//   }

//   enableDisable(data: any) {
//     // Implement enabling/disabling logic based on data
//     console.log('Enable/Disable:', data);
//   }

//   deleteRow(data: any) {
//     // Implement row deletion logic based on data
//     console.log('Delete:', data);
//   }
// }
