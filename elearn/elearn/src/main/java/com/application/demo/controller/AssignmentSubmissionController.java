package com.application.demo.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.application.demo.Dto.assignsubmissions;
import com.application.demo.entity.CategoryEntity;
import com.application.demo.entity.assignmentsubmEntity;
import com.application.demo.repository.AssignmentRepository;
import com.application.demo.service.AssignmentSubmissionService;
@RestController
@RequestMapping("assignmentsubmissions")
@CrossOrigin("*")
public class AssignmentSubmissionController {
	@Autowired
	  private AssignmentRepository assignmentRepository;
	@Autowired
	  private AssignmentSubmissionService assignmentSubmissionService;
	
	 @PostMapping("/markssubmission")
	 public assignmentsubmEntity markssubmission(@RequestParam("submissionid") String submissionid,@RequestParam("marks") String marks) {
		 
	       return assignmentSubmissionService.markssubmission(submissionid,marks);
	 }
	  @PostMapping(value = "/upload-answer")
	  public ResponseEntity<Map<String, String>> uploadsubmission(
	      @RequestPart(name = "answer", required = true) MultipartFile multipartfile,
	      @RequestParam("assignmentIndex") String asignment,
	      @RequestParam("usermail") String user
	      
	  ) {
	      return ResponseEntity.ok(assignmentSubmissionService.uploadSubmissionToS3(multipartfile,user,  asignment));
	  }
	  @GetMapping("/getsubmissions/{assignid}")
	  public List<assignsubmissions> getsubmissionsByassignmentId(@PathVariable String assignid) {
	  	return assignmentSubmissionService.getsubmissions(assignid);
	  }
}
