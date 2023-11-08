package com.application.demo.Dto;

public class VideoContentDto {
	
    private String contentName;
    private String videoUrl;
    public String videodescription;
    private String moduleName;
    private String courseName;
    private String instructorName;
	public String getContentName() {
		return contentName;
	}
	public void setContentName(String contentName) {
		this.contentName = contentName;
	}
	public String getVideoUrl() {
		return videoUrl;
	}
	public void setVideoUrl(String videoUrl) {
		this.videoUrl = videoUrl;
	}
	public String getVideodescription() {
		return videodescription;
	}
	public void setVideodescription(String videodescription) {
		this.videodescription = videodescription;
	}
	public String getModuleName() {
		return moduleName;
	}
	public void setModuleName(String moduleName) {
		this.moduleName = moduleName;
	}
	public String getCourseName() {
		return courseName;
	}
	public void setCourseName(String courseName) {
		this.courseName = courseName;
	}
	public String getInstructorName() {
		return instructorName;
	}
	public void setInstructorName(String instructorName) {
		this.instructorName = instructorName;
	}
	public VideoContentDto(String contentName, String videoUrl, String videodescription, String moduleName,
			String courseName, String instructorName) {
		super();
		this.contentName = contentName;
		this.videoUrl = videoUrl;
		this.videodescription = videodescription;
		this.moduleName = moduleName;
		this.courseName = courseName;
		this.instructorName = instructorName;
	}
	public VideoContentDto() {
		super();
		// TODO Auto-generated constructor stub
	}
	
    // Getters and setters
}
