package com.application.demo.service;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.application.demo.Dto.assignsubmissions;
import com.application.demo.Dto.resultresponse;
import com.application.demo.entity.AssignmentEntity;
import com.application.demo.entity.CategoryEntity;
import com.application.demo.entity.CourseEntity;
import com.application.demo.entity.UserFullDetails;
import com.application.demo.entity.assignmentsubmEntity;
import com.application.demo.repository.AssignmentRepository;
import com.application.demo.repository.AssignmentSubmissionRepository;
import com.application.demo.repository.CourseRepository;
import com.application.demo.repository.UserFullDetailsRepository;

@Service
public class AssignmentSubmissionService {
	 private String s3BaseUrl = "https://s3-us-east-1.s3.amazonaws.com/";

	  private String bucketName = "elearningsystem";

	  private String folderName = "/lms/";

	  @Autowired
	  private AmazonS3 s3Client;
	  
	  @Autowired
	  private AssignmentRepository assignmentRepository;
	  @Autowired
	  private UserFullDetailsRepository userFullDetailsRepository;
	  @Autowired
	  private CourseRepository courseRepo;
	  @Autowired
	  private AssignmentSubmissionRepository assignmentSubmission;
	  public assignmentsubmEntity markssubmission(String submissionid, String marks) {
		  assignmentsubmEntity submittedassignment=assignmentSubmission.findById(Long.parseLong(submissionid)).get();
		  submittedassignment.setMarks(marks);
		  return assignmentSubmission.save(submittedassignment);
		
	  }
	  public Map<String, String> uploadSubmissionToS3(MultipartFile multipartfile,  String userid, String assignid) {
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
		            Optional<UserFullDetails> user = userFullDetailsRepository.findByEmail(userid);
		            Optional<AssignmentEntity> assignment = assignmentRepository.findById((long) Integer.parseInt(assignid));
		            assignmentsubmEntity submission=new assignmentsubmEntity();
		            submission.setAssignment(assignment.get());
		            submission.setSubuser(user.get());
		            Date currentDate = new Date();
		            submission.setSubmitteddate(currentDate);
		            submission.setFileUrl(s3FileAccessUrl);
		            submission.setFileName(uniqueFileName);
		            user.get().getSubmissionlist().add(submission);
		            assignment.get().getAssignmentsubmissions().add(submission);
		            assignmentSubmission.save(submission);
		            // Create an AssignmentEntity and set the title, description, and file URL
//		            Optional<CourseEntity> course = courseRepository.findById((long) Integer.parseInt(courseId));
//		            AssignmentEntity assignment = new AssignmentEntity();
//		            assignment.setTitle(title);
//		            assignment.setDescription(description);
//		            assignment.setFileUrl(s3FileAccessUrl);
//		            assignment.setFileName(uniqueFileName);
//		            
////		            course.ifPresent(courseOp -> {
////		            	CourseEntity courseOp = course.get();
////		                assignment.setCourse(courseOp);
////		            });
	//
//		            if (course.isPresent()) {
//		                CourseEntity courseOp = course.get();
//		                assignment.setCourse(courseOp);
//		            }
//		            //assignment.setCourse(course);
//		            // Save the AssignmentEntity to the database
//		            assignmentRepository.save(assignment);
		            
		            response.put("fileName", uniqueFileName);
		            //courseRepository.save(course);

		            file.delete();
		        } catch (FileNotFoundException e) {
		            e.printStackTrace();
		        } catch (IOException e) {
		            e.printStackTrace();
		        }
		    }
		    return response;
		}
	  public List<assignsubmissions> getsubmissions(String assignid){
		  
		    AssignmentEntity assignment=assignmentRepository.findById(Long.parseLong(assignid)).get();
			List<UserFullDetails> allusers=assignment.getCourse().getEnrolllist().stream().map(enroll->enroll.getUser()).toList();
			List<assignmentsubmEntity>assignmentsubmissions=assignment.getAssignmentsubmissions();
			List<assignsubmissions> result=new ArrayList<>();
			for(UserFullDetails i:allusers) {
				assignsubmissions res=new assignsubmissions();
				res.setStatus("not submitted");
				for(assignmentsubmEntity j:assignmentsubmissions) {
					if(j.getSubuser().getId().equals(i.getId())) {
						res.setFilename(j.getFileName());
						res.setSubmissionid(j.getId());
						res.setSubmitteddate(j.getSubmitteddate());
						res.setTotalmarks(j.getAssignment().getTotalmarks());
						res.setWeightage(j.getAssignment().getWeightage());
						res.setStatus("submitted");
						if(j.getMarks()!=null) {
							res.setStatus("marks assigned");
							res.setAssignedmarks(j.getMarks());
						}
					}
					
				}
				res.setDept(i.getDepartment().getName());
				res.setEmail(i.getEmail());
				res.setName(i.getName());
				result.add(res);
			}
			return result;
			
	  }
	public List<resultresponse> getresultsforstudents(String courseId,String user) {
		UserFullDetails userdetails = userFullDetailsRepository.findByEmail(user).get();
//		 AssignmentEntity assignment=assignmentRepository.findById(Long.parseLong(assignid)).get();
		List<AssignmentEntity> asssignments= courseRepo.findById(Long.parseLong(courseId)).get().getAssignments();
		List<assignmentsubmEntity>assignmentsubmissionsbystudent=userdetails.getSubmissionlist();
		List<resultresponse> studentresult=new ArrayList<>();
		for(AssignmentEntity i:asssignments) {
			resultresponse res=new resultresponse();
			res.setStatus("assignment not submitted");
			for(assignmentsubmEntity j:assignmentsubmissionsbystudent) {
				if(j.getAssignment().getId().equals(i.getId())) {
					System.out.println("assignment"+j.getAssignment().getId());
					System.out.println(i.getId());
					res.setSubmittedfile(j.getFileName());
					res.setStatus("assignment not evaluated");
					if(j.getMarks()!=null) {
						System.out.println("evaluated"+j.getAssignment().getId());
						System.out.println(i.getId());
						res.setAssignedmarks(j.getMarks());
						res.setStatus("assignment evaluated");
						
					}
					res.setSubmitteddate(j.getSubmitteddate());
				}
				res.setTitle(i.getTitle());
				res.setTotalmarks(i.getTotalmarks());
				res.setWeightage(i.getWeightage());
				res.setFileUrl(i.getFileUrl());
				res.setFileName(i.getFileName());
				res.setDescription(i.getDescription());
				res.setDeadlinedate(i.getDeadlinedate());
				res.setId(i.getId());
			}
			
			studentresult.add(res);
			
		}
		return studentresult;
	}

}
