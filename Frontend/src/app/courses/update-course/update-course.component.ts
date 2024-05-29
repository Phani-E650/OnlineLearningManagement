import { HttpClient } from '@angular/common/http';
import { Component , Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/category.service';
import { Course } from 'src/app/models/course';

@Component({
  selector: 'app-update-course',
  templateUrl: './update-course.component.html',
  styleUrls: ['./update-course.component.css']
})
export class UpdateCourseComponent {
  courseId:any;
  course = new Course();
  subcategories: any;
  categories:any;
  enddatemsg:any
  startdatemsg:any;
  constructor(private courseService : CategoryService,private toastr: ToastrService,@Inject(MAT_DIALOG_DATA) public data: any , private http: HttpClient,  private activatedRoute: ActivatedRoute,private dialogRef:MatDialogRef<UpdateCourseComponent>) {
    
    this.courseId = data.courseId;
    this.course.id = this.courseId;
    this.course=data.course;

  }
  ngOnInit(): void 
  {
    console.log(this.courseId)
    this.courseService.getmaincategories().subscribe((categories)=>{
      this.categories=categories;
    })
    
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
  checkendDateValidity() {
    const startDate = new Date(this.course.startDate);
    const endDate = new Date(this.course.endDate);

    if (endDate < startDate) {
      this.enddatemsg = 'End date should be greater than or equal to start date';
    } else {
      this.enddatemsg = ''; 
    }
  }
  checkstartDateValidity(){
    const selectedDate = new Date(this.course.startDate);
    const currentDate = new Date();
        if (selectedDate < currentDate) {
          this.startdatemsg = 'Start date should be greater than current date';
        } else {
          this.startdatemsg = ''; 
        }
  }
  submitForm() {
    console.log(this.course);
    this.dialogRef.close();
    this.http.put('http://localhost:8080/updatecourse', this.course).subscribe(
      (response) => {
        console.log('course submitted:', response);
        this.toastr.success("course updated successfull")
        // Reset the form
      },
      (error) => {
        console.error('Error submitting course:', error);
      }
    );
  }
  getsubcategories(event:any){
    const selectedOption = event;
    const selectedIndex = event.target.selectedIndex;
    const selectedOptionobject = event.target.options[selectedIndex];
    const selectedOptionValue = selectedOptionobject.value;
    // const department=this.categories.filter((cat:any)=>{cat.id===selectedOptionValue}).name;
    // console.log(selectedOptionValue);
    // console.log(department);
    let department;
    for (var char of this.categories) {
      // console.log(char.id); 
      if(char.id==selectedOptionValue){
        department=char.name;
      }
    }
    //  console.log(department);
    // this.course.department=department;
    // console.log(this.categories.filter((cat:any)=>{cat.id===selectedOptionValue})[0]);
    this.courseService.getsubCategoriesofcategories(selectedOptionValue).subscribe((categories)=>{
      this.subcategories=categories;
    })
  }

}
