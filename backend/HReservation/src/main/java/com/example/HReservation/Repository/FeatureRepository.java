package com.example.HReservation.Repository;

import com.example.HReservation.Model.Feature;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeatureRepository extends JpaRepository<Feature, Long> {
        boolean existsByName(String name);
}
