package com.application.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.application.demo.entity.VideoContent;

@Repository
public interface VideoContentRepository extends JpaRepository<VideoContent, Long> {
}
