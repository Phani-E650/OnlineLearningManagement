package com.application.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

//public class EmailService {
//
//}
@Service
public class EmailService {
    @Autowired
    private JavaMailSender javaMailSender;

    public void sendRegistrationEmail(String recipientEmail, String registrationToken) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(recipientEmail);
        message.setSubject("Student Registration");
        message.setText("Click the link below to complete your registration:\n" +
                "http://localhost:4200/registration?email=" + recipientEmail );

        javaMailSender.send(message);
    }
}

