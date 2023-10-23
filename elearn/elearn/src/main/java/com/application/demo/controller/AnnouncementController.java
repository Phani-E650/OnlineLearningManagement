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

import com.application.demo.Dto.AnnouncementsDto;
import com.application.demo.entity.AnnouncementEntity;
import com.application.demo.entity.CourseEntity;
import com.application.demo.repository.AnnouncementRepository;
import com.application.demo.repository.CourseRepository;
import com.application.demo.service.EmailService;

@RestController
@RequestMapping("announcements")
@CrossOrigin("*")
public class AnnouncementController {
    private final AnnouncementRepository announcementRepository;
    
    @Autowired
    private EmailService sendAnnouncement;
    
    @Autowired
    private  CourseRepository courseRepository;

    public AnnouncementController(AnnouncementRepository announcementRepository) {
        this.announcementRepository = announcementRepository;
    }
//
//    @PostMapping
//    public AnnouncementEntity createAnnouncement(@RequestBody AnnouncementEntity announcement) {
//        announcement.setCreatedDate(LocalDateTime.now());
//        sendAnnouncement.sendAnnouncementEmail(announcement.getTitle(), announcement.getDescription());
//        return announcementRepository.save(announcement);
//    }
    
    
    
    @PostMapping("/add")
    public AnnouncementEntity addAnnouncement(
            @RequestBody AnnouncementsDto announcementRequest) {
        // Find the course based on course name and professor name
        CourseEntity course = courseRepository.findByCourseNameAndProfessorName(
                announcementRequest.getCourseName(), announcementRequest.getProfessorName());

        if (course == null) {
            // Handle the case where the course doesn't exist
            // You can return an error response or throw an exception
        	return null;
        } else {
            AnnouncementEntity announcement = new AnnouncementEntity();
            announcement.setTitle(announcementRequest.getTitle());
            announcement.setDescription(announcementRequest.getDescription());
            announcement.setCreatedDate(LocalDateTime.now());
            announcement.setCourse(course);

           
            
            
            // Save the announcement
            AnnouncementEntity savedAnnouncement = announcementRepository.save(announcement);
            course.getAnnouncements().add(savedAnnouncement);
            courseRepository.save(course);
            // Send the announcement email
            sendAnnouncement.sendAnnouncementEmail(savedAnnouncement.getTitle(), savedAnnouncement.getDescription());
            return savedAnnouncement;
        }
		
    }

    @GetMapping
    public List<AnnouncementEntity> getAllAnnouncements() {
        return announcementRepository.findAll();
    }
}

