package com.application.demo.Dto;

public class enrollresponse {
	    private Long id;
	    private String email;
	    private String name;
	    private String dept;
	    private Long enrollid;
		public Long getId() {
			return id;
		}
		public void setId(Long id) {
			this.id = id;
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
		public Long getEnrollid() {
			return enrollid;
		}
		public void setEnrollid(Long enrollid) {
			this.enrollid = enrollid;
		}
		public enrollresponse(Long id, String email, String name, String dept, Long enrollid) {
			super();
			this.id = id;
			this.email = email;
			this.name = name;
			this.dept = dept;
			this.enrollid = enrollid;
		}
		public enrollresponse() {
			super();
			// TODO Auto-generated constructor stub
		}
	    

}
