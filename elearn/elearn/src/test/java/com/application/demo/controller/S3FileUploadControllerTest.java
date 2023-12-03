package com.application.demo.controller;

import static org.mockito.Mockito.*;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import com.application.demo.service.S3FileUploadService;

@ExtendWith(SpringExtension.class)
@WebMvcTest(controllers = AssignmentController.class)
@AutoConfigureMockMvc

public class S3FileUploadControllerTest {

    @Autowired
    private static MockMvc mockMvc;

    @MockBean
    private static S3FileUploadService s3FileUploadService;

    // Test for uploadFile API success scenario
    @Test
    public static void testUploadFile_Success() throws Exception {
        // Mock the necessary dependencies
        when(s3FileUploadService.uploadFileToS3(any(), any(), any(), any(), any(), any(), any()))
                .thenReturn(ResponseEntity.status(HttpStatus.OK).build());

        mockMvc.perform(MockMvcRequestBuilders.multipart("/files/upload")
                .file(new MockMultipartFile("multipartfile", "C://Users//phani//Downloads//users.xlsx", "text/plain", "file content".getBytes()))
                .param("title", "Sample Title")
                .param("description", "Sample Description")
                .param("id", "1")
                .param("marks", "100")
                .param("weightage", "20")
                .param("deadlinedate", "2023-01-01"))
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andExpect(MockMvcResultMatchers.content().string("hh"));
    }

    // Test for uploadFile API failure scenario
    @Test
    public static void testUploadFile_Failure() throws Exception {
        // Mock the necessary dependencies to simulate an error during file upload
        when(s3FileUploadService.uploadFileToS3(any(), any(), any(), any(), any(), any(), any()))
                .thenReturn(null);

        mockMvc.perform(MockMvcRequestBuilders.multipart("/files/upload")
                .file(new MockMultipartFile("multipartfile", "filename.txt", "text/plain", "file content".getBytes()))
                .param("title", "Sample Title")
                .param("description", "Sample Description")
                .param("id", "1")
                .param("marks", "100")
                .param("weightage", "120") // Intentionally causing a conflict
                .param("deadlinedate", "2023-01-01"))
                .andExpect(MockMvcResultMatchers.status().isConflict())
                .andExpect(MockMvcResultMatchers.content().string("hh"));
    }

    // Repeat the above structure for other APIs with success and failure scenarios.
}
