import { Component } from '@angular/core';

@Component({
  selector: 'app-approvecourse',
  templateUrl: './approvecourse.component.html',
  styleUrls: ['./approvecourse.component.css']
})
export class ApprovecourseComponent {
  params: any;

  agInit(params: any): void {
    this.params = params;
  }

  enableDisable(): void {
    if (this.params.enableDisableCallback) {
      // console.log(this.params.data);
      
      this.params.enableDisableCallback(this.params.data);
      
    }
  }

}
