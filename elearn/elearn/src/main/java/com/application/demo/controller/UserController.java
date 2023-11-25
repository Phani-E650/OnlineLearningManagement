package com.application.demo.controller;

import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.application.demo.Dto.UseTempDto;
import com.application.demo.Dto.registrationrequest;
import com.application.demo.entity.UserFullDetails;
import com.application.demo.entity.UserTemp;
import com.application.demo.repository.CategoryRepository;
import com.application.demo.repository.UserFullDetailsRepository;
import com.application.demo.repository.UserTempRepository;
import com.application.demo.service.EmailService;
import com.application.demo.service.UserService;

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
    
    
    @Autowired
    private UserService userService;
    @Autowired
    private CategoryRepository categoryrepo;


    // Admin creates a student
    @PostMapping("/admin/create-student")
    public ResponseEntity<String> createStudent(@RequestBody UserTemp userTempDto) {
        try {
   
        	System.out.println(userTempDto.getRole());
        	System.out.println(userTempDto.getEmail());
        	System.out.println(userTempDto.getId());
        	userTempDto.setStatus("request sent");
            userTempRepository.save(userTempDto);
            String registrationToken = UUID.randomUUID().toString();

         
            emailService.sendRegistrationEmail(userTempDto.getEmail(), registrationToken);


            return ResponseEntity.status(HttpStatus.CREATED).body("Student registration initiated successfully.");
        } catch (Exception e) {
        	System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred.");
        }
    }

    
    @PostMapping("/student/registration")
    public ResponseEntity<String> completeRegistration(@RequestBody registrationrequest registrationrequest) {
        try {
            // Find the corresponding user_temp entry by email
            UserTemp userTemp = userTempRepository.findByEmail(registrationrequest.getEmail());
            if (userTemp == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
            }
            UserFullDetails userFullDetails=new UserFullDetails();
            userFullDetails.setDepartment(categoryrepo.findById(Long.parseLong(registrationrequest.getDept())).get());
            userFullDetails.setDob(registrationrequest.getDob());
            userFullDetails.setEmail(registrationrequest.getEmail());
            userFullDetails.setName(registrationrequest.getName());
            userFullDetails.setPassword(registrationrequest.getPassword());
            userFullDetails.setPhoneno(registrationrequest.getPhoneno());
            UserFullDetails userFullDetailssaved = userFullDetailsRepository.save(userFullDetails);
            userTemp.setStatus("active");
            userTemp.setUserfulldetails(userFullDetailssaved);
            UserTemp userTempsaved = userTempRepository.save(userTemp);

            // Save the complete user details in the user_full_details table
            userFullDetails.setUsertemp(userTempsaved);

            // Optionally, delete the entry from the user_temp table

            // Return 201 status for successful registration
            return ResponseEntity.status(HttpStatus.CREATED).body("Registration completed successfully.");
        } catch (Exception e) {
            // Return 500 status for internal server error
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred.");
        }
    }

    @PostMapping("/admin/sentmail")
    public ResponseEntity<String> sentMailRequest() {
        try {
        	List<UserTemp> mailsent=userTempRepository.findAll();
        	for(UserTemp temp:mailsent) {
        		if(temp.getStatus().equals("Req Sent")) {
        			String registrationToken = UUID.randomUUID().toString();
        			 emailService.sendRegistrationEmail(temp.getEmail(), registrationToken);
        		}
        	}


            return ResponseEntity.status(HttpStatus.CREATED).body("Mails sent successfully.");
        } catch (Exception e) {
        	System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred.");
        }
    }

    @PostMapping("/send-otp")
    public ResponseEntity<String> sendOtp(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");
        if (userService.sendOtp(email)) {
            return ResponseEntity.ok("OTP sent successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");
        String otp = payload.get("otp");
        String newPassword = payload.get("newPassword");

        if (userService.resetPassword(email, otp, newPassword)) {
            return ResponseEntity.ok("Password reset successful.");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid OTP.");
        }
    }
    
    
    
}

