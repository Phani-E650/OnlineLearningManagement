import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css']
})
export class AnnouncementsComponent {


  announcement: any = {};

  constructor(private http: HttpClient, private dialogRef:MatDialogRef<AnnouncementsComponent>) {}
  closeDialog(): void {
    this.dialogRef.close();
  }
  submitForm() {
    console.log(this.announcement);
    this.http.post('http://localhost:8080/announcements', this.announcement).subscribe(
      (response) => {
        console.log('Announcement submitted:', response);
        // Reset the form
        this.announcement = {};
      },
      (error) => {
        console.error('Error submitting announcement:', error);
      }
    );
  }
}
