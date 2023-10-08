package com.application.demo.service;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.application.demo.entity.CategoryEntity;
import com.application.demo.repository.CategoryRepository;


@Service
public class CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;

    // Get all categories
    
    // Create a new category
    public CategoryEntity createCategory(CategoryEntity category) {
        return categoryRepository.save(category);
    }
}
