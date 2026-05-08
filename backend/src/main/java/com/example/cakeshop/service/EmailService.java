package com.example.cakeshop.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${app.base-url}")
    private String baseUrl;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendVerificationEmail(String toEmail, String fullName, String token) {
        String verificationLink = baseUrl + "/verify-email?token=" + token;

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("CakeShop – Confirm your email address");
        message.setText(
                "Hi " + fullName + ",\n\n" +
                "Thank you for registering at CakeShop!\n\n" +
                "Please click the link below to confirm your email address. " +
                "The link expires in 24 hours.\n\n" +
                verificationLink + "\n\n" +
                "If you did not create an account, you can safely ignore this email.\n\n" +
                "The CakeShop Team"
        );

        mailSender.send(message);
    }
}
