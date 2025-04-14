package com.example.HReservation.Service;

import com.example.HReservation.Model.Favorite;
import com.example.HReservation.Model.Product;
import com.example.HReservation.Repository.FavoriteRepository;
import com.example.HReservation.Repository.ProductRepository;
import com.example.HReservation.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FavoriteService {
    @Autowired
    private FavoriteRepository favoriteRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    public List<Product> getFavoriteProducts(Long userId) {
        return favoriteRepository.findByUserId(userId)
                .stream()
                .map(Favorite::getProduct)
                .collect(Collectors.toList());
    }

    public void toggleFavorite(Long userId, Long productId) {
        Optional<Favorite> favorite = favoriteRepository.findByUserIdAndProductId(userId, productId);
        if (favorite.isPresent()) {
            favoriteRepository.delete(favorite.get());
        } else {
            Favorite newFavorite = new Favorite();
            newFavorite.setUser(userRepository.findById(userId).orElseThrow());
            newFavorite.setProduct(productRepository.findById(productId).orElseThrow());
            favoriteRepository.save(newFavorite);
        }
    }
}
