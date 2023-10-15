package com.application.demo.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class CourseContentController {
	@Value("${upload.path}")
    private String uploadPath;

    @PostMapping("/upload")
    public ResponseEntity<String> handleFileUpload(@RequestParam("file") MultipartFile file) {
        try {
            // Check if the file is not empty
            if (!file.isEmpty()) {
                // Generate a unique file name
                String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();

                // Construct the file path
                Path path = Paths.get(uploadPath, fileName);

                // Save the file to the server
                Files.write(path, file.getBytes());

                // Return a success message
                return ResponseEntity.ok("File uploaded successfully");
            } else {
                return ResponseEntity.badRequest().body("File is empty");
            }
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error uploading file");
        }
    }
}
