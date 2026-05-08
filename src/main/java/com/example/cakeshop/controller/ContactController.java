package com.example.cakeshop.controller;

import com.example.cakeshop.dto.ContactRequestDto;
import com.example.cakeshop.entity.ContactMessage;
import com.example.cakeshop.repository.ContactMessageRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/contact")
public class ContactController {

    private final ContactMessageRepository contactMessageRepository;

    public ContactController(ContactMessageRepository contactMessageRepository) {
        this.contactMessageRepository = contactMessageRepository;
    }

    @PostMapping
    public ResponseEntity<Map<String, String>> submit(@Valid @RequestBody ContactRequestDto dto) {
        ContactMessage msg = new ContactMessage();
        msg.setName(dto.getName());
        msg.setEmail(dto.getEmail());
        msg.setMessage(dto.getMessage());
        contactMessageRepository.save(msg);
        return ResponseEntity.ok(Map.of("message", "Thank you! We'll get back to you shortly."));
    }
}
