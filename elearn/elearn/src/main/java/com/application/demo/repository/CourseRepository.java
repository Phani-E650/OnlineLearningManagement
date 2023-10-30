package com.application.demo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.application.demo.entity.CourseEntity;

@Repository
public interface CourseRepository extends JpaRepository<CourseEntity, Long>{
	List<CourseEntity> findByProfessorName(String professorName);
	CourseEntity findByCourseNameAndProfessorName(String courseName, String professorName);
	CourseEntity findByCourseNameAndProfessorNameAndCategory(String courseName, String professorName, String Category);
//	Optional<CourseEntity> findById(Long id);
}
