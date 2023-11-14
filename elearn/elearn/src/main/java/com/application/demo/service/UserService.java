package com.application.demo.service;

import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.application.demo.entity.UserFullDetails;
import com.application.demo.repository.UserFullDetailsRepository;

@Service
public class UserService {

	@Autowired
    private UserFullDetailsRepository userFullDetailsRepository;
    
    @Autowired
    private JavaMailSender javaMailSender;

    public boolean sendOtp(String email) {
        Optional<UserFullDetails> userOptional = userFullDetailsRepository.findByEmail(email);
        if (userOptional.isPresent()) {
        	UserFullDetails user = userOptional.get();
            String otp = generateOtp();
            user.setOtp(otp);
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(email);
            message.setSubject("Otp For changing the password");
            message.setText("Please do not share your otp with anyone \n" +
                    "Your otp is ?otp=" + otp );

            javaMailSender.send(message);

            userFullDetailsRepository.save(user);
            return true;
        }
        return false;
    }

    public boolean resetPassword(String email, String otp, String newPassword) {
        Optional<UserFullDetails> userOptional = userFullDetailsRepository.findByEmailAndOtp(email, otp);
        if (userOptional.isPresent()) {
        	UserFullDetails user = userOptional.get();
            user.setPassword(newPassword);
            user.setOtp(null); // Clear OTP after successful password reset
            userFullDetailsRepository.save(user);
            return true;
        }
        return false;
    }

    private String generateOtp() {
    	Random random = new Random();
        int otpNumber = 100000 + random.nextInt(900000);

        return String.valueOf(otpNumber);
    }
}
