package com.application.demo.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreType;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@JsonIgnoreType
@Table(name = "category_entity")
public class CategoryEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    @ManyToOne
    @JoinColumn(name = "parent_id")
    private CategoryEntity parentCategory;

    @OneToMany(mappedBy = "parentCategory",fetch = FetchType.EAGER)
    private List<CategoryEntity> subcategories;

	public CategoryEntity(Long id, String name, CategoryEntity parentCategory, List<CategoryEntity> subcategories) {
		super();
		this.id = id;
		this.name = name;
		this.parentCategory = parentCategory;
		this.subcategories = subcategories;
	}

	public CategoryEntity() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public CategoryEntity getParentCategory() {
		return parentCategory;
	}

	public void setParentCategory(CategoryEntity parentCategory) {
		this.parentCategory = parentCategory;
	}

	public List<CategoryEntity> getSubcategories() {
		return subcategories;
	}

	public void setSubcategories(List<CategoryEntity> subcategories) {
		this.subcategories = subcategories;
	}
    
    
}
