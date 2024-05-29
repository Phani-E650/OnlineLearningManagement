package com.application.demo.controller;

import java.io.IOException;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.HttpMethod;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.AmazonS3Exception;
import com.amazonaws.services.s3.model.GeneratePresignedUrlRequest;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.amazonaws.util.IOUtils;
import com.application.demo.Dto.assignsubmissions;
import com.application.demo.Dto.assignsubrequest;
import com.application.demo.entity.AssignmentEntity;
import com.application.demo.entity.CourseAttachmentsEntity;
import com.application.demo.entity.CourseEntity;
import com.application.demo.entity.UserFullDetails;
import com.application.demo.repository.AssignmentRepository;
import com.application.demo.repository.CourseRepository;
import com.application.demo.service.S3FileUploadService;


@RestController
@RequestMapping(path = "/files")
public class AssignmentController {

  @Autowired
  private S3FileUploadService s3FileUploadService;
  
  @Autowired
  private AmazonS3 s3Client;
  @Autowired
  private AssignmentRepository assignmentRepository;
  @Autowired
  private CourseRepository courseRepo;
  
  
  private String bucketName = "elearningsystem";

  private String folderName = "/lms/";

  @PostMapping(value = "/upload")
  public ResponseEntity<?> uploadFile(
      @RequestPart(name = "multipartfile", required = true) MultipartFile multipartfile,
      @RequestParam("title") String title,
      @RequestParam("description") String description,
      @RequestParam("id") String courseId,
      @RequestParam("marks") String marks,
      @RequestParam("weightage") String weightage,
      @RequestParam("deadlinedate") String deadlinedate
  ) {
	  
	  List<AssignmentEntity> totalassignment=courseRepo.findById(Long.parseLong(courseId)).get().getAssignments();
	  int totalweightage=0;
	  for(AssignmentEntity i:totalassignment) {
		  totalweightage=totalweightage+Integer.parseInt(i.getWeightage());
	  }
	  if(totalweightage+Integer.parseInt(weightage)>100) {
		  int remainingweightage=100-totalweightage;
		  return ResponseEntity.status(HttpStatus.CONFLICT).body("weightage is above 100 and remaining weightage is "+remainingweightage);
	  }
      ResponseEntity<Map<String, String>> result = s3FileUploadService.uploadFileToS3(multipartfile, title, description, courseId, marks, weightage, deadlinedate);

      
          // Return 201 Created if the operation is successful
          return result;
     
  }

  @PostMapping(path = "/delete")
  public void deleteFile(@RequestParam(name = "fileId", required = true) Long fileId) {

    s3FileUploadService.deleteFile(fileId);
  }
 
  
  @GetMapping("/download-pdf")
  public ResponseEntity<?> downloadPDF(@RequestParam String fileName) {
      try {
 
    	
          S3Object s3Object = s3Client.getObject("elearningsystem", "/lms//" + fileName);
//          byte[] pdfBytes = s3Object.getObjectContent().readAllBytes();
//
//          HttpHeaders headers = new HttpHeaders();
//          headers.setContentType(MediaType.APPLICATION_PDF);
//          headers.set("Content-Disposition", "inline; filename=" + fileName);
//+
          
//          return ResponseEntity.ok().headers(headers).body(pdfBytes);
          S3ObjectInputStream objectcontent= s3Object.getObjectContent();
//            byte[] pdfBytes = s3Object.getObjectContent();
            byte[] arrayBytes=IOUtils.toByteArray(objectcontent);
            ByteArrayResource resourse=new ByteArrayResource(arrayBytes);
            return ResponseEntity.ok()
            		.contentLength(arrayBytes.length)
            		.header("content-type","application/octet-stream")
            		.header("content-disposition","attachment;filename=\""+fileName+"\"")
            		.body(resourse);
            
      } catch (AmazonS3Exception e) {
          if (e.getStatusCode() == 404) {
              // Handle 404 (Not Found) error
              return ResponseEntity.notFound().build();
          } else {
              // Handle other S3 errors
              return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
          }
      } catch (IOException e) {
          // Handle other exceptions
          return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
      }
  }
  
  
  
  

@GetMapping("/find-assignment/{courseId}")
public List<AssignmentEntity> getFileNamesByCourseId(@PathVariable String courseId) {
//    return s3FileUploadService.getFileNamesByCourseId(courseId);
	CourseEntity c=courseRepo.findById(Long.parseLong(courseId)).get();
//    return courseRepo.findById(Long.parseLong(courseId)).get().getAssignments();
    
    List<AssignmentEntity> filteredAssignments = courseRepo.findById(Long.parseLong(courseId))
            .map(course -> course.getAssignments().stream()
                    .filter(attachment -> !attachment.isDeleted())
                    .collect(Collectors.toList())
            )
            .orElse(Collections.emptyList());
    return filteredAssignments;
    
}
@DeleteMapping("/deleteassignment/{assignmentId}")
public ResponseEntity<?> deleteattachment(@PathVariable String assignmentId) {
	try {
		s3FileUploadService.deleteassignment(Long.parseLong(assignmentId));
	 return ResponseEntity.status(HttpStatus.OK).body("Successfully deleted");
	}
	catch(Exception e) {
		 return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
	}
}


  
}
