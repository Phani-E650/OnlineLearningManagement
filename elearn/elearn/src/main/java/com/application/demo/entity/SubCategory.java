package com.application.demo.entity;


import com.application.demo.entity.CategoryEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class SubCategory {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    
    
    @ManyToOne
    @JoinColumn(name = "category_id")
    private CategoryEntity category;


	public SubCategory() {
		super();
		// TODO Auto-generated constructor stub
	}


//	public SubCategory(Long id, String name, Category category) {
//		super();
//		this.id = id;
//		this.name = name;
//		this.category = category;
//	}


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


	public CategoryEntity getCategory() {
		return category;
	}


	public void setCategory(CategoryEntity category) {
		this.category = category;
	}
    
    
    
    

}
