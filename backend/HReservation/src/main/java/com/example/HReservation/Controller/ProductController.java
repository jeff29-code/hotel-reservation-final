package com.example.HReservation.Controller;

import com.example.HReservation.Model.Category;
import com.example.HReservation.Model.Product;
import com.example.HReservation.Model.ProductDTO;
import com.example.HReservation.Model.Provider;
import com.example.HReservation.Repository.CategoryRepository;
import com.example.HReservation.Repository.ProductRepository;
import com.example.HReservation.Service.ProductService;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.ResponseEntity;
import org.springframework.http.MediaType;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/productos")
@CrossOrigin(origins = "http://localhost:3000") // Permite acceso desde React
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductService productService;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @GetMapping("/listar")
    public ResponseEntity<List<Product>> listarTodosLosProductos() {
        List<Product> productos = productRepository.findAll();
        return ResponseEntity.ok(productos);
    }

    @PostMapping(value = "", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> addProduct(
            @RequestPart("product") String productJson,
            @RequestPart(value = "images", required = false) List<MultipartFile> images) {
        try {
            ProductDTO productDTO = objectMapper.readValue(productJson, ProductDTO.class);

            if (productDTO.getCategoryId() == null) {
                return ResponseEntity.badRequest().body("Error: El producto debe tener una categoría.");
            }

            Optional<Category> categoryOpt = categoryRepository.findById(productDTO.getCategoryId());
            if (categoryOpt.isEmpty()) {
                return ResponseEntity.badRequest().body("Error: La categoría proporcionada no existe.");
            }

            Product product = new Product();
            product.setProductName(productDTO.getProductName());
            product.setDescription(productDTO.getDescription());
            product.setCategory(categoryOpt.get());
            product.setRandom(productDTO.getRandom());

            Product savedProduct = productService.addProduct(product, images != null ? images : new ArrayList<>());

            List<String> imageUrls = savedProduct.getImages().stream()
                    .map(image -> "http://localhost:8080/uploads/" + image)
                    .collect(Collectors.toList());

            Provider provider = savedProduct.getProvider();
            ProductDTO responseDTO = new ProductDTO(
                    savedProduct.getId(),
                    savedProduct.getProductName(),
                    savedProduct.getDescription(),
                    imageUrls,
                    savedProduct.getCategory().getId(),
                    provider != null ? provider.getName() : null,
                    provider != null ? provider.getPhone() : null
            );

            return ResponseEntity.ok(responseDTO);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al procesar la solicitud: " + e.getMessage());
        }
    }

    @GetMapping("/random")
    public ResponseEntity<List<ProductDTO>> getRandomProducts() {
        List<Product> randomProducts = productRepository.findByRandomTrue();

        List<ProductDTO> randomProductDTOs = randomProducts.stream()
                .limit(10) // Solo los primeros 10 aleatorios (puede aplicar lógica más compleja si querés)
                .map(product -> {
                    List<String> imageUrls = product.getImages().stream()
                            .map(img -> img.startsWith("http") ? img : "http://localhost:8080/uploads/" + img)
                            .collect(Collectors.toList());

                    Provider provider = product.getProvider();

                    return new ProductDTO(
                            product.getId(),
                            product.getProductName(),
                            product.getDescription(),
                            imageUrls,
                            product.getCategory().getId(),
                            provider != null ? provider.getName() : null,
                            provider != null ? provider.getPhone() : null
                    );
                }).toList();

        return ResponseEntity.ok(randomProductDTOs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable Long id) {
        return productService.getProductById(id)
                .map(product -> {
                    List<String> imageUrls = (product.getImages() != null)
                            ? product.getImages().stream()
                            .map(image -> "http://localhost:8080/uploads/" + Paths.get(image).getFileName().toString())
                            .collect(Collectors.toList())
                            : List.of("https://via.placeholder.com/150");

                    Provider provider = product.getProvider();
                    return ResponseEntity.ok(new ProductDTO(
                            product.getId(),
                            product.getProductName(),
                            product.getDescription(),
                            imageUrls,
                            product.getCategory().getId(),
                            provider != null ? provider.getName() : null,
                            provider != null ? provider.getPhone() : null
                    ));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> actualizarProducto(@PathVariable Long id, @RequestPart("product") String productJson,
                                                @RequestPart(value = "images", required = false) List<MultipartFile> images) {
        try {
            ProductDTO productDTO = objectMapper.readValue(productJson, ProductDTO.class);

            Optional<Product> productOpt = productRepository.findById(id);
            if (productOpt.isEmpty()) {
                return ResponseEntity.notFound().build();
            }

            Product product = productOpt.get();
            product.setProductName(productDTO.getProductName());
            product.setDescription(productDTO.getDescription());

            if (productDTO.getCategoryId() != null) {
                Optional<Category> categoryOpt = categoryRepository.findById(productDTO.getCategoryId());
                if (categoryOpt.isPresent()) {
                    product.setCategory(categoryOpt.get());
                } else {
                    return ResponseEntity.badRequest().body("Error: La categoría no existe.");
                }
            }

            if (images == null || images.isEmpty()) {
                productService.saveProduct(product);
            } else {
                productService.updateProduct(product, images);
            }

            List<String> imageUrls = product.getImages().stream()
                    .map(image -> "http://localhost:8080/uploads/" + image)
                    .collect(Collectors.toList());

            Provider provider = product.getProvider();
            ProductDTO responseDTO = new ProductDTO(
                    product.getId(),
                    product.getProductName(),
                    product.getDescription(),
                    imageUrls,
                    product.getCategory().getId(),
                    provider != null ? provider.getName() : null,
                    provider != null ? provider.getPhone() : null
            );

            return ResponseEntity.ok(responseDTO);

        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al actualizar el producto: " + e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<ProductDTO>> listProduct(
            @RequestParam(required = false) Integer page,
            @RequestParam(required = false) Integer size,
            @RequestParam(defaultValue = "productName") String sortBy) {

        List<Product> productos;

        if (page == null || size == null) {
            productos = productService.getProducts();
        } else {
            Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));
            productos = productService.getPaginatedProducts(pageable).getContent();
        }

        List<ProductDTO> response = productos.stream()
                .map(product -> new ProductDTO(
                        product.getId(),
                        product.getProductName(),
                        product.getDescription(),
                        (product.getImages() != null && !product.getImages().isEmpty())
                                ? product.getImages().stream()
                                .map(image -> "http://localhost:8080/uploads/" + Paths.get(image).getFileName().toString())
                                .collect(Collectors.toList())
                                : List.of("https://via.placeholder.com/150"),
                        product.getCategory().getId(),
                        product.getProvider() != null ? product.getProvider().getName() : null,
                        product.getProvider() != null ? product.getProvider().getPhone() : null
                ))
                .collect(Collectors.toList());

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarProducto(@PathVariable Long id) {
        if (productService.eliminarProducto(id)) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/uploads/{filename}")
    public ResponseEntity<Resource> getFile(@PathVariable String filename) {
        try {
            Path uploadDir = Paths.get("uploads");
            Path filePath = uploadDir.resolve(filename).normalize();

            if (!Files.exists(filePath)) {
                return ResponseEntity.notFound().build();
            }

            Resource resource = new UrlResource(filePath.toUri());

            if (resource.exists() && resource.isReadable()) {
                String contentType = Files.probeContentType(filePath);
                MediaType mediaType = (contentType != null) ? MediaType.parseMediaType(contentType) : MediaType.APPLICATION_OCTET_STREAM;

                return ResponseEntity.ok()
                        .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + filePath.getFileName().toString() + "\"")
                        .contentType(mediaType)
                        .body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}




