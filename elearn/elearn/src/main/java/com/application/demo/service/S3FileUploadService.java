package com.application.demo.service;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import com.application.demo.Dto.assignsubmissions;
import com.application.demo.entity.AssignmentEntity;

public interface S3FileUploadService {

  ResponseEntity<Map<String, String>> uploadFileToS3(MultipartFile multipartfile, String title, String description, String courseId,String marks,String weightage,String deadlinedate);

void deleteFile(Long fileId);

List<String> getFileNamesByCourseId(String courseId);

void deleteassignment(long parseLong);

//Map<String, String> uploadSubmissionToS3(MultipartFile multipartfile,  String userid, String assignid);
//
//List<assignsubmissions> getsubmissions(String assignid);

}
