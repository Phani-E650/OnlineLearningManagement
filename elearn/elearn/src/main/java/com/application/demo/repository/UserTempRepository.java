package com.application.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.application.demo.entity.UserTemp;

//public class UserTempRepository {
//
//}
public interface UserTempRepository extends JpaRepository<UserTemp, Long> {
    UserTemp findByEmail(String email);
}


