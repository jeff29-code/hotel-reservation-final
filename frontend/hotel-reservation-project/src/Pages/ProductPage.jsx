import { useEffect, useState } from "react";
import ProductGallery from "../components/ProductGallery";

export default function ProductPage() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/productos")
      .then(response => response.json())
      .then(data => {
        console.log("Productos aleatorios recibidos:", data); 
        const imageUrls = data.flatMap(product => product.imagenes);
        console.log("URLs de imágenes extraídas:", imageUrls);
        
        setImages(imageUrls); // ✅ Ahora solo guardamos la lista de imágenes correctamente
      })
      .catch(error => console.error("Error al obtener productos:", error));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Galería del Producto</h1>
      <ProductGallery images={images} />
    </div>
  );
}