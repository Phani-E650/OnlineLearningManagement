import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { CreateAdminComponent } from './create-admin/create-admin.component';
import { ExcelUploadComponent } from './excel-upload/excel-upload.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { TableComponent } from './table/table.component';
import { UserDetailsComponent } from './user-details/user-details.component';

const routes: Routes = [
  { path: 'admin', component: AdminComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'upload-excel', component:ExcelUploadComponent }, 
  { path: 'create', component: CreateAdminComponent },
  { path: 'login', component: LoginComponent },
  { path: 'table', component: TableComponent },
  { path: 'user-details/:id', component: UserDetailsComponent },
  {path: '', redirectTo: '/create', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { 
}
