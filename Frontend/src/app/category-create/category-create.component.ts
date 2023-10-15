import { ChangeDetectorRef, Component } from '@angular/core';
import { LogoutService } from '../logout.service';
import { HttpClient } from '@angular/common/http';
import { MyServiceService } from '../my-service.service';
// import { AllservicesService } from '../allservices.service';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent {
  constructor(private myService: MyServiceService,private http: HttpClient,private cdr: ChangeDetectorRef){};
  categoriesWithSubcategories: any[] = [];
  showInputBox = false;  // To control the visibility of the input box
  newCategory: string = ''; 
  categories = [
    {
      name: 'Category 1',
      subcategories: [
        {
          name: 'Subcategory 1.1',
          subcategories: []
        },
        {
          name: 'Subcategory 1.2',
          subcategories: []
        }
      ]
    },
    {
      name: 'Category 2',
      subcategories: []
    }
  ];

  onAddCategory( categoryData: { categoryName: string, parentCategory: string }) {
    // Add your logic to add the new category to the appropriate level in your data structure
    // For simplicity, this example pushes the new category to the top level
    console.log(categoryData.parentCategory);
    console.log(categoryData.categoryName);
    let body={
      "name":categoryData.categoryName
    }
  this.myService.addSubcategory(categoryData.parentCategory,body).subscribe((response)=>
  {
    console.log("hiiiiii");
    this.fetchCategoriesWithSubcategories();
    this.cdr.detectChanges();
    if (response.message === 'successfully created.') {
        console.log('Registration email sent to successful');
      } else {
        console.error('Admin creation failed.');
      }
},
(error: any) => {
    console.error('An error occurred while creating the admin:', error);
    this.fetchCategoriesWithSubcategories();
  }
  )
    // this.categoriesWithSubcategories.push({
    //   name: categoryData.categoryName,
    //   subcategories: []
    // });
  }
  fetchCategoriesWithSubcategories() {
    // const url = 'http://localhost:8080/categories/getsubcategories';
    // this.http.get<any[]>('http://localhost:8080/table/getdata').subscribe((data) => {
    // this.http.get<any[]>('http://localhost:8080/category/getcategories').subscribe(
      this.myService.getAllCategoriesWithSubcategories().subscribe(
      (response) => {
        this.categoriesWithSubcategories = response;
        console.log('Categories with subcategories:', this.categoriesWithSubcategories);
        // Handle success
      },
      (error) => {
        console.error('Error fetching categories with subcategories:', error);
        // Handle error
      }
    );
    this.cdr.detectChanges();
  }
  ngOnInit(){

 this.fetchCategoriesWithSubcategories();
  }
  saveCategory() {
    // Handle the saving logic here, e.g., add the new category to an array
    // For demonstration purposes, let's just log the new category.
    const category={
      "name":this.newCategory
    }
    this.myService.addcategory(category).subscribe((response)=>
    {
         console.log("successfully added");
         this.fetchCategoriesWithSubcategories();
    },
    (error: any) => {
      console.error('An error occurred while creating the admin:', error);
    });
    console.log('New category:', this.newCategory);
    
    // You can save this category to your TypeScript file or perform any other desired actions.
    
    // Reset the input box and hide it
    this.newCategory = '';
    this.showInputBox = false;
  }

}
