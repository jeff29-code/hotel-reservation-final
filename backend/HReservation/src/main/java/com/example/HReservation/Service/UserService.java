package com.example.HReservation.Service;

import com.example.HReservation.Model.RegisterRequest;
import com.example.HReservation.Model.User;
import com.example.HReservation.Repository.UserRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostConstruct
    public void verifyInjection() {
        System.out.println("PasswordEncoder inyectado correctamente: " + (passwordEncoder != null));
    }
    public void registerUser(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("El correo ya está en uso.");
        }

        // Verifica si la encriptación funciona
        String encodedPassword = passwordEncoder.encode(request.getPassword());
        System.out.println("Contraseña encriptada antes de guardar: " + encodedPassword);

        User newUser = new User(
                request.getFirstName(),
                request.getLastName(),
                request.getEmail(),
                encodedPassword, // Encriptar contraseña antes de guardar
                "USER"
        );

        userRepository.save(newUser);
    }
}

