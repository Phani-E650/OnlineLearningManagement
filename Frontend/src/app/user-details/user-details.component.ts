import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent {
  constructor(private http: HttpClient ,
    private route: ActivatedRoute,
     private router: Router) {}
   cardData: any;
  ngOnInit(){
    this.route.params.subscribe((data1) => {
      console.log(data1);
      const email = data1['id']; // Access the id parameter here
      // Use the id parameter as needed in your component
      console.log(email);
      this.http.get<any[]>(`http://localhost:8080/api/getuserdetails/${email}`).subscribe((data) => {
        this.cardData = data;
      });
    });
    
}

}
