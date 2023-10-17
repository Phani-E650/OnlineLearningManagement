package com.application.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.application.demo.entity.CourseEntity;
import com.application.demo.entity.Enrollment;
import com.application.demo.service.CourseService;
import com.application.demo.service.EnrollmentService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class EnrollmentController {
	@Autowired
	private EnrollmentService enrollService;
	
	@PostMapping("/addenrollment")
	public Enrollment addNewCourse(@RequestBody Enrollment enrollment) throws Exception
	{
		Enrollment courseObj = null;
//		String newID = getNewID();
//		enrollment.setEnrollid(newID);
		
		courseObj = enrollService.addNewCourse(enrollment);
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
	@GetMapping("/getenrolledusers/{email}/{coursename}")
	public List<Enrollment> getusers(@PathVariable String email,@PathVariable String coursename){
		return enrollService.getAllEnrollUsers(email,coursename);
	}
}
