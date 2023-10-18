import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-moduleheader',
  templateUrl: './moduleheader.component.html',
  styleUrls: ['./moduleheader.component.css']
})
export class ModuleheaderComponent {
  @Input() coursename: string="";

}
