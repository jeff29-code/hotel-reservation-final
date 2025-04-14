package com.example.HReservation.Controller;

import com.example.HReservation.Model.Product;
import com.example.HReservation.Service.RandomProductService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/random-products")
@CrossOrigin(origins = "http://localhost:3000")
public class RandomProductController {

    private final RandomProductService randomProductService;

    public RandomProductController(RandomProductService randomProductService) {
        this.randomProductService = randomProductService;
    }

    @GetMapping
    public List<Product> getRandomProducts() {
        return randomProductService.getRandomProducts(10); // 10 productos aleatorios
    }
}

