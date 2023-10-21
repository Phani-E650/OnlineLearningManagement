import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-videoadd',
  templateUrl: './videoadd.component.html',
  styleUrls: ['./videoadd.component.css']
})
export class VideoaddComponent {
  inputValue: string = '';
  content:any={};

  constructor(public dialogRef: MatDialogRef<VideoaddComponent>) {}

  closeDialog(): void {
    this.dialogRef.close();
  }

  submitForm(): void {
    // Do something with this.inputValue (e.g., send it to a service or display it)
    this.dialogRef.close(this.content);
  }
}
