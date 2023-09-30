package com.application.demo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

//package com.application.demo.entity;
//
//public class UserTemp {
//
//}
//import javax.persistence.*;

@Entity
@Table(name = "user_temp")
public class UserTemp {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column()
    private String status;
    
   public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	@Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String role;

    public UserTemp() {
    }

   

	public UserTemp(Long id, String status, String email, String role) {
		super();
		this.id = id;
		this.status = status;
		this.email = email;
		this.role = role;
	}

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

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

    // Getters and setters
}

