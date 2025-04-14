package com.example.HReservation.Model;

import org.springframework.beans.factory.annotation.Value;

import java.util.List;
import java.util.stream.Collectors;

public class ProductDTO {
    private Long id;
    private String productName;
    private String description;
    private List<String> images;
    private Long categoryId;
    private String providerName;
    private String providerPhone;
    private Boolean random;


    public ProductDTO(Long id, String productName, String description, List<String> images, Long categoryId,String providerName, String providerPhone ) {
        this.id = id;
        this.productName = productName;
        this.description = description;
        this.images = (images != null) ? images.stream()
                .map(image -> image.startsWith("http") ? image : "http://localhost:8080/uploads/" + image)
                .collect(Collectors.toList()) : List.of("https://via.placeholder.com/150"); // Imagen por defecto
        this.categoryId = categoryId;
        this.providerName = providerName;
        this.providerPhone = providerPhone;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getProductName() { return productName; }
    public void setProductName(String productName) { this.productName = productName; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public List<String> getImages() { return images; }

    public Long getCategoryId() { return categoryId; }
    public void setCategoryId(Long categoryId) { this.categoryId = categoryId; }

    public Boolean getRandom() {
        return random;
    }

    public void setRandom(Boolean random) {
        this.random = random;
    }

}




