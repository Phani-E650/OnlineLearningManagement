package com.application.demo.Dto;

public class AnnouncementsDto {
	
	 private String title;
	    private String description;
	    private String courseName;
	    private String professorName;
		public AnnouncementsDto(String title, String description, String courseName, String professorName) {
			super();
			this.title = title;
			this.description = description;
			this.courseName = courseName;
			this.professorName = professorName;
		}
		public AnnouncementsDto() {
			super();
			// TODO Auto-generated constructor stub
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
		public String getCourseName() {
			return courseName;
		}
		public void setCourseName(String courseName) {
			this.courseName = courseName;
		}
		public String getProfessorName() {
			return professorName;
		}
		public void setProfessorName(String professorName) {
			this.professorName = professorName;
		}
	    
		

}
