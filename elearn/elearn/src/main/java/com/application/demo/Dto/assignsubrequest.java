package com.application.demo.Dto;

import org.springframework.web.multipart.MultipartFile;

public class assignsubrequest {
 private String assignmentIndex;
	    private String usermail;
	    private MultipartFile  answer;
		public String getAssignmentIndex() {
			return assignmentIndex;
		}
		public void setAssignmentIndex(String assignmentIndex) {
			this.assignmentIndex = assignmentIndex;
		}
		public String getUsermail() {
			return usermail;
		}
		public void setUsermail(String usermail) {
			this.usermail = usermail;
		}
		public MultipartFile getAnswer() {
			return answer;
		}
		public void setAnswer(MultipartFile answer) {
			this.answer = answer;
		}
		public assignsubrequest(String assignmentIndex, String usermail, MultipartFile answer) {
			super();
			this.assignmentIndex = assignmentIndex;
			this.usermail = usermail;
			this.answer = answer;
		}
		public assignsubrequest() {
			super();
			// TODO Auto-generated constructor stub
		}
	    
   
}
