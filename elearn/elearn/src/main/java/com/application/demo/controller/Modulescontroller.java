package com.application.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.application.demo.entity.ModuleEntity;
import com.application.demo.service.ModuleService;
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/modules")
public class Modulescontroller {
	@Autowired
	ModuleService moduleService;
	 @PostMapping("/add")
    public ModuleEntity addModule(@RequestBody ModuleEntity module) {
        return moduleService.savemodule(module);
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
}
