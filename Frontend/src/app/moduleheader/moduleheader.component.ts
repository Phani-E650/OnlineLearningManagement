import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { AnnouncementsComponent } from '../announcements/announcements.component';
import { AssignmentsComponent } from '../assignments/assignments.component';

@Component({
  selector: 'app-moduleheader',
  templateUrl: './moduleheader.component.html',
  styleUrls: ['./moduleheader.component.css']
})
export class ModuleheaderComponent {

  constructor(public dialog: MatDialog){}
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

}
