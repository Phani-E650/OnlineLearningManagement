package com.application.demo.controller;

import java.util.UUID;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.application.demo.Dto.UseTempDto;
import com.application.demo.entity.UserFullDetails;
import com.application.demo.entity.UserTemp;
import com.application.demo.repository.UserFullDetailsRepository;
import com.application.demo.repository.UserTempRepository;
import com.application.demo.service.EmailService;

//public class UserController {
//
//}
@RestController
@RequestMapping("/api")
public class UserController {
    @Autowired
    private UserTempRepository userTempRepository;

    @Autowired
    private UserFullDetailsRepository userFullDetailsRepository;
    @Autowired
    ModelMapper modelMapper;
    @Autowired
    private EmailService emailService;

    // Admin creates a student
    @PostMapping("/admin/create-student")
    public ResponseEntity<String> createStudent(@RequestBody UserTemp userTempDto) {
        try {
            // Save the email and role in the user_temp table
//        	System.out.println(userTempDto.getRole());
//        	System.out.println(userTempDto.getEmail());
//        	System.out.println(userTempDto.getId());
//        	UserTemp a=modelMapper.map(userTempDto, UserTemp.class);
        	System.out.println(userTempDto.getRole());
        	System.out.println(userTempDto.getEmail());
        	System.out.println(userTempDto.getId());
        	userTempDto.setStatus("Req Sent");
            userTempRepository.save(userTempDto);
            String registrationToken = UUID.randomUUID().toString();

            // Save the email and role in the user_temp table along with the registration token
            //userTemp.setRegistrationToken(registrationToken);
            // Send an email to the student with the registration link
            emailService.sendRegistrationEmail(userTempDto.getEmail(), registrationToken);

            // Send an email to the student with a link to the registration page,
            // including the email and a unique token or link

            return ResponseEntity.status(HttpStatus.CREATED).body("Student registration initiated successfully.");
        } catch (Exception e) {
        	System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred.");
        }
    }

    // Student completes registration
//    @PostMapping("/student/registration")
//    public ResponseEntity<String> completeRegistration(@RequestBody UserFullDetails userFullDetails) {
//        try {
//            // Find the corresponding user_temp entry by email
//            UserTemp userTemp = userTempRepository.findByEmail(userFullDetails.getEmail());
//            if (userTemp == null) {
//                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
//            }
//
//            // Save the complete user details in the user_full_details table
//            userFullDetailsRepository.save(userFullDetails);
//
//            // Optionally, delete the entry from the user_temp table
//
//            return ResponseEntity.status(HttpStatus.CREATED).body("Registration completed successfully.");
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred.");
//        }
//    }
    
    
    @PostMapping("/student/registration")
    public ResponseEntity<String> completeRegistration(@RequestBody UserFullDetails userFullDetails) {
        try {
            // Find the corresponding user_temp entry by email
            UserTemp userTemp = userTempRepository.findByEmail(userFullDetails.getEmail());
            if (userTemp == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
            }
            userTemp.setStatus("active");
            userTempRepository.save(userTemp);
            // Save the complete user details in the user_full_details table
            userFullDetailsRepository.save(userFullDetails);

            // Optionally, delete the entry from the user_temp table

            return ResponseEntity.status(HttpStatus.CREATED).body("Registration completed successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred.");
        }
    }


    
    
    
    
}

