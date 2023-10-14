package com.application.demo.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.application.demo.entity.CourseEntity;
import com.application.demo.service.CourseService;


@CrossOrigin(origins = "http://localhost:4200")


@RestController

public class CourseController {
	
	@Autowired
	private CourseService courseService;
	
	
	@PostMapping("/addCourse")
	public CourseEntity addNewCourse(@RequestBody CourseEntity course) throws Exception
	{
		CourseEntity courseObj = null;
		String newID = getNewID();
		course.setCourseId(newID);
		
		courseObj = courseService.addNewCourse(course);
		return courseObj;
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
	
	
	

}
