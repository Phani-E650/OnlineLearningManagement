package com.application.demo.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Enrollment {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long enrollid;
	private String coursename;
//	private String courseid;
//	private String enrolleddate;
	private String enrolledusername;
//	private String enrolleduserid;
//	private String enrolledusertype;
	private String instructorname;
//	private String instructorinstitution;
//	private String enrolledcount;
//	private String youtubeurl;
//	private String websiteurl;
//	private String coursetype;
//	private String skilllevel;
//	private String language;
//	private String description;
	public Long getEnrollid() {
		return enrollid;
	}
	public void setEnrollid(Long enrollid) {
		this.enrollid = enrollid;
	}
	public String getCoursename() {
		return coursename;
	}
	public void setCoursename(String coursename) {
		this.coursename = coursename;
	}
	public String getEnrolledusername() {
		return enrolledusername;
	}
	public void setEnrolledusername(String enrolledusername) {
		this.enrolledusername = enrolledusername;
	}
	public String getInstructorname() {
		return instructorname;
	}
	public void setInstructorname(String instructorname) {
		this.instructorname = instructorname;
	}
	public Enrollment(Long enrollid, String coursename, String enrolledusername, String instructorname) {
		super();
		this.enrollid = enrollid;
		this.coursename = coursename;
		this.enrolledusername = enrolledusername;
		this.instructorname = instructorname;
	}
	public Enrollment() {
		super();
		// TODO Auto-generated constructor stub
	}
}
