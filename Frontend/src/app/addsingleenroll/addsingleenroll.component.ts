import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdduserComponent } from '../adduser/adduser.component';

@Component({
  selector: 'app-addsingleenroll',
  templateUrl: './addsingleenroll.component.html',
  styleUrls: ['./addsingleenroll.component.css']
})

export class AddsingleenrollComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AdduserComponent>
  ) {
  }
  content:any;
  submitInput() {
    // Here you can submit the form data, for example, to an API
    // You can also perform validation and error handling
    // Once data is saved or updated, you can close the dialog

    // Close the dialog and pass the updated data back to the main TS file
    this.dialogRef.close(this.content);
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
