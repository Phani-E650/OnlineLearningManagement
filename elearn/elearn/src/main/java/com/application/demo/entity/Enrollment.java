package com.application.demo.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Enrollment {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long enrollid;
	 @ManyToOne
	 @JoinColumn(name = "course_id")
	 private CourseEntity course;

	private String enrolledusername;

	public Long getEnrollid() {
		return enrollid;
	}

	public void setEnrollid(Long enrollid) {
		this.enrollid = enrollid;
	}

	public CourseEntity getCourse() {
		return course;
	}

	public void setCourse(CourseEntity course) {
		this.course = course;
	}

	public String getEnrolledusername() {
		return enrolledusername;
	}

	public void setEnrolledusername(String enrolledusername) {
		this.enrolledusername = enrolledusername;
	}

	public Enrollment(Long enrollid, CourseEntity course, String enrolledusername) {
		super();
		this.enrollid = enrollid;
		this.course = course;
		this.enrolledusername = enrolledusername;
	}

	public Enrollment() {
		super();
		// TODO Auto-generated constructor stub
	}

	
	
}
