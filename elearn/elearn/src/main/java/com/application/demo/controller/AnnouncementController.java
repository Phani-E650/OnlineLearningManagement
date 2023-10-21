package com.application.demo.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.application.demo.entity.AnnouncementEntity;
import com.application.demo.repository.AnnouncementRepository;
import com.application.demo.service.EmailService;

@RestController
@RequestMapping("announcements")
@CrossOrigin("*")
public class AnnouncementController {
    private final AnnouncementRepository announcementRepository;
    
    @Autowired
    private EmailService sendAnnouncement;

    public AnnouncementController(AnnouncementRepository announcementRepository) {
        this.announcementRepository = announcementRepository;
    }

    @PostMapping
    public AnnouncementEntity createAnnouncement(@RequestBody AnnouncementEntity announcement) {
        announcement.setCreatedDate(LocalDateTime.now());
        sendAnnouncement.sendAnnouncementEmail(announcement.getTitle(), announcement.getDescription());
        return announcementRepository.save(announcement);
    }

    @GetMapping
    public List<AnnouncementEntity> getAllAnnouncements() {
        return announcementRepository.findAll();
    }
}

