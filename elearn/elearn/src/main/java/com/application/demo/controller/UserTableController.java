package com.application.demo.controller;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.application.demo.entity.UserFullDetails;
import com.application.demo.entity.UserTemp;
import com.application.demo.repository.UserFullDetailsRepository;
import com.application.demo.repository.UserTempRepository;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/table")
public class UserTableController {
	
	@Autowired
    private UserTempRepository userTempRepository;
	@Autowired
    private UserFullDetailsRepository userFullDetailsRepository;
    
	
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
    @GetMapping("/getuserdetails/{email}")
    public UserFullDetails getUserEntities(@PathVariable String email) {
        Optional<UserFullDetails> entityOptional = userFullDetailsRepository.findByEmail(email);
        UserFullDetails response=entityOptional.get();
        return response;
        
    }
	
	
}
