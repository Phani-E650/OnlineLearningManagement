package com.application.demo.controller;

import com.application.demo.controller.CategoryController;
import com.application.demo.controller.UserController;
import com.application.demo.entity.CategoryEntity;
import com.application.demo.repository.CategoryRepository;
import com.application.demo.service.CategoryService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;


@ExtendWith(SpringExtension.class)
@WebMvcTest(controllers = CategoryController.class)
@AutoConfigureMockMvc
class CategoryControllerTest {

    
    @MockBean
    private CategoryService categoryService;
    
    
    @Autowired
    private MockMvc mockMvc;
    
    @MockBean
    private CategoryRepository categoryRepository;

    
    

    @Test
    void testAddCategory_Success() throws Exception {
    	CategoryEntity cseCategory = new CategoryEntity();
    	cseCategory.setName("CSE");

    	CategoryEntity summerCategory = new CategoryEntity();
    	summerCategory.setName("SUMMER");

        // Mock the necessary dependencies
        when(categoryRepository.save(any())).thenReturn(cseCategory);

        // Invoke the service method
        String content = "{ \"name\": \"CSE\" }";

        mockMvc.perform(MockMvcRequestBuilders.post("/category/addcategory")
                .contentType(MediaType.APPLICATION_JSON)
                .content(content))
                .andExpect(MockMvcResultMatchers.status().isOk());

        // Verify that the repository save method is called
        verify(categoryRepository, times(1)).save(any());
    }

    @Test
    void testAddSubcategory_Success() throws Exception {
    	
    	CategoryEntity cseCategory = new CategoryEntity();
    	cseCategory.setName("CSE");

    	CategoryEntity summerCategory = new CategoryEntity();
    	summerCategory.setName("SUMMER");

        // Mock the necessary dependencies
        when(categoryRepository.findByName(any())).thenReturn(summerCategory);
        when(categoryRepository.save(any())).thenReturn(summerCategory);

        // Invoke the service method
        String content = "{ \"name\": \"SUMMER\" }";

        mockMvc.perform(MockMvcRequestBuilders.post("/category/parentCategoryId/subcategories")
                .contentType(MediaType.APPLICATION_JSON)
                .content(content))
                .andExpect(MockMvcResultMatchers.status().isOk());

        // Verify that the repository findByName and save methods are called
        verify(categoryRepository, times(1)).findByName(any());
        verify(categoryRepository, times(1)).save(any());
    }

}

