package com.application.demo.controller;
import static org.mockito.Mockito.*;

import java.util.Date;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import com.application.demo.Dto.addcourserequest;
import com.application.demo.controller.CourseController;
import com.application.demo.entity.CourseEntity;
import com.application.demo.service.CourseService;
import com.fasterxml.jackson.databind.ObjectMapper;

@ExtendWith(MockitoExtension.class)
@WebMvcTest(controllers = CourseController.class)
public class CourseControllerTest {

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CourseService courseService;

    @MockBean
    private CourseController courseController;

    @Test
    public void testAddNewCourse_Success() throws Exception {
        // Mock the necessary dependencies
        addcourserequest request = new addcourserequest();
        request.setCourseName("TestCourse");
        request.setProfessorName("TestProfessor");
        request.setCategory("TestCategory");
        request.setStartDate(new Date());
        request.setEndDate(new Date());

        when(courseService.findCourseByCourseNameAndProfessorNameAndCategoryName(anyString(), anyString(), anyString())).thenReturn(null);
        when(courseService.addNewCourse(any())).thenReturn(new CourseEntity());

        // Perform the test
        mockMvc.perform(MockMvcRequestBuilders.post("/addCourse")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    public void testAddNewCourse_Conflict() throws Exception {
        // Mock the necessary dependencies
        addcourserequest request = new addcourserequest();
        request.setCourseName("TestCourse");
        request.setProfessorName("TestProfessor");
        request.setCategory("TestCategory");
        request.setStartDate(new Date());
        request.setEndDate(new Date());

        when(courseService.findCourseByCourseNameAndProfessorNameAndCategoryName(anyString(), anyString(), anyString())).thenReturn(new CourseEntity());

        // Perform the test
        mockMvc.perform(MockMvcRequestBuilders.post("/addCourse")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(MockMvcResultMatchers.status().isConflict());
    }
}
