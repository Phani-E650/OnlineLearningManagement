import { Component } from '@angular/core';

  

import { NotificationService } from './notification.service'

  

@Component({

  selector: 'app-root',

  templateUrl: './app.component.html',

  styleUrls: ['./app.component.css']

})

export class AppComponent {

  title = 'elearning-management';

  

  constructor(private notifyService : NotificationService) { }

  

  showToasterSuccess(){

      this.notifyService.showSuccess("Data shown successfully !!", "ItSolutionStuff.com")

  }

  

  showToasterError(){

      this.notifyService.showError("Something is wrong", "ItSolutionStuff.com")

  }

  

  

}