package com.application.demo.Dto;

import com.application.demo.entity.CategoryEntity;

import jakarta.persistence.Column;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

public class registrationrequest {
    private Long id;
    private String email;
    private String name;
    private String dept;  
    private String password;  
    private String otp;
    private String phoneno;
    private String dob;
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
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getOtp() {
		return otp;
	}
	public void setOtp(String otp) {
		this.otp = otp;
	}
	public String getPhoneno() {
		return phoneno;
	}
	public void setPhoneno(String phoneno) {
		this.phoneno = phoneno;
	}
	public String getDob() {
		return dob;
	}
	public void setDob(String dob) {
		this.dob = dob;
	}
	public registrationrequest(Long id, String email, String name, String dept, String password, String otp,
			String phoneno, String dob) {
		super();
		this.id = id;
		this.email = email;
		this.name = name;
		this.dept = dept;
		this.password = password;
		this.otp = otp;
		this.phoneno = phoneno;
		this.dob = dob;
	}
	public registrationrequest() {
		super();
		// TODO Auto-generated constructor stub
	}
    
    
}
