package com.application.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;


@Entity
@Table(name = "user_temp")
public class UserTemp {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column()
    private String status;
	@Column(unique = true, nullable = false)
    private String email;
    @Column(nullable = false)
    private String role;
    @OneToOne
    @JoinColumn(name = "userfull_id")
    @JsonIgnore
    private UserFullDetails userfulldetails;
	public UserTemp(Long id, String status, String email, String role, UserFullDetails userfulldetails) {
		super();
		this.id = id;
		this.status = status;
		this.email = email;
		this.role = role;
		this.userfulldetails = userfulldetails;
	}
	public UserTemp() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	public UserFullDetails getUserfulldetails() {
		return userfulldetails;
	}
	public void setUserfulldetails(UserFullDetails userfulldetails) {
		this.userfulldetails = userfulldetails;
	}

  
    // Getters and setters
}

