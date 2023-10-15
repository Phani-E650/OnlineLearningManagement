package com.application.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.application.demo.entity.CategoryEntity;
import com.application.demo.repository.CategoryRepository;
import com.application.demo.service.CategoryService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/category")
public class CategoryController {
    @Autowired
    private CategoryRepository categoryRepository;
    
    @Autowired
    private CategoryService categoryService;
    // Get all categories
    @GetMapping("/getcategories")
    public List<CategoryEntity> getAllCategories() {
    	List<CategoryEntity> b=categoryService.getCategoriesWithSubcategories();
        return b;
    }

    // Create a new category
//    @PostMapping
//    public CategoryEntity createCategory(@RequestBody CategoryEntity category) {
//        return categoryRepository.save(category);
//    }
    @GetMapping("/leaf")
    public List<CategoryEntity> getAllLeafCategories() {
        return categoryService.getAllLeafCategories();
    }
    
    @PostMapping("/addcategory")
    public CategoryEntity addCategory(@RequestBody CategoryEntity category) {
        return categoryService.addCategory(category);
    }

    @PostMapping("/{parentCategoryId}/subcategories")
    public  String addSubcategory(
            @PathVariable String parentCategoryId,
            @RequestBody CategoryEntity subcategory
    ) {
    	CategoryEntity a=categoryService.addSubcategory(parentCategoryId, subcategory);
//        return new ResponseEntity<>(a, HttpStatus.CREATED);
    	return "successfully added";
    }
}
