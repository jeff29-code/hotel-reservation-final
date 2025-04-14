package com.example.HReservation.Controller;

import com.example.HReservation.Model.Product;
import com.example.HReservation.Service.FavoriteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/favorites")
@CrossOrigin("*")
public class FavoriteController {
    @Autowired
    private FavoriteService favoriteService;

    @GetMapping("/{userId}")
    public ResponseEntity<List<Product>> getFavorites(@PathVariable Long userId) {
        return ResponseEntity.ok(favoriteService.getFavoriteProducts(userId));
    }

    @PostMapping("/{userId}/{productId}")
    public ResponseEntity<Void> toggleFavorite(@PathVariable Long userId, @PathVariable Long productId) {
        favoriteService.toggleFavorite(userId, productId);
        return ResponseEntity.ok().build();
    }
}
