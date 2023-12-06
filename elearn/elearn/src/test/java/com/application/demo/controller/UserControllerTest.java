package com.application.demo.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import com.amazonaws.services.s3.AmazonS3;
import com.application.demo.Dto.UseTempDto;
import com.application.demo.entity.CategoryEntity;
import com.application.demo.repository.AssignmentRepository;
import com.application.demo.repository.CategoryRepository;
import com.application.demo.repository.CourseRepository;
import com.application.demo.repository.UserFullDetailsRepository;
import com.application.demo.repository.UserTempRepository;
import com.application.demo.service.CategoryService;
import com.application.demo.service.EmailService;
import com.application.demo.service.S3FileUploadService;
import com.application.demo.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;

@ExtendWith(SpringExtension.class)
@WebMvcTest(controllers = UserController.class)
@AutoConfigureMockMvc
public class UserControllerTest {
	
	@Autowired
	private ObjectMapper objectMapper;


    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private EmailService emailService;

    @MockBean
    private UserService userService;
    
    @MockBean
    private UserTempRepository userTempRepository;
    
    @MockBean
    private UserFullDetailsRepository userFullDetailsRepository;
    
    
    @InjectMocks
    private CategoryService categoryService;
    
    
    
    @MockBean
    private CategoryRepository categoryRepository;

    // Test for createStudent API success scenario
    @Test
    public void testCreateStudent_Success() throws Exception {
        // Mock the necessary dependencies
        

        mockMvc.perform(MockMvcRequestBuilders.post("/api/admin/create-student")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{ \"email\": \"talapaneni142@gmail.com\", \"role\": \"teacher\" }"))
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andExpect(MockMvcResultMatchers.content().string("Student registration initiated successfully."));
    }

    // Test for createStudent API failure scenario
    @Test
    public void testCreateStudent_Failure() throws Exception {
        // Mock the necessary dependencies to simulate an error during registration

        mockMvc.perform(MockMvcRequestBuilders.post("/api/admin/create-student")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{ \"email\": \"talapaneni142@gmail.com\", \"role\": \"teacher\" }"))
                .andExpect(MockMvcResultMatchers.status().isInternalServerError())
                .andExpect(MockMvcResultMatchers.content().string("An error occurred."));
    }
    
    
    
   
    
    

//    @Test
//    void testAddCategory_Success() throws Exception {
//    	CategoryEntity cseCategory = new CategoryEntity();
//    	cseCategory.setName("CSE");
//
//    	CategoryEntity summerCategory = new CategoryEntity();
//    	summerCategory.setName("SUMMER");
//
//        // Mock the necessary dependencies
//        when(categoryRepository.save(any())).thenReturn(cseCategory);
//
//        // Invoke the service method
//        String content = "{ \"name\": \"CSE\" }";
//
//        mockMvc.perform(MockMvcRequestBuilders.post("/category/addcategory")
//                .contentType(MediaType.APPLICATION_JSON)
//                .content(content))
//                .andExpect(MockMvcResultMatchers.status().isOk());
//
//        // Verify that the repository save method is called
//        verify(categoryRepository, times(1)).save(any());
//    }
//
//    @Test
//    void testAddSubcategory_Success() throws Exception {
//    	
//    	CategoryEntity cseCategory = new CategoryEntity();
//    	cseCategory.setName("CSE");
//
//    	CategoryEntity summerCategory = new CategoryEntity();
//    	summerCategory.setName("SUMMER");
//
//        // Mock the necessary dependencies
//        when(categoryRepository.findByName(any())).thenReturn(summerCategory);
//        when(categoryRepository.save(any())).thenReturn(summerCategory);
//
//        // Invoke the service method
//        String content = "{ \"name\": \"SUMMER\" }";
//
//        mockMvc.perform(MockMvcRequestBuilders.post("/category/parentCategoryId/subcategories")
//                .contentType(MediaType.APPLICATION_JSON)
//                .content(content))
//                .andExpect(MockMvcResultMatchers.status().isOk());
//
//        // Verify that the repository findByName and save methods are called
//        verify(categoryRepository, times(1)).findByName(any());
//        verify(categoryRepository, times(1)).save(any());
//    }
    
    
    
//
//    @MockBean
//    private  S3FileUploadService s3FileUploadService;
//    
//    @MockBean
//    private AmazonS3 s3Client;
//    
//    @MockBean
//    private AssignmentRepository assignmentRepository;
//    
//    @MockBean
//    private CourseRepository courseRepo;
//    
//    @InjectMocks
//    private AssignmentController modulesController;
//
//    // Test for uploadFile API success scenario
//    @Test
//    public void testUploadFile_Success() throws Exception {
//        // Mock the necessary dependencies
//        when(s3FileUploadService.uploadFileToS3(any(), any(), any(), any(), any(), any(), any()))
//                .thenReturn(ResponseEntity.status(HttpStatus.OK).build());
//
//        mockMvc.perform(MockMvcRequestBuilders.multipart("/files/upload")
//                .file(new MockMultipartFile("multipartfile", "C://Users//phani//Downloads//users.xlsx", "text/plain", "file content".getBytes()))
//                .param("title", "Sample Title")
//                .param("description", "Sample Description")
//                .param("id", "1")
//                .param("marks", "100")
//                .param("weightage", "20")
//                .param("deadlinedate", "2023-01-01"))
//                .andExpect(MockMvcResultMatchers.status().isCreated())
//                .andExpect(MockMvcResultMatchers.content().string("hh"));
//    }
//
//    // Test for uploadFile API failure scenario
//    @Test
//    public void testUploadFile_Failure() throws Exception {
//        // Mock the necessary dependencies to simulate an error during file upload
//        when(s3FileUploadService.uploadFileToS3(any(), any(), any(), any(), any(), any(), any()))
//                .thenReturn(null);
//
//        mockMvc.perform(MockMvcRequestBuilders.multipart("/files/upload")
//                .file(new MockMultipartFile("multipartfile", "filename.txt", "text/plain", "file content".getBytes()))
//                .param("title", "Sample Title")
//                .param("description", "Sample Description")
//                .param("id", "1")
//                .param("marks", "100")
//                .param("weightage", "120") // Intentionally causing a conflict
//                .param("deadlinedate", "2023-01-01"))
//                .andExpect(MockMvcResultMatchers.status().isConflict())
//                .andExpect(MockMvcResultMatchers.content().string("hh"));
//    }
//

    // Repeat the above structure for other APIs (completeRegistration, sentMailRequest, sendOtp, resetPassword) with success and failure scenarios.
}