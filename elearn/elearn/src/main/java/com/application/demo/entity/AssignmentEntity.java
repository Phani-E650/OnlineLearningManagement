package com.application.demo.entity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.annotation.JsonIgnore;

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
public class AssignmentEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    
    private String fileUrl;
    
    private String fileName;
  private String totalmarks;
    
    private Date deadlinedate;
    
    @ManyToOne
    @JoinColumn(name = "course_id")
    private CourseEntity course;
    
    @OneToMany(mappedBy = "assignment",fetch = FetchType.EAGER)
    @JsonIgnore
    private List<assignmentsubmEntity> assignmentsubmissions= new ArrayList<>();

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

	public String getFileUrl() {
		return fileUrl;
	}

	public void setFileUrl(String fileUrl) {
		this.fileUrl = fileUrl;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public String getTotalmarks() {
		return totalmarks;
	}

	public void setTotalmarks(String totalmarks) {
		this.totalmarks = totalmarks;
	}

	public Date getDeadlinedate() {
		return deadlinedate;
	}

	public void setDeadlinedate(Date deadlinedate) {
		this.deadlinedate = deadlinedate;
	}

	public CourseEntity getCourse() {
		return course;
	}

	public void setCourse(CourseEntity course) {
		this.course = course;
	}

	public List<assignmentsubmEntity> getAssignmentsubmissions() {
		return assignmentsubmissions;
	}

	public void setAssignmentsubmissions(List<assignmentsubmEntity> assignmentsubmissions) {
		this.assignmentsubmissions = assignmentsubmissions;
	}

	public AssignmentEntity(Long id, String title, String description, String fileUrl, String fileName,
			String totalmarks, Date deadlinedate, CourseEntity course,
			List<assignmentsubmEntity> assignmentsubmissions) {
		super();
		this.id = id;
		this.title = title;
		this.description = description;
		this.fileUrl = fileUrl;
		this.fileName = fileName;
		this.totalmarks = totalmarks;
		this.deadlinedate = deadlinedate;
		this.course = course;
		this.assignmentsubmissions = assignmentsubmissions;
	}

	public AssignmentEntity() {
		super();
		// TODO Auto-generated constructor stub
	}

	
	

	
	
    
}
