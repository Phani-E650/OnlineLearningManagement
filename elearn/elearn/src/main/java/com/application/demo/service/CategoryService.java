package com.application.demo.service;



import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.application.demo.entity.CategoryEntity;
import com.application.demo.repository.CategoryRepository;

import jakarta.persistence.EntityNotFoundException;


@Service
public class CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;

    // Get all categories
    
    // Create a new category
    public CategoryEntity createCategory(CategoryEntity category) {
        return categoryRepository.save(category);
        
    }
    
    public List<CategoryEntity> getCategoriesWithSubcategories() {
        List<CategoryEntity> topCategories = categoryRepository.findByParentCategoryIsNull();
        return fetchSubcategories(topCategories);
    }

    private List<CategoryEntity> fetchSubcategories(List<CategoryEntity> categories) {
        for (CategoryEntity category : categories) {
            List<CategoryEntity> subcategories = category.getSubcategories();
            if (subcategories != null && !subcategories.isEmpty()) {
                category.setSubcategories(fetchSubcategories(subcategories));
            }
        }
        return categories;
    }
    public CategoryEntity addSubcategory(String parentCategoryId, CategoryEntity subcategory) {
    	 System.out.println(subcategory);
    	 CategoryEntity parentCategory = categoryRepository.findByName(parentCategoryId);

    	    if (parentCategory == null) {
    	        // Handle the case where the parent category doesn't exist
    	        throw new EntityNotFoundException("Parent category not found");
    	    }
        subcategory.setParentCategory(parentCategory);
        parentCategory.getSubcategories().add(subcategory);
        System.out.println(parentCategory);
        categoryRepository.save(subcategory);
        System.out.println(subcategory);
        CategoryEntity a=categoryRepository.save(subcategory);
        
        return a;
    }
    public CategoryEntity addCategory(CategoryEntity category) {
        return categoryRepository.save(category);
    }
    
    
    
    
    public List<CategoryEntity> getAllLeafCategories() {
        List<CategoryEntity> topCategories = categoryRepository.findByParentCategoryIsNull();
        List<CategoryEntity> leafCategories = new ArrayList<>();
        collectLeafCategories(topCategories, leafCategories);
        return leafCategories;
    }
    
    private void collectLeafCategories(List<CategoryEntity> categories, List<CategoryEntity> leafCategories) {
        for (CategoryEntity category : categories) {
            List<CategoryEntity> subcategories = category.getSubcategories();
            if (subcategories == null || subcategories.isEmpty()) {
                leafCategories.add(category);
            } else {
                collectLeafCategories(subcategories, leafCategories);
            }
        }
    }

    
    
}
