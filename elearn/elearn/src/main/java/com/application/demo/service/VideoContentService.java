package com.application.demo.service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.application.demo.Dto.VideoContentDto;
import com.application.demo.entity.ModuleEntity;
import com.application.demo.entity.VideoContent;
import com.application.demo.repository.ModuleRepository;
import com.application.demo.repository.VideoContentRepository;

@Service
public class VideoContentService {

    @Autowired
    private VideoContentRepository videoContentRepository;

    @Autowired
    private ModuleService moduleService;
    
    @Autowired
	ModuleRepository modulerepo;

    public VideoContent addVideoContent(VideoContentDto videoContentDto) {
    	
    	ModuleEntity module = moduleService.findModule(videoContentDto.getModuleName(), videoContentDto.getCourseName(), videoContentDto.getInstructorName());
        
        if (module == null) {
            // Handle the case when the module doesn't exist
            // You can return an error or handle it as needed
            return null;
        }

        VideoContent videoContent = new VideoContent();
        videoContent.setContentname(videoContentDto.getContentName());
        videoContent.setVideourl(videoContentDto.getVideoUrl());
        videoContent.setModule(module);
        videoContent = videoContentRepository.save(videoContent);
        module.getVideoContents().add(videoContent);
       modulerepo.save(module);
        return videoContent;
    }

    public VideoContent updateVideoContent(Long id, VideoContentDto videoContentDto) {
        Optional<VideoContent> optionalVideoContent = videoContentRepository.findById(id);

        if (!optionalVideoContent.isPresent()) {
            // Handle the case when the video content doesn't exist
            // You can return an error or handle it as needed
            return null;
        }

        VideoContent videoContent = optionalVideoContent.get();
        ModuleEntity module = moduleService.findModule(videoContentDto.getModuleName(), videoContentDto.getCourseName(), videoContentDto.getInstructorName());

        if (module == null) {
            // Handle the case when the module doesn't exist
            // You can return an error or handle it as needed
            return null;
        }

        videoContent.setContentname(videoContentDto.getContentName());
        videoContent.setVideourl(videoContentDto.getVideoUrl());
        videoContent.setModule(module);

        return videoContentRepository.save(videoContent);
    }

    public void deleteVideoContent(Long id) {
        videoContentRepository.deleteById(id);
    }
    public List<VideoContent> getVideoContentsByInstructorCourseModule(String instructorName, String courseName, String moduleName) {
        ModuleEntity module = moduleService.findModule(moduleName,courseName,instructorName);
          if (module != null) {
              return module.getVideoContents();
          } else {
              return Collections.emptyList(); // Author not found
          }
    	
    	
//        return videoContentRepository.findVideoContentsByInstructorCourseModule(instructorName, courseName, moduleName);
    }
}
