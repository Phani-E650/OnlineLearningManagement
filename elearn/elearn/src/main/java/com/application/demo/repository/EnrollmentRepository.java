package com.application.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.application.demo.entity.CourseEntity;
import com.application.demo.entity.Enrollment;

@Repository
public interface EnrollmentRepository extends JpaRepository<Enrollment, Long>{
//	List<CourseEntity> findByProfessorName(String professorName);
	List<Enrollment> findByInstructornameAndCoursename(String value1, String value2);
	
	@Query("SELECT e.enrolledusername FROM Enrollment e")
    List<String> findAllEmails();

	List<Enrollment> findByEnrolledusernameAndCoursenameAndInstructorname(String enrolledusername, String coursename,
			String instructorname);
}


