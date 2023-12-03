package com.application.demo.controller;

import static org.hamcrest.Matchers.is;
import static org.mockito.Mockito.*;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import com.application.demo.entity.CourseEntity;
import com.application.demo.entity.ModuleEntity;
import com.application.demo.repository.CourseRepository;
import com.application.demo.repository.ModuleRepository;
import com.application.demo.service.ModuleService;


@SpringBootTest
@AutoConfigureMockMvc
@ExtendWith(SpringExtension.class)
@ExtendWith(MockitoExtension.class)
class ModulesControllerTests {

    @Autowired
    private static MockMvc mockMvc;

    @MockBean
    private static ModuleService moduleService;

    @MockBean
    private ModuleRepository moduleRepository;

    @MockBean
    private static CourseRepository courseRepository;

    @InjectMocks
    private Modulescontroller modulesController;
  
    @Test
    
    public static void testAddModule() throws Exception {
        // Mocking data
        ModuleEntity moduleEntity = new ModuleEntity();
        moduleEntity.setId(1L);
        moduleEntity.setModulename("TestModule");

        CourseEntity courseEntity = new CourseEntity();
        courseEntity.setId(1L);
        courseEntity.setModuleslist(Collections.singletonList(moduleEntity));

        when(courseRepository.findById(1L)).thenReturn(Optional.of(courseEntity));
        when(moduleService.savemodule(any(ModuleEntity.class))).thenReturn(moduleEntity);

        // Perform the request
        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.post("/modules/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"id\": 1, \"modulename\": \"TestModule\"}")
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andReturn();

        // Verify the response
        String content = result.getResponse().getContentAsString();
        // Add your verification logic based on the expected response

        // Verify that the service method was called
        verify(moduleService, times(1)).savemodule(any(ModuleEntity.class));
    }
}
