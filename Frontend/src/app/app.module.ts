import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { CreateAdminComponent } from './create-admin/create-admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ExcelUploadComponent } from './excel-upload/excel-upload.component';
import { AgGridModule } from 'ag-grid-angular';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { ActionCellRendererComponent } from './action-cell-renderer/action-cell-renderer.component';
import { UsernameLinkRendererComponent } from './username-link-renderer/username-link-renderer.component';
import { ButtonRendererComponent } from './button-renderer/button-renderer.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { TableComponent } from './table/table.component';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AdminNavHeaderComponent } from './admin-nav-header/admin-nav-header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header/header.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryCreateComponent } from './category-create/category-create.component';
import { ToastrModule } from 'ngx-toastr';
import { TeacherdashboardComponent } from './teacherdashboard/teacherdashboard.component';
import { AdduserComponent } from './adduser/adduser.component';
import { AddcourseComponent } from './addcourse/addcourse.component';
import { CoursestableComponent } from './coursestable/coursestable.component';

import { CourseModulesComponent } from './course-modules/course-modules.component';

import { YouTubePlayerModule } from '@angular/youtube-player';
import { ModuleheaderComponent } from './moduleheader/moduleheader.component';
import { InputDialogComponent } from './input-dialog/input-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { VideoaddComponent } from './videoadd/videoadd.component';
import { AssignmentsComponent } from './assignments/assignments.component';
import { AssignmentListComponent } from './assignment-list/assignment-list.component';
import { UpdatevideocontentComponent } from './updatevideocontent/updatevideocontent.component';
import { UpdatemoduleComponent } from './updatemodule/updatemodule.component';

import { PdfViewerModule } from 'ng2-pdf-viewer';
import { DeleteenrollComponent } from './deleteenroll/deleteenroll.component';
import { EnrollexcelComponent } from './enrollexcel/enrollexcel.component';
import { AddsingleenrollComponent } from './addsingleenroll/addsingleenroll.component';
import { StudentdashboardComponent } from './studentdashboard/studentdashboard.component';
import { StudentcoursesComponent } from './studentcourses/studentcourses.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AssignmentSolutionComponent } from './assignment-solution/assignment-solution.component';
import { AssignmentsubmissionsComponent } from './assignmentsubmissions/assignmentsubmissions.component';
import { AssignmarksComponent } from './assignmarks/assignmarks.component';
import { MarkssubmitComponent } from './markssubmit/markssubmit.component';
import { SubmissiondownloadComponent } from './submissiondownload/submissiondownload.component';
import { DeadlinedatevalueComponent } from './deadlinedatevalue/deadlinedatevalue.component';
import { ApprovecourseComponent } from './courses/approvecourse/approvecourse.component';
import { CourseListComponent } from './courses/course-list/course-list.component';
import { AllCoursesComponent } from './courses/all-courses/all-courses.component';
import { CourseContentComponent } from './courses/course-content/course-content.component';
import { UpdateCourseComponent } from './courses/update-course/update-course.component';





@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    CreateAdminComponent,
    ExcelUploadComponent,
    LoginComponent,
    AdminComponent,
    ActionCellRendererComponent,
    UsernameLinkRendererComponent,
    ButtonRendererComponent,
    
    UserDetailsComponent,
    TableComponent,
    AdminNavHeaderComponent,
    HeaderComponent,
    CategoryListComponent,
    CategoryCreateComponent,
    TeacherdashboardComponent,
    AdduserComponent,
    AddcourseComponent,
    CoursestableComponent,
    ApprovecourseComponent,
    CourseListComponent,
    AllCoursesComponent,
    CourseModulesComponent,
    CourseContentComponent,
    ModuleheaderComponent,
    InputDialogComponent,
    UpdateProfileComponent,
    AnnouncementsComponent,
    VideoaddComponent,
    AssignmentsComponent,
    AssignmentListComponent,
    UpdatevideocontentComponent,
    UpdatemoduleComponent,
    UpdateCourseComponent,
    
   
    DeleteenrollComponent,
    EnrollexcelComponent,
    AddsingleenrollComponent,
    StudentdashboardComponent,
    StudentcoursesComponent,
    ChangePasswordComponent,
    ForgotPasswordComponent,
    AssignmentSolutionComponent,
    AssignmentsubmissionsComponent,
    AssignmarksComponent,
    MarkssubmitComponent,
    SubmissiondownloadComponent,
    DeadlinedatevalueComponent
  
  ],

  

  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    PdfViewerModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    AgGridModule,
    MatCardModule,
    CarouselModule,
    YouTubePlayerModule,
    ToastrModule.forRoot({
      timeOut: 15000,
      extendedTimeOut: 3000,
      positionClass: 'toast-top-right',
      progressBar: true,
      progressAnimation : 'decreasing',
      closeButton: true,




    }

    ),  
    MatDatepickerModule,
    MatNativeDateModule,
    NgbModule,
    MatDialogModule,

    
  ],
  providers: [],
  bootstrap: [AppComponent]
})


export class AppModule { }
