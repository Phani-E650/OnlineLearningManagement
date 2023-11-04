package com.application.demo.controller;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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

import com.application.demo.entity.CourseEntity;
import com.application.demo.entity.ModuleEntity;
import com.application.demo.entity.VideoContent;
import com.application.demo.repository.CourseRepository;
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
	@Autowired
	private CourseRepository courseRepo;
	

	 @PostMapping("/add")
	    public ResponseEntity<?> addModule(@RequestBody ModuleEntity module) {
		 Optional<CourseEntity> course=courseRepo.findById(module.getId());
		 List<ModuleEntity> moduleslist=course.get().getModuleslist();
		 List<ModuleEntity> singlemodule = moduleslist.stream()
	                .filter(modu -> modu.getModulename().equals(module.getModulename()))
	                .collect(Collectors.toList());
//			 ModuleEntity exist=moduleService.findModule(module.getModulename(),module.getCoursename(),module.getInstructorname());
		    	if(singlemodule.size()>0) {
		    		return ResponseEntity.status(HttpStatus.CONFLICT).body("module already exists");
		    	}
		    	
		         return ResponseEntity.ok(moduleService.savemodule(module));
	    }

    @GetMapping("/list")
    public List<ModuleEntity> listModules() {
        return moduleService.getAllModules();
    }


    @GetMapping("/getmodulesbyid/{id}")
    public List<ModuleEntity> getModulesById(
            @PathVariable Long id
    ) {
    	 Optional<CourseEntity> course=courseRepo.findById(id);
    	return course.get().getModuleslist();
    }
    @DeleteMapping("/{moduleId}")
    public void deleteModule(@PathVariable Long moduleId) {
        moduleService.deleteModuleAndContents(moduleId);
    }
    @PutMapping("/{moduleId}/{updatedModule}")
    public ResponseEntity<?> updateModule(@PathVariable Long moduleId, @PathVariable String  updatedModule) {

    	CourseEntity modi=modulerepo.findById(moduleId).get().getCourse();
//         Optional<CourseEntity> course=courseRepo.findById(moduleId);
		 List<ModuleEntity> moduleslist=modi.getModuleslist();
		 List<ModuleEntity> singlemodule = moduleslist.stream()
	                .filter(modu -> modu.getModulename().equals(updatedModule))
	                .collect(Collectors.toList());
//			 ModuleEntity exist=moduleService.findModule(module.getModulename(),module.getCoursename(),module.getInstructorname());
		    	if(singlemodule.size()>0) {
		    		return ResponseEntity.status(HttpStatus.CONFLICT).body("module already exists");
		    	}
		    	
		         return ResponseEntity.ok(moduleService.updateModule(moduleId, updatedModule));
    }
}
