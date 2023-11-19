package com.application.demo.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale.Category;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.application.demo.Dto.addcourserequest;
import com.application.demo.Dto.getcourseresponse;
import com.application.demo.entity.CategoryEntity;
import com.application.demo.entity.CourseEntity;
import com.application.demo.repository.CategoryRepository;
import com.application.demo.repository.CourseRepository;
import com.application.demo.repository.UserFullDetailsRepository;

@Service
public class CourseService {
	
	@Autowired
	private CourseRepository courseRepo;
	@Autowired
	private UserFullDetailsRepository userRepo;
	@Autowired
	private CategoryRepository categoryRepo;
	
	
	public CourseEntity saveCourse(CourseEntity course)
	{
		return courseRepo.save(course);
	}
	
	public CourseEntity addNewCourse(addcourserequest course)
	{
		CourseEntity addcourse=new CourseEntity();
		addcourse.setCategory(categoryRepo.findById(Long.parseLong(course.getCategory())).get());
		addcourse.setDepartment(categoryRepo.findById(Long.parseLong(course.getDepartment())).get());
		addcourse.setEndDate(course.getEndDate());
		addcourse.setStartDate(course.getStartDate());
		addcourse.setCourseName(course.getCourseName());
		addcourse.setProfessorName(course.getProfessorName());
		addcourse.setCourseDescription(course.getCourseDescription());
		addcourse.setCourseName(course.getCourseName());
		addcourse.setNumberOfWeeks(course.getNumberOfWeeks());
		addcourse.setCourseId(course.getCourseId());
		addcourse.setCourseStatus(course.getCourseStatus());
		return courseRepo.save(addcourse);
	}
	
	public List<getcourseresponse> getAllCourses()
	{
		List<CourseEntity> allcourses= (List<CourseEntity>)courseRepo.findAll();
	    List<getcourseresponse> courseresponse=new ArrayList<>();
	    for(CourseEntity i:allcourses) {
	    	getcourseresponse course=new getcourseresponse();
	    	if((i.getCategory()!=null && i.getDepartment()!=null)){
	    	course.setCategory(i.getCategory().getName());
	    	course.setDepartment(i.getDepartment().getName());
	    	}
	    	course.setEndDate(i.getEndDate());
	    	course.setStartDate(i.getStartDate());
	    	course.setCourseName(i.getCourseName());
	    	course.setProfessorName(i.getProfessorName());
	    	course.setCourseDescription(i.getCourseDescription());
	    	course.setCourseName(i.getCourseName());
	    	course.setNumberOfWeeks(i.getNumberOfWeeks());
	    	course.setCourseId(i.getCourseId());
	    	course.setCourseStatus(i.getCourseStatus());
	    	course.setId(i.getId());
	    	courseresponse.add(course);
	    	
	    }
		return courseresponse;
		
	}
	public CourseEntity findCourseByCourseNameAndProfessorNameAndCategoryName(String courseName, String professorName, String categoryName) {
		CategoryEntity category=categoryRepo.findById(Long.parseLong(categoryName)).get();
	    return courseRepo.findByCourseNameAndProfessorNameAndCategoryId(courseName, professorName, Long.parseLong(categoryName));
	}

	
	

    public List<CourseEntity> getCoursesByProfessorName(String professorName) {
    	List<CourseEntity> courses= courseRepo.findByProfessorName(professorName);
    	List<CourseEntity> teacherenrolledcourses=userRepo.findByEmail(professorName).get().getEnrollcourseslist().stream().map((enroll)->enroll.getCourse()).collect(Collectors.toList());
    	for(CourseEntity i:teacherenrolledcourses) {
    		courses.add(i);
    	}
    	return courses;
    }

}
