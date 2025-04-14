package com.example.HReservation.Configuration;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.nio.file.Paths;

@Configuration
public class WebConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/uploads/**")
                        .allowedOrigins("http://localhost:3000") // Permite solicitudes desde React
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*");


            }

            @Override
            public void addResourceHandlers(ResourceHandlerRegistry registry) {
                String uploadDir = Paths.get("uploads").toAbsolutePath().toString();

                registry.addResourceHandler("/api/images/**")
                        .addResourceLocations("file:" + uploadDir + "/"); // Asegurar prefijo "file:"
                registry.addResourceHandler("/uploads/**")
                        .addResourceLocations("file:uploads/");
            }
        };
    }
}




