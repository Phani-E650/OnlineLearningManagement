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
import com.application.demo.entity.UserTemp;
import com.application.demo.repository.LoginRepository;
import com.application.demo.repository.UserTempRepository;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class LoginController {

    @Autowired
    private LoginRepository userDetailsRepository;
    @Autowired
    private UserTempRepository userTempRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDto request) {
        UserFullDetails user = userDetailsRepository.findByEmail(request.getEmail());
        UserTemp userdetails = null;

        if (user != null && user.getPassword().equals(request.getPassword())) {
            userdetails = userTempRepository.findByEmail(request.getEmail());
            return ResponseEntity.ok(userdetails);
        } else {
            // Return a response indicating invalid credentials
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }
    }

}
