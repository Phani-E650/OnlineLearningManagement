package com.application.demo.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.application.demo.entity.CourseEntity;
import com.application.demo.entity.UserTemp;
import com.application.demo.repository.CourseRepository;
import com.application.demo.service.CourseService;


@CrossOrigin(origins = "http://localhost:4200")


@RestController

public class CourseController {
	
	@Autowired
	private CourseService courseService;
	@Autowired
	private CourseRepository courseRepo;
	
	
	@PostMapping("/addCourse")
	public CourseEntity addNewCourse(@RequestBody CourseEntity course) throws Exception
	{
		CourseEntity courseObj = null;
		String newID = getNewID();
		course.setCourseId(newID);
		
		courseObj = courseService.addNewCourse(course);
		return courseObj;
	}
	
	@GetMapping("/getcoursebyemail/{email}")
    public ResponseEntity<List<CourseEntity>> getCoursesByEmail(@PathVariable String email) {
        List<CourseEntity> courses = courseService.getCoursesByProfessorName(email);
        if (courses.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(courses, HttpStatus.OK);
    }
	
	public String getNewID()
	{
		String AlphaNumericString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"+"0123456789"+"abcdefghijklmnopqrstuvxyz";
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < 12; i++) 
        {
            int index = (int)(AlphaNumericString.length() * Math.random());
            sb.append(AlphaNumericString.charAt(index));
        }
        return sb.toString();
	}
	
	@GetMapping("/getcourses")
	public List<CourseEntity> getcourses(){
		return courseService.getAllCourses();
	}
	
	 @PutMapping("/enablecourse/{id}")
	    public ResponseEntity<CourseEntity> updateEntity(@PathVariable Long id) {
	    	
	        Optional<CourseEntity> entityOptional = courseRepo.findById(id);

	        if (entityOptional.isPresent()) {
	        	CourseEntity existingEntity = entityOptional.get();
	        	System.out.println(existingEntity.getCourseStatus());
	        	if(existingEntity.getCourseStatus().equals("inactive")) {
	        		 existingEntity.setCourseStatus("active");
	        	}
	        	else {
	        		System.out.println(existingEntity.getCourseStatus());
	        		 existingEntity.setCourseStatus("inactive");
	        	}
//	            existingEntity.setDescription(updatedEntity.getDescription());
	        	System.out.println(existingEntity.getCourseStatus());
	        	CourseEntity savedEntity = courseRepo.save(existingEntity);
	            return new ResponseEntity<>(savedEntity, HttpStatus.OK);
	        } else {
	            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	        }
	    }
	
	
	

}
