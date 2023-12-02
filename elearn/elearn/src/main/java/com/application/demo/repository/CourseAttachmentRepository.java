package com.application.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.application.demo.entity.CourseAttachmentsEntity;

public interface CourseAttachmentRepository extends JpaRepository<CourseAttachmentsEntity, Long> {
   
}

