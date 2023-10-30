package com.application.demo.service;

import java.util.Map;
import org.springframework.web.multipart.MultipartFile;

public interface S3FileUploadService {

  Map<String, String> uploadFileToS3(MultipartFile multipartfile, String title, String description, Long courseId);

void deleteFile(Long fileId);

}
