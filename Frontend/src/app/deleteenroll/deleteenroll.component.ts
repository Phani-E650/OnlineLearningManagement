import { Component } from '@angular/core';

@Component({
  selector: 'app-deleteenroll',
  templateUrl: './deleteenroll.component.html',
  styleUrls: ['./deleteenroll.component.css']
})
export class DeleteenrollComponent {
  params: any;

  agInit(params: any): void {
    this.params = params;
  }

  // enableDisable(): void {
  //   if (this.params.enableDisableCallback) {
  //     // console.log(this.params.data);
      
  //     this.params.enableDisableCallback(this.params.data);
      
  //   }
  // }

  deleteRow(): void {
    if (this.params.deleteCallback) {
      this.params.deleteCallback(this.params.data);
    }
  }

}
