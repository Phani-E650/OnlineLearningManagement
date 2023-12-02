import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { CreateAdminComponent } from './create-admin/create-admin.component';
import { ExcelUploadComponent } from './excel-upload/excel-upload.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { TableComponent } from './table/table.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { AuthGuard } from './auth.guard';
import { CategoryCreateComponent } from './category-create/category-create.component';
import { TeacherdashboardComponent } from './teacherdashboard/teacherdashboard.component';
import { AddcourseComponent } from './addcourse/addcourse.component';
import { CoursestableComponent } from './coursestable/coursestable.component';

import { CourseModulesComponent } from './course-modules/course-modules.component';

import { AdduserComponent } from './adduser/adduser.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { AssignmentsComponent } from './assignments/assignments.component';
import { AssignmentListComponent } from './assignment-list/assignment-list.component';
import { StudentdashboardComponent } from './studentdashboard/studentdashboard.component';
import { StudentcoursesComponent } from './studentcourses/studentcourses.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AssignmentSolutionComponent } from './assignment-solution/assignment-solution.component';
import { AssignmentsubmissionsComponent } from './assignmentsubmissions/assignmentsubmissions.component';
import { AllCoursesComponent } from './courses/all-courses/all-courses.component';
import { CourseContentComponent } from './courses/course-content/course-content.component';
import { CourseAttachmentsComponent } from './course-attachments/course-attachments.component';
import { CourseAttachmentsListComponent } from './course-attachments-list/course-attachments-list.component';


const routes: Routes = [
  { path: 'admin', component: AdminComponent,canActivate: [AuthGuard] },
  { path: 'registration', component: RegistrationComponent },
  { path: 'upload-excel', component:ExcelUploadComponent,canActivate: [AuthGuard] }, 
  { path: 'create', component: CreateAdminComponent,canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'table', component: TableComponent },
  { path: 'user-details/:id', component: UserDetailsComponent ,canActivate: [AuthGuard]},
  { path: 'update-details/:id', component: UpdateProfileComponent ,canActivate: [AuthGuard]},
  {path:'add-course',component:AddcourseComponent,canActivate:[AuthGuard]},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'createcategory', component: CategoryCreateComponent },
  { path: 'teacherdashboard', component: AllCoursesComponent },
  { path: 'cousetable', component: CoursestableComponent },
  { path: 'allcourses', component: AllCoursesComponent },
  {path:'allcourses/:coursename',component:CourseModulesComponent},
  { path: 'course-content', component: CourseContentComponent },
  { path: 'userenroll/:coursename', component: AdduserComponent },
  { path: 'announcements', component: AnnouncementsComponent },
  { path: 'assignments', component: AssignmentsComponent },
  { path: 'assignments-list', component: AssignmentListComponent },
  { path: 'attachments-list', component: CourseAttachmentsListComponent  },
 
  { path: 'assignments-solution', component: AssignmentSolutionComponent },
  { path: 'student', component: StudentcoursesComponent,canActivate: [AuthGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'allenrollcourses', component: StudentcoursesComponent },
  { path: 'submissions/:assignid', component: AssignmentsubmissionsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { 
}
