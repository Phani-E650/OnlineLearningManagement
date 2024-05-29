package com.application.demo.entity;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

//public class UserFullDetails {
//
//}
//import javax.persistence.*;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "user_full_details")
public class UserFullDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String name;

//    @Column(nullable = false)
//    private String dept;
    @ManyToOne( fetch = FetchType.EAGER)
    @JoinColumn(name = "deptreference_id")
    @JsonIgnore
    private CategoryEntity department;
    
    private String password;
    
    private String otp;
    
    
    @Column(nullable = false)
    private String phoneno;

    @Column(nullable = false)
    private String dob;
    
    @OneToOne(mappedBy = "userfulldetails")
    @JsonIgnore
    private UserTemp usertemp;
    
    @OneToMany(mappedBy = "user", fetch = FetchType.EAGER)
    @JsonIgnore
    public List<Enrollment> enrollcourseslist= new ArrayList<>();
    
    @OneToMany(mappedBy = "subuser", fetch = FetchType.EAGER)
    @JsonIgnore
    public List<assignmentsubmEntity> submissionlist= new ArrayList<>();

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

	public CategoryEntity getDepartment() {
		return department;
	}

	public void setDepartment(CategoryEntity department) {
		this.department = department;
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

	public UserTemp getUsertemp() {
		return usertemp;
	}

	public void setUsertemp(UserTemp usertemp) {
		this.usertemp = usertemp;
	}

	public List<Enrollment> getEnrollcourseslist() {
		return enrollcourseslist;
	}

	public void setEnrollcourseslist(List<Enrollment> enrollcourseslist) {
		this.enrollcourseslist = enrollcourseslist;
	}

	public List<assignmentsubmEntity> getSubmissionlist() {
		return submissionlist;
	}

	public void setSubmissionlist(List<assignmentsubmEntity> submissionlist) {
		this.submissionlist = submissionlist;
	}

	public UserFullDetails(Long id, String email, String name, CategoryEntity department, String password, String otp,
			String phoneno, String dob, UserTemp usertemp, List<Enrollment> enrollcourseslist,
			List<assignmentsubmEntity> submissionlist) {
		super();
		this.id = id;
		this.email = email;
		this.name = name;
		this.department = department;
		this.password = password;
		this.otp = otp;
		this.phoneno = phoneno;
		this.dob = dob;
		this.usertemp = usertemp;
		this.enrollcourseslist = enrollcourseslist;
		this.submissionlist = submissionlist;
	}

	public UserFullDetails() {
		super();
		// TODO Auto-generated constructor stub
	}


	
	

}

