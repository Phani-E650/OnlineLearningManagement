package com.application.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.application.demo.entity.AnnouncementEntity;
import com.application.demo.entity.assignmentsubmEntity;

public interface AssignmentSubmission extends JpaRepository<assignmentsubmEntity, Long> {
}