package com.example.HReservation.Service;

import com.example.HReservation.Model.Product;
import com.example.HReservation.Repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class RandomProductService {

    private final ProductRepository productRepository;

    public RandomProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getRandomProducts(int quantity) {
        List<Product> allProducts = productRepository.findAll();
        Collections.shuffle(allProducts);
        return allProducts.stream().limit(quantity).toList();
    }
}
