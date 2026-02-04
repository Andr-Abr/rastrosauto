package com.fsa.crudvehiculos.springbootfsa.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/angular/**")
                .addResourceLocations("classpath:/static/angular/");
                
        registry.addResourceHandler("/angular/browser/**")
                .addResourceLocations("classpath:/static/angular/browser/");
    }
}