package com.application.demo.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.application.demo.entity.UserFullDetails;

	public interface  LoginRepository extends JpaRepository<UserFullDetails, Long> {
	    UserFullDetails findByEmail(String email);
	}



