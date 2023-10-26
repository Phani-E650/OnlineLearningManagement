package com.application.demo.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.application.demo.entity.ModuleEntity;
import com.application.demo.entity.VideoContent;
import com.application.demo.repository.ModuleRepository;
import com.application.demo.service.ModuleService;
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/modules")
public class Modulescontroller {
	@Autowired
	ModuleService moduleService;
	@Autowired
	ModuleRepository modulerepo;
	 @PostMapping("/add")
    public ResponseEntity<?> addModule(@RequestBody ModuleEntity module) {
		 ModuleEntity exist=moduleService.findModule(module.getModulename(),module.getCoursename(),module.getInstructorname());
	    	if(exist!=null) {
	    		return ResponseEntity.status(HttpStatus.CONFLICT).body("Video content already exists");
	    	}
	    	
	         return ResponseEntity.ok(moduleService.savemodule(module));
    }

    @GetMapping("/list")
    public List<ModuleEntity> listModules() {
        return moduleService.getAllModules();
    }

    @GetMapping("/getmodules/{instructor}/{course}")
    public List<ModuleEntity> getModulesByCourseAndInstructor(
            @PathVariable String course,
            @PathVariable String instructor
    ) {
        return moduleService.getModulesByCourseAndInstructor(course, instructor);
    }
    @DeleteMapping("/{moduleId}")
    public ResponseEntity<String> deleteModule(@PathVariable Long moduleId) {
        moduleService.deleteModuleAndContents(moduleId);
        return new ResponseEntity<>("Module and associated video contents deleted successfully", HttpStatus.OK);
    }
    @PutMapping("/{moduleId}/{updatedModule}")
    public ResponseEntity<?> updateModule(@PathVariable Long moduleId, @PathVariable String  updatedModule) {
//        ModuleEntity updated = moduleService.updateModule(moduleId, updatedModule);
//        return new ResponseEntity<>(updated, HttpStatus.OK);
    	Optional<ModuleEntity> existingModule = modulerepo.findById(moduleId);
        ModuleEntity exist=moduleService.findModule(updatedModule,existingModule.get().getCoursename(),existingModule.get().getInstructorname());
    	if(exist!=null) {
    		return ResponseEntity.status(HttpStatus.CONFLICT).body("Video content already exists");
    	}
    	
         return ResponseEntity.ok(moduleService.updateModule(moduleId, updatedModule));
    }
}
