package com.application.demo.service;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import org.apache.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.application.demo.entity.AssignmentEntity;
import com.application.demo.entity.CourseAttachmentsEntity;
import com.application.demo.entity.CourseEntity;
import com.application.demo.repository.AssignmentRepository;
import com.application.demo.repository.AssignmentSubmissionRepository;
import com.application.demo.repository.CourseAttachmentRepository;
import com.application.demo.repository.CourseRepository;
import com.application.demo.repository.UserFullDetailsRepository;


@Service
public class CourseAttachmentService {


	  private String s3BaseUrl = "https://s3-us-east-1.s3.amazonaws.com/";

	  private String bucketName = "elearningsystem";

	  private String folderName = "/lms/";

	  @Autowired
	  private AmazonS3 s3Client;
	  
	  @Autowired
	  private CourseAttachmentRepository courseAttachmentRepository;
	  
	  
	  
	  @Autowired
	  private CourseRepository courseRepository;

	  public ResponseEntity<Map<String, String>> uploadCourseAttachmentToS3(MultipartFile multipartfile, String title, String description, String courseId) {
		    Map<String, String> response = new HashMap<>();

		    if (multipartfile != null && !multipartfile.isEmpty()) {
		        // Generate a unique file name to avoid overwriting
		        String uniqueFileName = UUID.randomUUID().toString() + "_" + multipartfile.getOriginalFilename();

		        File file = new File(uniqueFileName);

		        try (FileOutputStream fos = new FileOutputStream(file)) {
		            if (!file.exists()) {
		                file.createNewFile();
		            }

		            fos.write(multipartfile.getBytes());
		            fos.flush();

		            /* uploading file to S3 */
		            s3Client.putObject(new PutObjectRequest(bucketName, folderName + "/" + uniqueFileName, file)
		                .withCannedAcl(CannedAccessControlList.PublicRead));

		            
		            String s3FileAccessUrl = s3BaseUrl.concat(bucketName).concat(folderName)
		                .concat(uniqueFileName).replaceAll("\\s", "+");

		            
		            
		            
		            
		            response.put("fileUrl", s3FileAccessUrl);

		            // Create an AssignmentEntity and set the title, description, and file URL
		            Optional<CourseEntity> course = courseRepository.findById((long) Integer.parseInt(courseId));
		            CourseAttachmentsEntity courseAttachments = new CourseAttachmentsEntity();
		            courseAttachments.setTitle(title);
		            courseAttachments.setDescription(description);
		            courseAttachments.setFileUrl(s3FileAccessUrl);
		            courseAttachments.setFileName(uniqueFileName);
		           
//		            course.ifPresent(courseOp -> {
//		            	CourseEntity courseOp = course.get();
//		                assignment.setCourse(courseOp);
//		            });

		            if (course.isPresent()) {
		                CourseEntity courseOp = course.get();
		                courseAttachments.setCourse(courseOp);
		            }
		            //assignment.setCourse(course);
		            // Save the AssignmentEntity to the database
		            CourseAttachmentsEntity savedCourseAttachment = courseAttachmentRepository.save(courseAttachments);
		            
		            response.put("fileName", uniqueFileName);
		            //courseRepository.save(course);
		            course.get().getCourseAttachments().add(savedCourseAttachment);
		            file.delete();
		            response.put("message", "success");
		            
		        } catch (FileNotFoundException e) {
		            e.printStackTrace();
		        } catch (IOException e) {
		            e.printStackTrace();
		        }
		    }
		    return ResponseEntity.status(HttpStatus.SC_CREATED).body(response);

		}
//	  
//	  public void deleteFile(Long fileId) {
//		    // get filename by id from your database
//		  AssignmentEntity a = new AssignmentEntity();
//		  a=assignmentRepository.findById(fileId)
//			      .orElse(null);
//		    String filename = a.getFileName();
//		    String keyName = filename;
//		    s3Client.deleteObject(bucketName, keyName);
//		    assignmentRepository.delete(a);
//		  }
	
	  
	
}
