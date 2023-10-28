package com.application.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.application.demo.entity.CourseEntity;
import com.application.demo.entity.Enrollment;
import com.application.demo.repository.EnrollmentRepository;
@Service
public class EnrollmentService {
   @Autowired
   EnrollmentRepository enrollRepo;
	public Enrollment addNewCourse(Enrollment enrollment) {
	  return  enrollRepo.save(enrollment);
	}
	public List<Enrollment> getAllEnrollUsers(String email,String coursename) {
		// TODO Auto-generated method stub
		List<Enrollment> enrollers=enrollRepo.findByInstructornameAndCoursename(email, coursename);
		
		return enrollers;
	}
	public void deleteenroll(Long id) {
		
		enrollRepo.deleteById(id);
	}

}
