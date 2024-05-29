package com.application.demo.Dto;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.application.demo.entity.Enrollment;
import com.application.demo.entity.UserTemp;
import com.application.demo.entity.assignmentsubmEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;

public class assignsubmissions {
	    private Long submissionid;
	    private String email;
	    private String name;
	    private String dept;
	    private Date submitteddate;
	    private String totalmarks;
	    private String filename;
	    private String status;
	    private String weightage;
	    private String assignedmarks;
		public Long getSubmissionid() {
			return submissionid;
		}
		public void setSubmissionid(Long submissionid) {
			this.submissionid = submissionid;
		}
		public String getEmail() {
			return email;
		}
		public void setEmail(String email) {
			this.email = email;
		}
		public String getName() {
			return name;
		}
		public void setName(String name) {
			this.name = name;
		}
		public String getDept() {
			return dept;
		}
		public void setDept(String dept) {
			this.dept = dept;
		}
		public Date getSubmitteddate() {
			return submitteddate;
		}
		public void setSubmitteddate(Date submitteddate) {
			this.submitteddate = submitteddate;
		}
		public String getTotalmarks() {
			return totalmarks;
		}
		public void setTotalmarks(String totalmarks) {
			this.totalmarks = totalmarks;
		}
		public String getFilename() {
			return filename;
		}
		public void setFilename(String filename) {
			this.filename = filename;
		}
		public String getStatus() {
			return status;
		}
		public void setStatus(String status) {
			this.status = status;
		}
		public String getWeightage() {
			return weightage;
		}
		public void setWeightage(String weightage) {
			this.weightage = weightage;
		}
		public String getAssignedmarks() {
			return assignedmarks;
		}
		public void setAssignedmarks(String assignedmarks) {
			this.assignedmarks = assignedmarks;
		}
		public assignsubmissions() {
			super();
			// TODO Auto-generated constructor stub
		}
		public assignsubmissions(Long submissionid, String email, String name, String dept, Date submitteddate,
				String totalmarks, String filename, String status, String weightage, String assignedmarks) {
			super();
			this.submissionid = submissionid;
			this.email = email;
			this.name = name;
			this.dept = dept;
			this.submitteddate = submitteddate;
			this.totalmarks = totalmarks;
			this.filename = filename;
			this.status = status;
			this.weightage = weightage;
			this.assignedmarks = assignedmarks;
		}
	    
		
	    
}
