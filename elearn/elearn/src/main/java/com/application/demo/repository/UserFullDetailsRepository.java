package com.application.demo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.application.demo.entity.UserFullDetails;


//public class UserFullDetailsRepository {
//
//}
public interface UserFullDetailsRepository extends JpaRepository<UserFullDetails, Long> {
	Optional<UserFullDetails> findByEmail(String email);

	Optional<UserFullDetails> findByEmailAndOtp(String email, String otp);
	
}
