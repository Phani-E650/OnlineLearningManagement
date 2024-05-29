

export class Course {
    id: string = '';
    courseName: string = '';
    startDate!: Date;
    endDate!: Date;
    numberOfWeeks: string = '';
    userId: string = '';
    department: string = '';
    courseStatus: string = 'inactive';
    categoryId: string = ''; 
    instructorname: string ='';
    category: string ='';
    professorName:any;
    courseDescription: string='';
    constructor() {}
  }
  