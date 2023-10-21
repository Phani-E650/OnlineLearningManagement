package com.application.demo.entity;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class ModuleEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String modulename;
    private String coursename;
    private String instructorname;
    
    @OneToMany(mappedBy = "module", fetch = FetchType.EAGER)
    @JsonIgnore
    public List<VideoContent> videoContents= new ArrayList<>();

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

	public List<VideoContent> getVideoContents() {
		return videoContents;
	}

	public void setVideoContents(List<VideoContent> videoContents) {
		this.videoContents = videoContents;
	}

	public ModuleEntity(Long id, String modulename, String coursename, String instructorname,
			List<VideoContent> videoContents) {
		super();
		this.id = id;
		this.modulename = modulename;
		this.coursename = coursename;
		this.instructorname = instructorname;
		this.videoContents = videoContents;
	}

	public ModuleEntity() {
		super();
		// TODO Auto-generated constructor stub
	}
    
	
    
}
