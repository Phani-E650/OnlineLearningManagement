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
    AdminNavHeaderComponent
  
  ],

  

  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    AgGridModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
