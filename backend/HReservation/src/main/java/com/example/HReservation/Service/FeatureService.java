package com.example.HReservation.Service;

import com.example.HReservation.Model.Feature;
import com.example.HReservation.Repository.FeatureRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FeatureService {

    private final FeatureRepository featureRepository;

    public FeatureService(FeatureRepository featureRepository) {
        this.featureRepository = featureRepository;
    }

    public List<Feature> getAllFeatures() {
        return featureRepository.findAll();
    }

    public Optional<Feature> getFeatureById(Long id) {
        return featureRepository.findById(id);
    }

    @Transactional
    public Feature createFeature(Feature feature) {
        if (featureRepository.existsByName(feature.getName())) {
            throw new IllegalArgumentException("Feature with this name already exists.");
        }
        return featureRepository.save(feature);
    }

    @Transactional
    public Feature updateFeature(Long id, Feature updatedFeature) {
        Feature feature = featureRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Feature not found"));

        feature.setName(updatedFeature.getName());
        feature.setIcon(updatedFeature.getIcon());
        return featureRepository.save(feature);
    }

    @Transactional
    public void deleteFeature(Long id) {
        if (!featureRepository.existsById(id)) {
            throw new IllegalArgumentException("Feature not found");
        }
        featureRepository.deleteById(id);
    }
}

