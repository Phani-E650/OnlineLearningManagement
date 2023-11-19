import { Component } from '@angular/core';
import { ColDef } from 'ag-grid-community';

import { MyServiceService } from '../my-service.service';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ApprovecourseComponent } from '../courses/approvecourse/approvecourse.component';

@Component({
  selector: 'app-coursestable',
  templateUrl: './coursestable.component.html',
  styleUrls: ['./coursestable.component.css']
})
export class CoursestableComponent {
  pageSize = 10;
  gridApi: any;
  courseData!: any[];
  constructor(private courseService : MyServiceService, private _router : Router, private http : HttpClient) { }
  public columncouseDefs: ColDef[]= [
    {
      headerName: 'Coursename',
      field: 'courseName',
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
    { headerName: 'CourseDescription', field: 'courseDescription', cellStyle: { textAlign: 'left' },filter:true, },
    { headerName: 'Category', field: 'category', cellStyle: { textAlign: 'left' },filter:true, },
    { headerName: 'StartDate', field: 'startDate', cellStyle: { textAlign: 'left' },filter:true,  cellRenderer: this.dateRenderer},
    { headerName: 'EndDate', field: 'endDate', cellStyle: { textAlign: 'left' },filter:true,  cellRenderer: this.dateRenderer},
    { headerName: 'NumberOfWeeks', field: 'numberOfWeeks', cellStyle: { textAlign: 'left' },filter:true, },
    { headerName: 'ProfessorName', field: 'professorName' , cellStyle: { textAlign: 'left' },
    // cellRenderer: ActionCellRendererComponent,
    // cellRendererParams: {
    //   enableDisableCallback: this.enableDisableCallback.bind(this),
    //   label: 'Delete',
    // },
   },
    {
      headerName: 'ApproveCourses',  field: 'courseStatus',cellStyle: { textAlign: 'left' },
      cellRenderer: ApprovecourseComponent,
      cellRendererParams: {
        enableDisableCallback: this.enableDisableCallback.bind(this),
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
  onGridReady(params: any) {
    this.gridApi = params.api;
    this.loadData();
  }
  ngOnInit(){
    this.loadData();
  }

  loadData() {
    
    this.courseService.getCourse().subscribe((data) => {
      this.courseData = data;
    });
  }
  dateRenderer(params: any) {
    const epochTime = params.value;
    const date = new Date(epochTime);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are 0-based, so add 1
    const year = date.getFullYear();
  
    // Format the date as "dd/mm/yyyy"
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  }
  enableDisableCallback(data: any) {
    console.log(data)
    const id=data.id;
    this.courseService.enablecourse(id).subscribe((response)=>{
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

}
