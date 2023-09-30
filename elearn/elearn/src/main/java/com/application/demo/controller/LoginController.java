package com.application.demo.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.application.demo.Dto.LoginDto;
import com.application.demo.entity.UserFullDetails;
import com.application.demo.repository.LoginRepository;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class LoginController {

    @Autowired
    private LoginRepository userDetailsRepository;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginDto request) {
        UserFullDetails user = userDetailsRepository.findByEmail(request.getEmail());

        if (user != null && user.getPassword().equals(request.getPassword())) {
            
            return ResponseEntity.ok(user.getDept());
        } else {
            
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }
}
