package com.example.HReservation.Model;

public class ProductRequestDTO {

    private String productName;
    private String description;
    private Long categoryId;
    private boolean random;

    public ProductRequestDTO() {}

    public ProductRequestDTO(String productName, String description, Long categoryId) {
        this.productName = productName;
        this.description = description;
        this.categoryId = categoryId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }

    public boolean isRandom() {
        return random;
    }

    public void setRandom(boolean random) {
        this.random = random;
    }
}

