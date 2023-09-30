import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
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
  constructor(private http: HttpClient) {}
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

      // Assuming you have an API endpoint to send data to the backend
      this.data.forEach((row) => {
        const adminData = { email: row.email, role: row.role };
        // Make a POST request to your backend API with 'row' data
        
  this.http.post('http://localhost:8080/api/admin/create-student', adminData).subscribe(
    (response: any) => {
      if (response.message === 'Student registration initiated successfully.') {
        // Send an email to the admin with the registration link
        // this.sendRegistrationEmail(this.email);
        console.log('Registration email sent to successful');
      } else {
        console.error('Admin creation failed.');
      }
    },
    (error: any) => {
      console.error('An error occurred while creating the admin:', error);
    }
  );
        // Example: this.http.post('your-backend-api-url', row).subscribe(...)
      });
    }
  }
}



