import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-input-dialog',
  templateUrl: './input-dialog.component.html',
  styleUrls: ['./input-dialog.component.css']
})


export class InputDialogComponent {
  inputValue: string = '';

  constructor(public dialogRef: MatDialogRef<InputDialogComponent>) {}

  closeDialog(): void {
    this.dialogRef.close();
  }

  submitInput(): void {
    // Do something with this.inputValue (e.g., send it to a service or display it)
    this.dialogRef.close(this.inputValue);
  }
}
