package com.application.demo.controller;

import java.nio.file.Paths;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.application.demo.entity.AssignmentEntity;
import com.application.demo.service.AssignmentService;

import jakarta.persistence.criteria.Path;

@RestController
@RequestMapping("assignments")
@CrossOrigin("*")
public class AssignmentController {
    @Autowired
    private AssignmentService assignmentService;
    
   

    // Create a new assignment with a file upload
//    @PostMapping("/upload")
//    public AssignmentEntity createAssignmentWithFileUpload(@RequestParam("title") String title,
//                                                    @RequestParam("description") String description,
//                                                    @RequestParam("pdfFile") MultipartFile pdfFile) {
//        AssignmentEntity assignment = new AssignmentEntity();
//        assignment.setTitle(title);
//        assignment.setDescription(description);
//        assignment.setPdfFile(pdfFile);
//        
//        
//
//        return assignmentService.saveAssignment(assignment);
//    }
//    
//    @GetMapping("/assignments")
//    public ResponseEntity<List<AssignmentEntity>> getAllAssignments() {
//        List<AssignmentEntity> assignments = assignmentService.getAllAssignments();
//        
//        return ResponseEntity.ok()
//                .contentType(MediaType.APPLICATION_JSON)
//                .body(assignments);
//    }

    
    
    
    
    
    
    

    
}
