package com.application.demo.controller;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3;
import com.application.demo.entity.AssignmentEntity;
import com.application.demo.entity.CourseAttachmentsEntity;
import com.application.demo.entity.CourseEntity;
import com.application.demo.repository.AssignmentRepository;
import com.application.demo.repository.CourseAttachmentRepository;
import com.application.demo.repository.CourseRepository;
import com.application.demo.service.CourseAttachmentService;
import com.application.demo.service.S3FileUploadService;



@RestController
@RequestMapping(path = "/courseattach")
public class CourseAttachmentController {
	
	@Autowired
	  private CourseAttachmentService courseAttachmentService;
	  
	  @Autowired
	  private AmazonS3 s3Client;
	  @Autowired
	  private CourseAttachmentRepository courseAttachmentRepository;
	  @Autowired
	  private CourseRepository courseRepo;
	  
	  
	  private String bucketName = "elearningsystem";

	  private String folderName = "/lms/";
	  @PostMapping(value = "/upload")
	  public ResponseEntity<Map<String, String>> uploadFile(
	      @RequestPart(name = "multipartfile", required = true) MultipartFile multipartfile,
	      @RequestParam("title") String title,
	      @RequestParam("description") String description,
	      @RequestParam("id") String courseId
	  ) {
	      try {
	          ResponseEntity<Map<String, String>> responseEntity = courseAttachmentService.uploadCourseAttachmentToS3(multipartfile, title, description, courseId);
	          return ResponseEntity.status(responseEntity.getStatusCode()).body(responseEntity.getBody());
	      } catch (Exception e) {
	          // Log the exception for debugging purposes
	          e.printStackTrace();
	          // Return an error response
	          Map<String, String> errorResponse = new HashMap<>();
	          errorResponse.put("message", "An error occurred while processing the request.");
	          return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
	      }
	  }
	  
	  

@GetMapping("/get-courseattach/{courseId}")
public List<CourseAttachmentsEntity> getFileNamesByCourseId(@PathVariable String courseId) {
//    return s3FileUploadService.getFileNamesByCourseId(courseId);
	CourseEntity c=courseRepo.findById(Long.parseLong(courseId)).get();
//    return courseRepo.findById(Long.parseLong(courseId)).get().getCourseAttachments().filter((attachment)->attachment.isDeleted);
    List<CourseAttachmentsEntity> filteredAttachments = courseRepo.findById(Long.parseLong(courseId))
            .map(course -> course.getCourseAttachments().stream()
                    .filter(attachment -> !attachment.isDeleted())
                    .collect(Collectors.toList())
            )
            .orElse(Collections.emptyList());
    return filteredAttachments;

}

@DeleteMapping("/deleteattachment/{attachmentId}")
public ResponseEntity<?> deleteattachment(@PathVariable String attachmentId) {
	try {
	courseAttachmentService.deleteattachment(Long.parseLong(attachmentId));
	 return ResponseEntity.status(HttpStatus.OK).body("Successfully deleted");
	}
	catch(Exception e) {
		 return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
	}
}


}
