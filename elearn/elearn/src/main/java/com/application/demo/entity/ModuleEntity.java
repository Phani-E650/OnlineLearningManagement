package com.application.demo.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class ModuleEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String modulename;
    private String coursename;
    private String instructorname;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getModulename() {
		return modulename;
	}
	public void setModulename(String modulename) {
		this.modulename = modulename;
	}
	public String getCoursename() {
		return coursename;
	}
	public void setCoursename(String coursename) {
		this.coursename = coursename;
	}
	public String getInstructorname() {
		return instructorname;
	}
	public void setInstructorname(String instructorname) {
		this.instructorname = instructorname;
	}
	public ModuleEntity(Long id, String modulename, String coursename, String instructorname) {
		super();
		this.id = id;
		this.modulename = modulename;
		this.coursename = coursename;
		this.instructorname = instructorname;
	}
	public ModuleEntity() {
		super();
		// TODO Auto-generated constructor stub
	}
	

    // Constructors, getters, and setters
    
}
