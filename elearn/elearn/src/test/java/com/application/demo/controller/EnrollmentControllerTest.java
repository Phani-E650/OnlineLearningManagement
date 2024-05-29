//package com.application.demo.controller;
//
//import com.application.demo.Dto.enrollrequest;
//import com.application.demo.Dto.enrollresponse;
//import com.application.demo.entity.Enrollment;
//import com.application.demo.entity.UserFullDetails;
//import com.application.demo.repository.CourseRepository;
//import com.application.demo.repository.EnrollmentRepository;
//import com.application.demo.repository.UserFullDetailsRepository;
//import com.application.demo.service.EnrollmentService;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.junit.jupiter.MockitoExtension;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//
//import java.util.Collections;
//import java.util.List;
//import java.util.Optional;
//
//import static org.junit.jupiter.api.Assertions.assertEquals;
//import static org.junit.jupiter.api.Assertions.assertNotNull;
//import static org.mockito.Mockito.*;
//
//@ExtendWith(MockitoExtension.class)
//class EnrollmentControllerTest {
//
//    @Mock
//    private UserFullDetailsRepository userFullDetailsRepository;
//
//    @Mock
//    private EnrollmentRepository enrollmentRepository;
//
//    @Mock
//    private CourseRepository courseRepository;
//
//    @Mock
//    private EnrollmentService enrollmentService;
//
//    @InjectMocks
//    private EnrollmentController enrollmentController;
//
//    @Test
//    void addNewCourse_Success() throws Exception {
//        // Mocking the necessary dependencies
//    	
//    	UserFullDetails mockUser = new UserFullDetails();
//    	mockUser.setId(1L);
//    	mockUser.setName("Mock User");
//    	mockUser.setEmail("mock@example.com");
//
//        when(userFullDetailsRepository.findByEmail(anyString())).thenReturn(Optional.of(mockUser));
//        when(enrollmentRepository.findById(anyLong())).thenReturn(Optional.of(/* mock a CourseEntity object */));
//        when(enrollmentService.addNewCourse(anyString(), anyString())).thenReturn(null);
//
//        // Creating a mock enrollrequest
//        enrollrequest request = new enrollrequest();
//        request.setEnrolledusername("testUser");
//
//        // Invoking the controller method
//        ResponseEntity<?> response = enrollmentController.addNewCourse(request, "1");
//
//        // Verifying the results
//        assertEquals(HttpStatus.OK, response.getStatusCode());
//        assertNotNull(response.getBody());
//        verify(enrollmentService, times(1)).addNewCourse("testUser", "1");
//    }
//
//    
//    @Test
//    void addNewCourse_UserAlreadyExists() throws Exception {
//        // Mocking the necessary dependencies
//        when(userFullDetailsRepository.findByEmail(anyString())).thenReturn(Optional.of(/* mock a UserFullDetails object */));
//        when(enrollmentRepository.findById(anyLong())).thenReturn(Optional.of(/* mock a CourseEntity object */));
//        when(enrollmentService.addNewCourse(anyString(), anyString())).thenReturn(/* mock an Enrollment object */);
//
//        // Creating a mock enrollrequest
//        enrollrequest request = new enrollrequest();
//        request.setEnrolledusername("testUser");
//
//        // Invoking the controller method with a user that already exists
//        ResponseEntity<?> response = enrollmentController.addNewCourse(request, "1");
//
//        // Verifying the results
//        assertEquals(HttpStatus.CONFLICT, response.getStatusCode());
//        assertEquals("User already exists", response.getBody());
//        verify(enrollmentService, never()).addNewCourse(anyString(), anyString());
//    }
//
//    // Add more tests for edge cases and error scenarios
//
//    @Test
//    void getusers_Success() {
//        // Mocking the necessary dependencies
//        when(enrollmentService.getAllEnrollUsers(anyString())).thenReturn(Collections.singletonList(/* mock an enrollresponse object */));
//
//        // Invoking the controller method
//        List<enrollresponse> response = enrollmentController.getusers("1");
//
//        // Verifying the results
//        assertNotNull(response);
//        // Add more assertions as needed
//    }
//
//    // Add tests for deleteVideoContent method
//
//    // Add more tests as needed
//
//}
//
