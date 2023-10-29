package com.application.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.application.demo.entity.CourseEntity;
import com.application.demo.entity.Enrollment;
import com.application.demo.repository.CourseRepository;
import com.application.demo.repository.EnrollmentRepository;
@Service
public class EnrollmentService {
   @Autowired
   EnrollmentRepository enrollRepo;
   @Autowired
	private CourseRepository courseRepo;
	public Enrollment addNewCourse(Enrollment enrollment,String courseid) {
	 CourseEntity course=courseRepo.findById(Long.parseLong(courseid)).get();
	 Enrollment enroll=new Enrollment();
	 enroll.setEnrolledusername(enrollment.getEnrolledusername());
	 enroll.setCourse(course);
	 course.getEnrolllist().add(enroll);
	  return  enrollRepo.save(enroll);
	}
	public List<Enrollment> getAllEnrollUsers(String id) {
		List<Enrollment> enrollers= courseRepo.findById(Long.parseLong(id)).get().getEnrolllist();
		return enrollers;
	}
	public void deleteenroll(Long id) {
		
		enrollRepo.deleteById(id);
	}

}
