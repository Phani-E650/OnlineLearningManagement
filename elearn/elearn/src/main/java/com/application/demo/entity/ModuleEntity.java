package com.application.demo.entity;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
public class ModuleEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String modulename;
    
    @OneToMany(mappedBy = "module", fetch = FetchType.EAGER)
    @JsonIgnore
    public List<VideoContent> videoContents= new ArrayList<>();
    @ManyToOne
    @JoinColumn(name = "course_id")
    private CourseEntity course;
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
	public List<VideoContent> getVideoContents() {
		return videoContents;
	}
	public void setVideoContents(List<VideoContent> videoContents) {
		this.videoContents = videoContents;
	}
	public CourseEntity getCourse() {
		return course;
	}
	public void setCourse(CourseEntity course) {
		this.course = course;
	}
	public ModuleEntity(Long id, String modulename, List<VideoContent> videoContents, CourseEntity course) {
		super();
		this.id = id;
		this.modulename = modulename;
		this.videoContents = videoContents;
		this.course = course;
	}
	public ModuleEntity() {
		super();
		// TODO Auto-generated constructor stub
	}
   
    
}
