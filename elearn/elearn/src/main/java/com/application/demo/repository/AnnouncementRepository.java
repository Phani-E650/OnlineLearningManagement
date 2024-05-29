package com.application.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.application.demo.entity.AnnouncementEntity;

public interface AnnouncementRepository extends JpaRepository<AnnouncementEntity, Long> {
}
