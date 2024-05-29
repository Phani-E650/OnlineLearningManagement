package com.application.demo.Dto;

import java.util.Date;

public class resultresponse {
	 private Long id;

	    private String title;
	    private String description;
	    private String fileUrl;
	    private String fileName;
	    private String totalmarks;
	    private String weightage;
	    private String deadlinedate;
	    private String assignedmarks;
	    private String submittedfile;
	    private Date submitteddate;
	    private String status;
		public resultresponse() {
			super();
			// TODO Auto-generated constructor stub
		}
		public resultresponse(Long id, String title, String description, String fileUrl, String fileName,
				String totalmarks, String weightage, String deadlinedate, String assignedmarks, String submittedfile,
				Date submitteddate, String status) {
			super();
			this.id = id;
			this.title = title;
			this.description = description;
			this.fileUrl = fileUrl;
			this.fileName = fileName;
			this.totalmarks = totalmarks;
			this.weightage = weightage;
			this.deadlinedate = deadlinedate;
			this.assignedmarks = assignedmarks;
			this.submittedfile = submittedfile;
			this.submitteddate = submitteddate;
			this.status = status;
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
		public String getWeightage() {
			return weightage;
		}
		public void setWeightage(String weightage) {
			this.weightage = weightage;
		}
		public String getDeadlinedate() {
			return deadlinedate;
		}
		public void setDeadlinedate(String deadlinedate) {
			this.deadlinedate = deadlinedate;
		}
		public String getAssignedmarks() {
			return assignedmarks;
		}
		public void setAssignedmarks(String assignedmarks) {
			this.assignedmarks = assignedmarks;
		}
		public String getSubmittedfile() {
			return submittedfile;
		}
		public void setSubmittedfile(String submittedfile) {
			this.submittedfile = submittedfile;
		}
		public Date getSubmitteddate() {
			return submitteddate;
		}
		public void setSubmitteddate(Date submitteddate) {
			this.submitteddate = submitteddate;
		}
		public String getStatus() {
			return status;
		}
		public void setStatus(String status) {
			this.status = status;
		}
	    
	    

}
