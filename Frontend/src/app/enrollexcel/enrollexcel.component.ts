import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import * as XLSX from 'xlsx';
import { AdduserComponent } from '../adduser/adduser.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-enrollexcel',
  templateUrl: './enrollexcel.component.html',
  styleUrls: ['./enrollexcel.component.css']
})
export class EnrollexcelComponent {
  data: any[] = [];
  email: any;
  role: any;
  constructor(private adduserexcel: MatDialogRef<AdduserComponent>,private http: HttpClient, public dialog: MatDialog, private toastr:ToastrService) {}
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
   
    this.adduserexcel.close(this.data);
  //   if (this.data) {

      
  //     this.data.forEach((row) => {
  //       const adminData = { email: row.email, role: row.role };
        
        
  // this.http.post('http://localhost:8080/api/admin/create-student', adminData).subscribe(
  //   (response: any) => {
  //     if (response.message === 'Student registration initiated successfully.') {
       
  //       console.log('Registration email sent to successful');
  //     } else {
  //       console.error('Admin creation failed.');
  //     }
  //   },
  //   (error: any) => {
  //     console.error('An error occurred while creating the admin:', error);
  //   }
  // );
        
  //     });
  //   }
  // }
}
Cancel(){
  this.adduserexcel.close();
}
}
