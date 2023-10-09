// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-header',
//   templateUrl: './header.component.html',
//   styleUrls: ['./header.component.css']
// })
// export class HeaderComponent {

// }
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loggedUser = '';
  currRole = '';
  title = '';

  constructor(private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void 
  {
    this.loggedUser = JSON.stringify(sessionStorage.getItem('loggedUser')|| '{}');
    this.loggedUser = this.loggedUser.replace(/"/g, '');

    this.currRole = JSON.stringify(sessionStorage.getItem('ROLE')|| '{}'); 
    this.currRole = this.currRole.replace(/"/g, '');

    if(this.currRole === "admin"){
      this.title = "Admin Dashboard";
    }
    else if(this.currRole === "professor"){
      this.title = "";
    }
    else if(this.currRole === "user"){
      this.title = "";
    }
  }

  logout()
  {
    // sessionStorage.clear();
    // this._router.navigate(['/login']);
    localStorage.removeItem('isAuthenticated');
    // Redirect to the login page after logout
    this.router.navigate(['/login']);
  }

  navigateHome()
  {
    if(this.currRole === "admin"){
      this.router.navigate(['/admin']);
    }
    else if(this.currRole === "professor"){
      this.router.navigate(['/professordashboard']);
    }
    else if(this.currRole === "user"){
      this.router.navigate(['/userdashboard']);
    }
  }


}
