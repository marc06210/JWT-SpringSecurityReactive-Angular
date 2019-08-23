package com.mgu.mlnba;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.config.CorsRegistry;
import org.springframework.web.reactive.config.EnableWebFlux;
import org.springframework.web.reactive.config.WebFluxConfigurer;

@Configuration
@EnableWebFlux
public class WebConfig implements WebFluxConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {

        registry.addMapping("/api/member/**")
            .allowedOrigins("http://localhost:4200", "http://localhost:3000")
            .allowedMethods("OPTIONS", "GET", "POST", "PUT")// ,"DELETE")
            .allowedHeaders("Access-Control-Allow-Origin")
//            .allowedHeaders("header1", "header2", "header3")
//            .exposedHeaders("header1", "header2")
            .allowCredentials(true).maxAge(3600);
/*
        // Add more mappings...
        registry.addMapping("/login")
        .allowedOrigins("http://localhost:4200")
        .allowedMethods("OPTIONS", "GET", "POST")//"PUT", "DELETE")
//        .allowedHeaders("header1", "header2", "header3")
//        .exposedHeaders("header1", "header2")
        .allowCredentials(true).maxAge(3600);
        */
    }
}
