package com.application.demo.Dto;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;


public class addcourserequest {
	 private Long id;
	    private String courseName;
	    private String courseId;
	    private String courseDescription;
	    private Date startDate;
	    private int numberOfWeeks;
	    private Long userId;
	    private String department;
	    private String courseStatus;
	    private Date endDate;
	    private String category;
		private String modules;	    
	    private String professorName;
		public Long getId() {
			return id;
		}
		public void setId(Long id) {
			this.id = id;
		}
		public String getCourseName() {
			return courseName;
		}
		public void setCourseName(String courseName) {
			this.courseName = courseName;
		}
		public String getCourseId() {
			return courseId;
		}
		public void setCourseId(String courseId) {
			this.courseId = courseId;
		}
		public String getCourseDescription() {
			return courseDescription;
		}
		public void setCourseDescription(String courseDescription) {
			this.courseDescription = courseDescription;
		}
		public Date getStartDate() {
			return startDate;
		}
		public void setStartDate(Date startDate) {
			this.startDate = startDate;
		}
		public int getNumberOfWeeks() {
			return numberOfWeeks;
		}
		public void setNumberOfWeeks(int numberOfWeeks) {
			this.numberOfWeeks = numberOfWeeks;
		}
		public Long getUserId() {
			return userId;
		}
		public void setUserId(Long userId) {
			this.userId = userId;
		}
		public String getDepartment() {
			return department;
		}
		public void setDepartment(String department) {
			this.department = department;
		}
		public String getCourseStatus() {
			return courseStatus;
		}
		public void setCourseStatus(String courseStatus) {
			this.courseStatus = courseStatus;
		}
		public Date getEndDate() {
			return endDate;
		}
		public void setEndDate(Date endDate) {
			this.endDate = endDate;
		}
		public String getCategory() {
			return category;
		}
		public void setCategory(String category) {
			this.category = category;
		}
		public String getModules() {
			return modules;
		}
		public void setModules(String modules) {
			this.modules = modules;
		}
		public String getProfessorName() {
			return professorName;
		}
		public void setProfessorName(String professorName) {
			this.professorName = professorName;
		}
		public addcourserequest(Long id, String courseName, String courseId, String courseDescription, Date startDate,
				int numberOfWeeks, Long userId, String department, String courseStatus, Date endDate, String category,
				String modules, String professorName) {
			super();
			this.id = id;
			this.courseName = courseName;
			this.courseId = courseId;
			this.courseDescription = courseDescription;
			this.startDate = startDate;
			this.numberOfWeeks = numberOfWeeks;
			this.userId = userId;
			this.department = department;
			this.courseStatus = courseStatus;
			this.endDate = endDate;
			this.category = category;
			this.modules = modules;
			this.professorName = professorName;
		}
		public addcourserequest() {
			super();
			// TODO Auto-generated constructor stub
		}
	    
}
