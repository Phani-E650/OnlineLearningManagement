import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { AnnouncementsComponent } from '../announcements/announcements.component';

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
      width: '400px',
      height:'400px'
    });
  }

}
