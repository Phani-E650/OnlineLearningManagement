
package com.application.demo.entity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Transient;

@Entity
public class CourseAttachmentsEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    
    @Column(length = 10000)
    private String description;
    private String fileUrl;
    
    
    private String fileName;
  
    
    @ManyToOne
    @JoinColumn(name = "course_id")
    private CourseEntity course;


	public CourseAttachmentsEntity(Long id, String title, String description, String fileUrl, String fileName,
			CourseEntity course) {
		super();
		this.id = id;
		this.title = title;
		this.description = description;
		this.fileUrl = fileUrl;
		this.fileName = fileName;
		this.course = course;
	}


	public CourseAttachmentsEntity() {
		super();
		// TODO Auto-generated constructor stub
	}


	public String getFileUrl() {
		return fileUrl;
	}


	public void setFileUrl(String fileUrl) {
		this.fileUrl = fileUrl;
	}


	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public String getTitle() {
		return title;
	}


	public void setTitle(String title) {
		this.title = title;
	}


	public String getDescription() {
		return description;
	}


	public void setDescription(String description) {
		this.description = description;
	}


	public String getFileName() {
		return fileName;
	}


	public void setFileName(String fileName) {
		this.fileName = fileName;
	}


	public CourseEntity getCourse() {
		return course;
	}


	public void setCourse(CourseEntity course) {
		this.course = course;
	}
    
    
    
    
    

	
	
    
}
