package com.example.HReservation.Controller;

import com.example.HReservation.Model.Category;
import com.example.HReservation.Service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categorias")
@CrossOrigin(origins = "http://localhost:3000") // Permitir solicitudes desde React
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    // Endpoint para crear una categoría
    @PostMapping
    public Category createCategory(@RequestBody Category category) {
        return categoryService.saveCategory(category);
    }

    @GetMapping
    public List<Category> getCategories() {
        return categoryService.getAllCategories();
    }
    // Endpoint para obtener una categoría por ID
    @GetMapping("/{id}")
    public Category getCategoryById(@PathVariable Long id) {
        return categoryService.getCategoryById(id);
    }
}

