package com.application.demo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.application.demo.entity.Enrollment;
import com.application.demo.entity.ModuleEntity;

@Repository
public interface ModuleRepository extends JpaRepository<ModuleEntity, Long> {

	List<ModuleEntity> findByCoursenameAndInstructorname(String courseName, String instructorName);
	List<ModuleEntity> findByInstructornameAndCoursename(String value1, String value2);
	 Optional<ModuleEntity> findByModulenameAndCoursenameAndInstructorname(String moduleName, String courseName, String instructorName);
    // You can add custom query methods if needed
}