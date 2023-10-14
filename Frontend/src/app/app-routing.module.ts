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
import { AddcourseComponent } from './addcourse/addcourse.component';


const routes: Routes = [
  { path: 'admin', component: AdminComponent,canActivate: [AuthGuard] },
  { path: 'registration', component: RegistrationComponent },
  { path: 'upload-excel', component:ExcelUploadComponent,canActivate: [AuthGuard] }, 
  { path: 'create', component: CreateAdminComponent,canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'table', component: TableComponent },
  { path: 'user-details/:id', component: UserDetailsComponent ,canActivate: [AuthGuard]},
  {path:'add-course',component:AddcourseComponent,canActivate:[AuthGuard]},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'createcategory', component: CategoryCreateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { 
}
