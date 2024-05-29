import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-excel-upload',
  templateUrl: './excel-upload.component.html',
  styleUrls: ['./excel-upload.component.css'],
})
export class ExcelUploadComponent {
  data: any[] = [];
  email: any;
  role: any;
  constructor(private http: HttpClient, public dialog: MatDialog, private toastr: ToastrService,private router: Router) {}
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        this.data = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      };
      reader.readAsArrayBuffer(file);
    }
  }
  

  uploadData(): void {
    
    if (this.data) {

      
      this.data.forEach((row) => {
        const adminData = { email: row.email, role: row.role };
        
        
  this.http.post('http://localhost:8080/api/admin/create-student', adminData).subscribe(
    (response: any) => {
      if (response.message === 'Student registration initiated successfully.') {
       
        console.log('Registration email sent to successful');
      } else {
        console.error('Admin creation failed.');
      }
    },
    (error: any) => {
      console.error('An error occurred while creating the admin:', error);
    }
  );
        
      }
      );
      this.router.navigate(['/Admin']);
      this.toastr.success("Users added successfully");
      
    }
  }
}



