package com.application.demo.controller;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import com.application.demo.Dto.VideoContentDto;
import com.application.demo.entity.ModuleEntity;
import com.application.demo.entity.VideoContent;
import com.application.demo.service.VideoContentService;
import com.fasterxml.jackson.databind.ObjectMapper;

@ExtendWith(SpringExtension.class)
@WebMvcTest(controllers = VideoContentController.class)
public class VideoContentControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private VideoContentService videoContentService;

    @MockBean
    private VideoContentController videoContentController;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void testAddVideoContent_Success() throws Exception {
        // Mock the necessary dependencies
        VideoContentDto videoContentDto = new VideoContentDto();
        videoContentDto.setModuleName("1"); // Set a valid module ID
        videoContentDto.setContentName("Sample Video");

        // Mock the service method to return a successful response
        when(videoContentService.addVideoContent(any(VideoContentDto.class)))
        .thenReturn(null);

        mockMvc.perform(MockMvcRequestBuilders.post("/video-content/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(videoContentDto)))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().string("Video content added successfully."));
    }

    @Test
    public void testAddVideoContent_Conflict() throws Exception {
        // Mock the necessary dependencies
        VideoContentDto videoContentDto = new VideoContentDto();
        videoContentDto.setModuleName("1"); // Set a valid module ID
        videoContentDto.setContentName("Sample Video");

        // Mock the service method to return a conflict response
        when(videoContentService.addVideoContent(any(VideoContentDto.class))).thenReturn(null);

        mockMvc.perform(MockMvcRequestBuilders.post("/video-content/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(videoContentDto)))
                .andExpect(MockMvcResultMatchers.status().isConflict())
                .andExpect(MockMvcResultMatchers.content().string("Video content already exists"));
    }

    @Test
    public void testAddVideoContent_ModuleNotFound() throws Exception {
        // Mock the necessary dependencies
        VideoContentDto videoContentDto = new VideoContentDto();
        videoContentDto.setModuleName("100"); // Set an invalid module ID

        // Mock the service method to return a not acceptable response
        when(videoContentService.addVideoContent(any(VideoContentDto.class))).thenReturn(null);

        mockMvc.perform(MockMvcRequestBuilders.post("/video-content/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(videoContentDto)))
                .andExpect(MockMvcResultMatchers.status().isNotAcceptable())
                .andExpect(MockMvcResultMatchers.content().string("Create a module first and then create a video"));
    }
}
