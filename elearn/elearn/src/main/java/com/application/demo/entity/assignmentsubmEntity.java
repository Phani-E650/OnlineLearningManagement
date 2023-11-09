package com.application.demo.entity;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnoreType;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@JsonIgnoreType
@Table(name = "assignmentsubmit_entity")
public class assignmentsubmEntity {
	  	@Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;    
	    private String fileUrl;   
	    private String fileName;  
	    private Date submitteddate;
	    private String marks;
	    @ManyToOne
	    @JoinColumn(name = "assign_id")
	    private AssignmentEntity assignment;
	    @ManyToOne
	    @JoinColumn(name = "user_id")
	    private UserFullDetails subuser;
		public Long getId() {
			return id;
		}
		public void setId(Long id) {
			this.id = id;
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
		public Date getSubmitteddate() {
			return submitteddate;
		}
		public void setSubmitteddate(Date submitteddate) {
			this.submitteddate = submitteddate;
		}
		public String getMarks() {
			return marks;
		}
		public void setMarks(String marks) {
			this.marks = marks;
		}
		public AssignmentEntity getAssignment() {
			return assignment;
		}
		public void setAssignment(AssignmentEntity assignment) {
			this.assignment = assignment;
		}
		public UserFullDetails getSubuser() {
			return subuser;
		}
		public void setSubuser(UserFullDetails subuser) {
			this.subuser = subuser;
		}
		public assignmentsubmEntity(Long id, String fileUrl, String fileName, Date submitteddate, String marks,
				AssignmentEntity assignment, UserFullDetails subuser) {
			super();
			this.id = id;
			this.fileUrl = fileUrl;
			this.fileName = fileName;
			this.submitteddate = submitteddate;
			this.marks = marks;
			this.assignment = assignment;
			this.subuser = subuser;
		}
		public assignmentsubmEntity() {
			super();
			// TODO Auto-generated constructor stub
		}
	    
}
