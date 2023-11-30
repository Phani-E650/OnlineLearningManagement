import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { data } from 'jquery';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css']
})
export class AnnouncementsComponent {
  @Input() coursename: string="";
  professorName = '';
  currRole = '';
  courseName= '';
  announcement: any = {};

  constructor(private http: HttpClient,  private activatedRoute: ActivatedRoute,private dialogRef:MatDialogRef<AnnouncementsComponent>, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.professorName = JSON.stringify(sessionStorage.getItem('loggedUser')|| '{}');
    this.professorName = this.professorName.replace(/"/g, '');

    this.currRole = JSON.stringify(sessionStorage.getItem('ROLE')|| '{}'); 
    this.currRole = this.currRole.replace(/"/g, '');

    //this.courseName = this.activatedRoute.snapshot.params['coursename'];
    //this.courseName = this.activatedRoute.snapshot.paramMap.get('coursename') || 'DefaultCourseName';
    this.announcement.courseName = sessionStorage.getItem('course');
    
    this.announcement.professorName = this.professorName;
  }
  closeDialog(): void {
    this.dialogRef.close();
  }


  submitForm() {
    console.log(this.announcement);
    this.dialogRef.close();
    this.http.post('http://localhost:8080/announcements/add', this.announcement).subscribe(
      (response) => {
        console.log('Announcement submitted:', response);
        this.toastr.success("Announcment Sent successfully");
        // Reset the form
      
        this.announcement = {};
      },
      (error) => {
        console.error('Error submitting announcement:', error);
      }
    );
  }
}
