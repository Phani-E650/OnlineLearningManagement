package com.application.demo.Dto;

public class enrollrequest {
	 private String coursename;
	    private String enrolledusername;
	    private String instructorname;
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
		public enrollrequest(String coursename, String enrolledusername, String instructorname) {
			super();
			this.coursename = coursename;
			this.enrolledusername = enrolledusername;
			this.instructorname = instructorname;
		}
		public enrollrequest() {
			super();
			// TODO Auto-generated constructor stub
		}
	   
}
