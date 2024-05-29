package com.application.demo.service;

import java.io.File;
import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.application.demo.entity.AssignmentEntity;
import com.application.demo.repository.AssignmentRepository;

@Service
public class AssignmentService {
    @Autowired
    private AssignmentRepository assignmentRepository;

    // Save an assignment with a file upload
    @Value("${file.upload.path}")
    private String fileUploadPath;

//    public AssignmentEntity saveAssignment(AssignmentEntity assignment) {
//        MultipartFile pdfFile = assignment.getPdfFile();
//        if (pdfFile != null) {
//            String originalFilename = pdfFile.getOriginalFilename();
//            String filePath = fileUploadPath + originalFilename; // Access path from the property file
//
//            // Save the file to the specified location
//            try {
//                pdfFile.transferTo(new File(filePath));
//                assignment.setPdfFilePath(filePath);
//            } catch (IOException e) {
//                // Handle the exception
//                e.printStackTrace();
//            }
//        }
//
//        return assignmentRepository.save(assignment);
//    }
//    
//    public List<AssignmentEntity> getAllAssignments() {
//        return assignmentRepository.findAll();
//    }
    

    
}

