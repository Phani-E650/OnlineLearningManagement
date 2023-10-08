// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-button-renderer',
//   templateUrl: './button-renderer.component.html',
//   styleUrls: ['./button-renderer.component.css']
// })
// export class ButtonRendererComponent {

// }
// button-renderer.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-button-renderer',
  template: `
    <button (click)="onClick()" class="btn btn-primary">{{ label }}</button>
  `,
})
export class ButtonRendererComponent {
  label: any;
  // onClick: any;
  params:any;
  agInit(params: any) {
    this.params = params;
    this.label = params.label || '';
    // this.onClick = params.onClick || (() => {});
  }
  onClick(): void {
    if (this.params.onClick) {
      this.params.onClick(this.params.data);
    }
  }
}

