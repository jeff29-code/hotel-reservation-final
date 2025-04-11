import React, { createContext, useState, useEffect } from "react";

export const ProductContext = createContext();

const API_URL = "http://localhost:8080/api/productos";

// Función para obtener productos desde la API
export const getProductos = async () => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error obteniendo productos:", error);
        return [];
    }
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getProductos(); // Llamamos a la nueva función
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const addProduct = async (formData) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Error adding product");
      fetchProducts();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <ProductContext.Provider value={{ products, fetchProducts, addProduct }}>
      {children}
    </ProductContext.Provider>
  );
};                               