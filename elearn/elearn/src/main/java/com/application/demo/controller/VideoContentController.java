package com.application.demo.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.application.demo.Dto.VideoContentDto;
import com.application.demo.entity.VideoContent;
import com.application.demo.repository.VideoContentRepository;
import com.application.demo.service.VideoContentService;
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/video-content")
public class VideoContentController {

    @Autowired
    private VideoContentService videoContentService;
    
    @Autowired
    private VideoContentRepository videoContentRepository;

    @PostMapping("/add")
    public ResponseEntity<?> addVideoContent(@RequestBody VideoContentDto videoContentDto) {
    	VideoContent exist =videoContentService.findByContentname(videoContentDto);
    	if(exist!=null && exist.getModule().getModulename().equals(videoContentDto.getModuleName())&& exist.getModule().getCoursename().equals(videoContentDto.getCourseName())) {
    		return ResponseEntity.status(HttpStatus.CONFLICT).body("Video content already exists");
    	}
         return ResponseEntity.ok(videoContentService.addVideoContent(videoContentDto));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateVideoContent(@PathVariable Long id, @RequestBody VideoContentDto videoContentDto) {
        Optional<VideoContent> exist1=videoContentRepository.findById(id);
        VideoContentDto sample=new VideoContentDto();
        sample.setCourseName(exist1.get().getModule().getCoursename());
        sample.setModuleName(exist1.get().getModule().getModulename());
        sample.setContentName(videoContentDto.getContentName());
        VideoContent exist=videoContentService.findByContentname(sample);
    	if(exist!=null && exist.getModule().getModulename().equals(exist1.get().getModule().getModulename())&& exist.getModule().getCoursename().equals(exist1.get().getModule().getCoursename())) {
    		return ResponseEntity.status(HttpStatus.CONFLICT).body("Video contentname already exists");
    	}
    	
         return ResponseEntity.ok( videoContentService.updateVideoContent(id, videoContentDto));
    }

    @DeleteMapping("/delete/{id}")
    public void deleteVideoContent(@PathVariable Long id) {
        videoContentService.deleteVideoContent(id);
    }
    @GetMapping("/getcoursecontent")
    public List<VideoContent> getVideoContentsByInstructorCourseModule(
            @RequestParam("instructorName") String instructorName,
            @RequestParam("courseName") String courseName,
            @RequestParam("moduleName") String moduleName) {
        return videoContentService.getVideoContentsByInstructorCourseModule(instructorName, courseName, moduleName);
    }
}
