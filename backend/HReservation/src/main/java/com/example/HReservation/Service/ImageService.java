package com.example.HReservation.Service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;

    @Service
    public class ImageService {

        private final Path uploadDir = Paths.get("uploads");

        public List<String> saveImages(List<MultipartFile> images) {
            try {
                if (!Files.exists(uploadDir)) {
                    Files.createDirectories(uploadDir);
                }

                return images.stream().map(image -> {
                    try {
                        Path filePath = uploadDir.resolve(image.getOriginalFilename());
                        Files.write(filePath, image.getBytes());
                        return image.getOriginalFilename(); // Solo el nombre de la imagen
                    } catch (Exception e) {
                        throw new RuntimeException("Error al guardar la imagen", e);
                    }
                }).collect(Collectors.toList());
            } catch (Exception e) {
                throw new RuntimeException("Error al crear el directorio de imágenes", e);
            }
        }
    }
