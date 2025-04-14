package com.example.HReservation;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan(basePackages = {"com.example.HReservation.Service", "com.example.HReservation.Repository", "com.example.HReservation.Controller","com.example.HReservation.Config"})
@EntityScan(basePackages = "com.example.HReservation.Model")
@EnableJpaRepositories("com.example.HReservation.Repository")

public class HReservationApplication {

	public static void main(String[] args) {
		SpringApplication.run(HReservationApplication.class, args);
	}

}
