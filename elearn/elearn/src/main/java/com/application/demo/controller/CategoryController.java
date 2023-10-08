package com.application.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.application.demo.entity.CategoryEntity;
import com.application.demo.repository.CategoryRepository;



@RestController
@RequestMapping("/categories")
public class CategoryController {
    @Autowired
    private CategoryRepository categoryRepository;

    // Get all categories
    @GetMapping
    public List<CategoryEntity> getAllCategories() {
        return categoryRepository.getAllCategoriesWithSubcategories();
    }

    // Create a new category
    @PostMapping
    public CategoryEntity createCategory(@RequestBody CategoryEntity category) {
        return categoryRepository.save(category);
    }
}
