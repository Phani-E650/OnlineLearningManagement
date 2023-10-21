package com.application.demo.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class VideoContent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String contentname;
    private String videourl;
    
    @ManyToOne
    @JoinColumn(name = "module_id")
    private ModuleEntity module;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getContentname() {
		return contentname;
	}

	public void setContentname(String contentname) {
		this.contentname = contentname;
	}

	public String getVideourl() {
		return videourl;
	}

	public void setVideourl(String videourl) {
		this.videourl = videourl;
	}

	public ModuleEntity getModule() {
		return module;
	}

	public void setModule(ModuleEntity module) {
		this.module = module;
	}

	public VideoContent(Long id, String contentname, String videourl, ModuleEntity module) {
		super();
		this.id = id;
		this.contentname = contentname;
		this.videourl = videourl;
		this.module = module;
	}

	public VideoContent() {
		super();
		// TODO Auto-generated constructor stub
	}
    

    // Constructors, getters, and setters
}
