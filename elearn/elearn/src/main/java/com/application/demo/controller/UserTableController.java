package com.application.demo.controller;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.application.demo.Dto.UserFullDetailsDto;
import com.application.demo.Dto.registrationrequest;
import com.application.demo.entity.CourseEntity;
import com.application.demo.entity.UserFullDetails;
import com.application.demo.entity.UserTemp;
import com.application.demo.repository.CategoryRepository;
import com.application.demo.repository.UserFullDetailsRepository;
import com.application.demo.repository.UserTempRepository;

import jakarta.persistence.EntityNotFoundException;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/table")
public class UserTableController {
	
	@Autowired
    private UserTempRepository userTempRepository;
	@Autowired
    private UserFullDetailsRepository userFullDetailsRepository;
	 @Autowired
	 private CategoryRepository categoryrepo;
    
	
	@GetMapping("getdata")
    public List<UserTemp> getAllEntities() {
        return userTempRepository.findAll();
    }
	
    @DeleteMapping("delete/{id}")
    public ResponseEntity<String> deleteEntity(@PathVariable Long id) {
        try {
            // Check if the entity with the given ID exists
            if (!userTempRepository.existsById(id)) {
                return ResponseEntity.notFound().build();
            }

            // Delete the entity
            userTempRepository.deleteById(id);
//            userFullDetailsRepository.deleteById(id);
            return ResponseEntity.ok("Entity with ID " + id + " has been deleted.");
        } catch (Exception e) {
            // Handle any exceptions that may occur during deletion
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("An error occurred while deleting the entity.");
        }
    }
    
    @PutMapping("/update/{id}")
    public ResponseEntity<UserTemp> updateEntity(@PathVariable Long id) {
    	
        Optional<UserTemp> entityOptional = userTempRepository.findById(id);

        if (entityOptional.isPresent()) {
        	UserTemp existingEntity = entityOptional.get();
        	System.out.println(existingEntity.getStatus());
        	if(existingEntity.getStatus().equals("inactive")) {
        		 existingEntity.setStatus("active");
        	}
        	else {
        		System.out.println(existingEntity.getStatus());
        		 existingEntity.setStatus("inactive");
        	}
//            existingEntity.setDescription(updatedEntity.getDescription());
        	System.out.println(existingEntity.getStatus());
            UserTemp savedEntity = userTempRepository.save(existingEntity);
            return new ResponseEntity<>(savedEntity, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
//    @GetMapping("/getuserdetails/{email}")
//    public UserFullDetails getUserEntities(@PathVariable String email) {
//        Optional<UserFullDetails> entityOptional = userFullDetailsRepository.findByEmail(email);
//        UserFullDetails response=entityOptional.get();
//        return response;
//        
//    }
	
	
    
    @GetMapping("/getuserdetails/{email}")
    public ResponseEntity<registrationrequest> getUserEntities(@PathVariable String email) {
        Optional<UserFullDetails> entityOptional = userFullDetailsRepository.findByEmail(email);
        
        if (entityOptional.isPresent()) {
            UserFullDetails response = entityOptional.get();
            
            registrationrequest userprofile=new registrationrequest();
            userprofile.setDept(response.getDepartment().getName());
            userprofile.setDob(response.getDob());
            userprofile.setEmail(response.getEmail());
            userprofile.setName(response.getName());
            userprofile.setPhoneno(response.getPhoneno());
            
           return ResponseEntity.ok(userprofile);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/updateuserdetails/{email}")
    public ResponseEntity<UserFullDetails> updateUserDetails(@PathVariable String email, @RequestBody registrationrequest updatedDetails) {
        Optional<UserFullDetails> entityOptional = userFullDetailsRepository.findByEmail(email);
        
        if (entityOptional.isPresent()) {
            UserFullDetails existingDetails = entityOptional.get();
            
            // Update the existing user details with the new details
            existingDetails.setName(updatedDetails.getName());
//            existingDetails.setDept(updatedDetails.getDept());
            existingDetails.setDepartment(categoryrepo.findById(Long.parseLong(updatedDetails.getDept())).get());
            existingDetails.setPhoneno(updatedDetails.getPhoneno());
            existingDetails.setDob(updatedDetails.getDob());
            
            // Save the updated details to the database
            userFullDetailsRepository.save(existingDetails);
            
            return ResponseEntity.ok(existingDetails);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    
    @PutMapping("/change-password/{userId}")
    public ResponseEntity<String> changePassword(@PathVariable String userId, @RequestBody UserFullDetailsDto changePasswordRequest) {
        try {
        	UserFullDetails user = userFullDetailsRepository.findByEmail(userId)
                    .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + userId));

        	if (!user.getPassword().equals(changePasswordRequest.getCurrentPassword())) {
                throw new IllegalArgumentException("Current password is incorrect");
            }
        	else {

            user.setPassword(changePasswordRequest.getNewPassword());
            userFullDetailsRepository.save(user);
        	}
            return ResponseEntity.ok("Password changed successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error changing password");
        }
    }
        
        @GetMapping("/getstudentcourses/{email}")
        public ResponseEntity<List<CourseEntity>> getstudentcourseEntities(@PathVariable String email) {
            Optional<UserFullDetails> entityOptional = userFullDetailsRepository.findByEmail(email);
            List<CourseEntity>  courses=entityOptional.get().getEnrollcourseslist().stream().map(enroll->enroll.getCourse()).toList();
            if (entityOptional.isPresent()) {
//                UserFullDetails response = entityOptional.get();
                return ResponseEntity.ok(courses);
            } else {
                return ResponseEntity.notFound().build();
            }
        }
    }
   
