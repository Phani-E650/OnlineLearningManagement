package com.application.demo;


import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport;

@Configuration
public class CorsConfig extends WebMvcConfigurationSupport {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Define the URL patterns you want to allow CORS for
            .allowedOrigins("http://localhost:4200") // Allow requests from this origin
            .allowedMethods("GET", "POST", "PUT", "DELETE") // Allow these HTTP methods
            .allowedHeaders("Origin", "X-Requested-With", "Content-Type", "Accept") // Allow these headers
            .maxAge(3600); // Allow CORS preflight requests to be cached for 1 hour
    }
}

