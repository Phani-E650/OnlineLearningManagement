package com.application.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.application.demo.repository.EnrollmentRepository;

//public class EmailService {
//
//}
@Service
public class EmailService {
    @Autowired
    private JavaMailSender javaMailSender;
    
    @Autowired
    private EnrollmentRepository enrollmentRepository;

    public void sendRegistrationEmail(String recipientEmail, String registrationToken) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(recipientEmail);
        message.setSubject("Student Registration");
        message.setText("Click the link below to complete your registration:\n" +
                "http://localhost:4200/registration?email=" + recipientEmail );

        javaMailSender.send(message);
    }
    
    public void sendAnnouncementEmail(String title, String description) {
        List<String> userEmails = enrollmentRepository.findAllEmails(); // Implement this method in your repository

        for (String email : userEmails) {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(email);
            message.setSubject("Announcement: " + title);
            message.setText("Dear User,\n\n" + description + "\n\nBest regards,\n Illinois state university");
            

            
            javaMailSender.send(message);
        }
    }
    
}

