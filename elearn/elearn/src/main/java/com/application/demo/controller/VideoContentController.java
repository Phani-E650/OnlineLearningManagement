package com.application.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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
import com.application.demo.service.VideoContentService;
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/video-content")
public class VideoContentController {

    @Autowired
    private VideoContentService videoContentService;

    @PostMapping("/add")
    public VideoContent addVideoContent(@RequestBody VideoContentDto videoContentDto) {
        return videoContentService.addVideoContent(videoContentDto);
    }

    @PutMapping("/update/{id}")
    public VideoContent updateVideoContent(@PathVariable Long id, @RequestBody VideoContentDto videoContentDto) {
        return videoContentService.updateVideoContent(id, videoContentDto);
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
