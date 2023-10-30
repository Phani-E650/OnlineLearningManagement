package com.application.demo.controller;

import java.io.IOException;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.AmazonS3Exception;
import com.amazonaws.services.s3.model.S3Object;
import com.application.demo.service.S3FileUploadService;


@RestController
@RequestMapping(path = "/files")
public class S3FileUploadController {

  @Autowired
  private S3FileUploadService s3FileUploadService;
  
  @Autowired
  private AmazonS3 s3Client;
  
  private String bucketName = "elearningsystem";

  private String folderName = "/lms/";

//  @PostMapping(value = "/upload")
//  public ResponseEntity<Map<String, String>> uploadFile(
//      @RequestPart(name = "multipartfile", required = true) MultipartFile multipartfile) {
//
//    return ResponseEntity.ok(s3FileUploadService.uploadFileToS3(multipartfile));
//  }
//  
  
  @PostMapping(value = "/upload")
  public ResponseEntity<Map<String, String>> uploadFile(
      @RequestPart(name = "multipartfile", required = true) MultipartFile multipartfile,
      @RequestParam("title") String title,
      @RequestParam("description") String description,
      @RequestParam("id") Long courseId
      
  ) {
      return ResponseEntity.ok(s3FileUploadService.uploadFileToS3(multipartfile, title, description,courseId));
  }


  @PostMapping(path = "/delete")
  public void deleteFile(@RequestParam(name = "fileId", required = true) Long fileId) {

    s3FileUploadService.deleteFile(fileId);
  }
  
//  @GetMapping("/download-pdf")
//  public ResponseEntity<byte[]> downloadPDF(@RequestParam String fileName) {
//      try {
//          byte[] pdfBytes = s3Client.getObject(bucketName, folderName + fileName).getObjectContent().readAllBytes();
//          HttpHeaders headers = new HttpHeaders();
//          headers.setContentType(MediaType.APPLICATION_PDF);
//          headers.set("Content-Disposition", "inline; filename=" + fileName);
//          return ResponseEntity.ok().headers(headers).body(pdfBytes);
//      } catch (AmazonS3Exception e) {
//          if (e.getStatusCode() == 404) {
//              // Handle 404 (Not Found) error
//              return ResponseEntity.notFound().build();
//          } else {
//              // Handle other S3 errors
//              return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
//          }
//      } catch (IOException e) {
//          // Handle other exceptions
//          return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
//      }
//  }
  
  
  @GetMapping("/download-pdf")
  public ResponseEntity<byte[]> downloadPDF(@RequestParam String fileName) {
      try {
          S3Object s3Object = s3Client.getObject("elearningsystem", "lms/" + fileName);
          byte[] pdfBytes = s3Object.getObjectContent().readAllBytes();

          HttpHeaders headers = new HttpHeaders();
          headers.setContentType(MediaType.APPLICATION_PDF);
          headers.set("Content-Disposition", "inline; filename=" + fileName);

          return ResponseEntity.ok().headers(headers).body(pdfBytes);
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

  
  
}
