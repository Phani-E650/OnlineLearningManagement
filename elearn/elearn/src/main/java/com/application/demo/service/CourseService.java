package com.application.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.application.demo.entity.CourseEntity;
import com.application.demo.repository.CourseRepository;

@Service
public class CourseService {
	
	@Autowired
	private CourseRepository courseRepo;
	
	public CourseEntity saveCourse(CourseEntity course)
	{
		return courseRepo.save(course);
	}
	
	public CourseEntity addNewCourse(CourseEntity course)
	{
		return courseRepo.save(course);
	}
	
	public List<CourseEntity> getAllCourses()
	{
		return (List<CourseEntity>)courseRepo.findAll();
	}
	
	
	

    public List<CourseEntity> getCoursesByProfessorName(String professorName) {
        return courseRepo.findByProfessorName(professorName);
    }

}
