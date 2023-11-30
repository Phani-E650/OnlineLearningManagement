
import { Component, Input, NgModule } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ColDef, IGroupCellRendererParams } from 'ag-grid-community';
 import { UsernameLinkRendererComponent } from '../username-link-renderer/username-link-renderer.component';
import { AgGridAngular } from 'ag-grid-angular';
import { ButtonRendererComponent } from '../button-renderer/button-renderer.component';
import { ActionCellRendererComponent } from '../action-cell-renderer/action-cell-renderer.component';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {

  @Input()
  RowDataUser!: string;
  public columnDefs: ColDef[]= [
    {
      headerName: 'Username',
      field: 'email',
      cellStyle: { textAlign: 'left' },
      filter:true,
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
    { headerName: 'Role', field: 'role', cellStyle: { textAlign: 'left' },filter:true, },
    { headerName: 'Status', field: 'status' , cellStyle: { textAlign: 'left' },
    cellRenderer: ActionCellRendererComponent,
    cellRendererParams: {
      enableDisableCallback: this.enableDisableCallback.bind(this),
      label: 'Delete',
    },
   },
    {
      headerName: 'Action', cellStyle: { textAlign: 'left' },
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
  contentId: any;
  

  constructor(private http: HttpClient,private route: ActivatedRoute,private toastr:ToastrService ) {
    // this.route.params.subscribe(params => {
    //   this.contentId = params['contentId'];
    // });
    // if(this.contentId==""){
    //   this.contentId="admin";
    // }
  }
  ngOnChanges(): void {
    console.log('myInputData received:', this.RowDataUser);
  }

  rowData!: any[];
  studentrowData!: any[];
  teacherrowData!: any[];

  ngOnInit(){
    this.loadData();
    console.log(this.RowDataUser);
  }
  onGridReady(params: any) {
    this.gridApi = params.api;
    this.loadData();
  }

  loadData() {
    
    this.http.get<any[]>('http://localhost:8080/table/getdata').subscribe((data) => {
      this.rowData = data;
    });
    this.studentrowData = this.rowData.filter(item => item.role =="student");
    this.teacherrowData = this.rowData.filter(item => item.role =="teacher");
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


  sentmail(){
    console.log("hi");
    this.toastr.success("Registration email sent to all unregister users");
    this.http.post('http://localhost:8080/api/admin/sentmail',null).subscribe(
        (response: any) => {
            console.log("hiiiiii");
            if (response.message === 'Mails sent successfully.') {
                console.log('Registration email sent to successful');
                this.toastr.success("Registration email sent successfully")
              } else {
                console.error('Admin creation failed.');
                this.toastr.error("Mail sent failed")
              }
        },
        (error: any) => {
            console.error('An error occurred while creating the admin:', error);
          })
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