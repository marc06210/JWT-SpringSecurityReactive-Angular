package com.mgu.mlnba;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

@SpringBootApplication
public class MlnbaApplication {


    public static void main(String[] args) {
        SpringApplication.run(MlnbaApplication.class, args);
    }

    // @Bean
    CorsWebFilter corsFilter2() {
        return new CorsWebFilter(exchange -> new CorsConfiguration().applyPermitDefaultValues());
    }

    // @Bean
    CorsWebFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.addAllowedOrigin("http://localhost:4200");
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/api/team", config);
        source.registerCorsConfiguration("/api/member", config);

        return new CorsWebFilter(source);
    }

}
