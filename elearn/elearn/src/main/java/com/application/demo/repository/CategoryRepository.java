package com.application.demo.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.application.demo.entity.CategoryEntity;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<CategoryEntity, Long> {
	
	 List<CategoryEntity> findByParentCategoryIsNull(); // Get top-level categories
	 
    @Query(value = "WITH RECURSIVE CategoryHierarchy AS (" +
            "    SELECT * FROM category_entity WHERE parent_id IS NULL" +
            "    UNION ALL" +
            "    SELECT c.* FROM category_entity c" +
            "    INNER JOIN CategoryHierarchy ch ON c.parent_id = ch.id" +
            ")" +
            "SELECT * FROM CategoryHierarchy", nativeQuery = true)
    List<CategoryEntity> getAllCategoriesWithSubcategories();
}
