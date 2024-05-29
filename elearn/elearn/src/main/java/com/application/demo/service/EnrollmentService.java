package com.application.demo.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.application.demo.Dto.enrollresponse;
import com.application.demo.entity.CourseEntity;
import com.application.demo.entity.Enrollment;
import com.application.demo.entity.UserFullDetails;
import com.application.demo.repository.CourseRepository;
import com.application.demo.repository.EnrollmentRepository;
import com.application.demo.repository.UserFullDetailsRepository;
@Service
public class EnrollmentService {
   @Autowired
   EnrollmentRepository enrollRepo;
   @Autowired
	private CourseRepository courseRepo;
   @Autowired
   UserFullDetailsRepository userdetails;
	public Enrollment addNewCourse(String username,String courseid) {
	 CourseEntity course=courseRepo.findById(Long.parseLong(courseid)).get();
	 Enrollment enroll=new Enrollment();
	 UserFullDetails user=userdetails.findByEmail(username).get();
//	 enroll.setEnrolledusername(username);
	 enroll.setUser(user);
	 enroll.setCourse(course);
	 user.getEnrollcourseslist().add(enroll);
	 course.getEnrolllist().add(enroll);
	  return  enrollRepo.save(enroll);
	}
	public List<enrollresponse> getAllEnrollUsers(String id) {
		 CourseEntity course=courseRepo.findById(Long.parseLong(id)).get();
		 List<Enrollment> enr=course.getEnrolllist();
		List<UserFullDetails> enrollers= courseRepo.findById(Long.parseLong(id)).get().getEnrolllist().stream().map(enroll->enroll.getUser()).toList();
		List<Enrollment> enrollment=courseRepo.findById(Long.parseLong(id)).get().getEnrolllist();
		 List<enrollresponse> enrollerresponse= new ArrayList<>();
		 for(UserFullDetails i:enrollers) {
			 enrollresponse enroll=new enrollresponse();
			 enroll.setId(i.getId());
			 enroll.setDept(i.getDepartment().getName());
			 enroll.setEmail(i.getEmail());
			 enroll.setName(i.getName());
			 for(Enrollment j:enrollment) {
				 if(j.getUser().getId().equals(i.getId()))
				  enroll.setEnrollid(j.getEnrollid());
			 }
			 enrollerresponse.add(enroll);
		 }
		return enrollerresponse;
	}
	public void deleteenroll(Long id) {
		
		enrollRepo.deleteById(id);
	}
   public List<String>findAllEmails(Long courseid) {
	   List<String> allmails= courseRepo.findById(courseid).get().getEnrolllist().stream()
	              .map(modu -> modu.getUser().getEmail())
	              .collect(Collectors.toList());
	   return allmails;
   }
}
