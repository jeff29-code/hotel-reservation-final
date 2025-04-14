package com.example.HReservation.Configuration;

import com.example.HReservation.Model.User;
import com.example.HReservation.Repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner createDefaultUsers(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            // Crear solo si no existen, sin asumir que el ID será 1 o 2
            if (!userRepository.existsByEmail("admin@example.com")) {
                User admin = new User(
                        "Admin",
                        "User",
                        "admin@example.com",
                        passwordEncoder.encode("admin123"),
                        "ADMIN"
                );
                userRepository.save(admin);
                System.out.println("Usuario ADMIN creado: admin@example.com / admin123");
            }


            // Mostrar todos los usuarios creados en la base de datos
            System.out.println("Usuarios actuales en la base de datos:");
            userRepository.findAll().forEach(u ->
                    System.out.println("ID: " + u.getId() + " | Nombre: " + u.getFirstName() + " | Email: " + u.getEmail())
            );
        };
    }
}