import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { AnnouncementsComponent } from '../announcements/announcements.component';
import { AssignmentsComponent } from '../assignments/assignments.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-moduleheader',
  templateUrl: './moduleheader.component.html',
  styleUrls: ['./moduleheader.component.css']
})
export class ModuleheaderComponent {
  loggedUser = '';
  currRole = '';
  constructor(public dialog: MatDialog, private route: Router){}
  ngOnInit(): void {
    this.loggedUser = JSON.stringify(sessionStorage.getItem('loggedUser')|| '{}');
    this.loggedUser = this.loggedUser.replace(/"/g, '');

    this.currRole = JSON.stringify(sessionStorage.getItem('ROLE')|| '{}'); 
    this.currRole = this.currRole.replace(/"/g, '');
    console.log(this.currRole);
  }
  @Input() coursename: string="";

  openAnnouncements(): void {
    this.dialog.open(AnnouncementsComponent, {
     
      width: '500px',
      height:'500px'
    });
  }

  openAssignments(): void {
    this.dialog.open(AssignmentsComponent, {
      
      width: '400px',
      height:'400px'
    });
  }

  openAssignmentsList() : void {
    this.route.navigate(["assignments-list"]);
  }


  
  openCourseAttachmentsList() : void {
    this.route.navigate(["attachments-list"]);
  }

  openassignmentsolution():void{
    this.route.navigate(["assignments-solution"]);
  }
  
}
