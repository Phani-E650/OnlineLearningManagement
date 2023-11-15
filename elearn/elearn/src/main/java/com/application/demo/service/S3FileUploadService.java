package com.application.demo.service;

import java.util.List;
import java.util.Map;
import org.springframework.web.multipart.MultipartFile;

public interface S3FileUploadService {

  Map<String, String> uploadFileToS3(MultipartFile multipartfile, String title, String description, String courseId);

void deleteFile(Long fileId);

List<String> getFileNamesByCourseId(String courseId);

}
