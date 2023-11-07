package com.application.demo.controller;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.application.demo.Dto.enrollrequest;
import com.application.demo.Dto.enrollresponse;
import com.application.demo.entity.CourseEntity;
import com.application.demo.entity.Enrollment;
import com.application.demo.entity.ModuleEntity;
import com.application.demo.entity.UserFullDetails;
import com.application.demo.repository.CourseRepository;
import com.application.demo.repository.EnrollmentRepository;
import com.application.demo.repository.UserFullDetailsRepository;
import com.application.demo.service.CourseService;
import com.application.demo.service.EnrollmentService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class EnrollmentController {
	@Autowired
	private EnrollmentService enrollService;
	@Autowired
	private UserFullDetailsRepository userfull;
	 @Autowired
	 private EnrollmentRepository enrollRepo;
	 @Autowired
		private CourseRepository courseRepo;
	
	@PostMapping("/addenrollment/{courseid}")
	public ResponseEntity<?> addNewCourse(@RequestBody enrollrequest enroll,@PathVariable String courseid) throws Exception
	{
		Enrollment courseObj = null;
//		String newID = getNewID();
//		enrollment.setEnrollid(newID);
//		List<Enrollment> existenroll=enrollRepo.findByEnrolledusernameAndCoursenameAndInstructorname(enrollment.getEnrolledusername(),enrollment.getCoursename(),enrollment.getInstructorname());
//		List<Enrollment> existenroll= courseRepo.findById(Long.parseLong(courseid)).get().getEnrolllist().stream()
//                .filter(modu -> modu.getEnrolledusername().equals(enrollment.getEnrolledusername()))
//                .collect(Collectors.toList());
//		Optional<UserFullDetails> existingusers= userfull.findByEmail(enrollment.getEnrolledusername());
		Optional<UserFullDetails> existingusers=userfull.findByEmail(enroll.getEnrolledusername());
		if(!(existingusers.isEmpty())) {
		List<Enrollment> existenroll= courseRepo.findById(Long.parseLong(courseid)).get().getEnrolllist().stream()
              .filter(modu -> modu.getUser().getId().equals(existingusers.get().getId()))
              .collect(Collectors.toList());
		if(existenroll.size()>0) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body("User already exists");
		}
		};
		if(existingusers.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not exists");
		}
		
		courseObj = enrollService.addNewCourse(enroll.getEnrolledusername(),courseid);
		return ResponseEntity.ok(courseObj);
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
//	@GetMapping("/getenrolledusers/{email}/{coursename}")
//	public List<Enrollment> getusers(@PathVariable String email,@PathVariable String coursename){
//		return enrollService.getAllEnrollUsers(email,coursename);
//	}
	@GetMapping("/getenrolledusers/{id}")
	public List<enrollresponse> getusers(@PathVariable String id){
		try{
		return enrollService.getAllEnrollUsers(id);
		}
		catch(Exception e){
			return null;
		}
	}
	 @DeleteMapping("/deleteenroll/{id}")
	    public void deleteVideoContent(@PathVariable Long id) {
		 enrollService.deleteenroll(id);
	    }
}
