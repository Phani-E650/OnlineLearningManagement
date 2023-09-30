package com.application.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.modelmapper.ModelMapper;

@SpringBootApplication
public class ElearnApplication {

	public static void main(String[] args) {
		SpringApplication.run(ElearnApplication.class, args);
	}
	 @Bean
	    public ModelMapper modelMapper() {
	        return new ModelMapper();
	    }


}
