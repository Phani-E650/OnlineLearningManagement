package com.application.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.application.demo.entity.AssignmentEntity;

@Repository
public interface AssignmentRepository extends JpaRepository<AssignmentEntity, Long> {
	@Query("SELECT a.fileName FROM AssignmentEntity a WHERE a.course.id = :courseId")
    List<String> findFileNamesByCourseId(@Param("courseId") String courseId);

	AssignmentEntity getAssignmentByFileName(String fileName);
}

