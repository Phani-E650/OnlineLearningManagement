import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-updatevideocontent',
  templateUrl: './updatevideocontent.component.html',
  styleUrls: ['./updatevideocontent.component.css']
})


export class UpdatevideocontentComponent {
  content: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<UpdatevideocontentComponent>
  ) {
    this.content = { ...data.content };
  }

  submitForm() {
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
