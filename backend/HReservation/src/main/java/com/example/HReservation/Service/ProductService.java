package com.example.HReservation.Service;

import com.example.HReservation.Model.Category;
import com.example.HReservation.Model.CategoryDTO;
import com.example.HReservation.Model.Product;
import com.example.HReservation.Model.ProductDTO;
import com.example.HReservation.Repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final ImageService imageService;

    @Autowired
    public ProductService(ProductRepository productRepository, ImageService imageService) {
        this.productRepository = productRepository;
        this.imageService = imageService;
    }

    public List<Product> getProducts() {
        return productRepository.findAll();
    }

    public Product addProduct(Product product, List<MultipartFile> images) throws Exception {
        if (productRepository.existsByProductName(product.getProductName())) {
            throw new Exception("El nombre del producto ya está en uso");
        }

        // Guardar imágenes en una carpeta local
        List<String> imagePaths = saveImages(images);
        product.setImages(imagePaths);
        return productRepository.save(product);
    }

    public Product updateProduct(Product product, List<MultipartFile> images) throws IOException {
        // Si hay imágenes nuevas, se actualizan
        if (images != null && !images.isEmpty()) {
            List<String> newImagePaths = saveImages(images);
            product.setImages(newImagePaths);
        }

        return productRepository.save(product);
    }

    private List<String> saveImages(List<MultipartFile> images) throws IOException {
        List<String> imagePaths = new ArrayList<>();
        String uploadDir = "uploads/";

        // Crear el directorio si no existe
        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        for (MultipartFile image : images) {
            String fileName = UUID.randomUUID().toString() + "_" + image.getOriginalFilename();
            Path path = uploadPath.resolve(fileName);
            Files.write(path, image.getBytes());
            imagePaths.add(fileName);
        }
        return imagePaths;
    }

    public List<Product> getRandomProducts(int max) {
        List<Product> allProducts = productRepository.findAll();
        Collections.shuffle(allProducts);
        return allProducts.stream().limit(max).collect(Collectors.toList());
    }

    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    public Page<Product> getPaginatedProducts(Pageable pageable) {
        return productRepository.findAll(pageable);
    }

    public boolean eliminarProducto(Long id) {
        Optional<Product> product = productRepository.findById(id);
        if (product.isPresent()) {
            productRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

}