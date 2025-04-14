import React, { useEffect, useState } from "react";    
import { useNavigate } from "react-router-dom";
import { getProductos } from "../services/ProductService";
import axios from "axios";
import CaracteristicasButton from "./CaracteristicasButton";


const ListaProductos = () => {
    const [productos, setProductos] = useState([]);
    const [favoritos, setFavoritos] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Función para obtener los productos
    const fetchProductos = async () => {
        try {
            const data = await getProductos();
            console.log("Productos obtenidos:", data);
            if (Array.isArray(data)) {
                setProductos(data);
            } else {
                console.error("La API no devolvió un array:", data);
                setError("Error al cargar productos.");
            }
        } catch (error) {
            console.error("Error en la API:", error);
            setError("No se pudieron cargar los productos.");
        }
    };

    // Función para eliminar un producto
    const eliminarProducto = async (id) => {
        const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar este producto?");
        if (!confirmacion) return;

        try {
            const response = await fetch(`http://localhost:8080/api/productos/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
    
            alert("Producto eliminado exitosamente.");
            // Actualizar la lista de productos en el frontend
            fetchProductos();
        } catch (error) {
            console.error("Error eliminando producto:", error);
        }
    };

    useEffect(() => {
        fetchProductos();
        axios.get("http://localhost:8080/productos")
        .then(response => {
          setProductos(response.data);
        })
        .catch(error => {
          console.error("Error al obtener productos:", error);
        });
    }, []);
    // Función para manejar favoritos
  const toggleFavorito = (id) => {
    setFavoritos((prevFavoritos) =>
      prevFavoritos.includes(id)
        ? prevFavoritos.filter((favId) => favId !== id) // Quitar si ya está en favoritos
        : [...prevFavoritos, id] // Agregar si no está en favoritos
    );
  };

    return (
        <div>
            <h2>Lista de Productos</h2>

            {error ? (
                <p style={{ color: "red" }}>{error}</p>
            ) : (
                <table className="tabla-productos">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Categoría</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productos.map((producto) => (
                            <tr key={producto.id}>
                                <td>{producto.id}</td>
                                <td>{producto.productName}</td>
                                <button onClick={() => toggleFavorito(producto.id)}>
                                 {favoritos.includes(producto.id) ? "💖" : "🤍"}
                                </button>
                                <td>{producto.categoryId ? `Categoría ${producto.categoryId}` : "Sin categoría"}</td>
                                <td>
                                    <button onClick={() => navigate(`/editar/${producto.id}`)}>Editar</button>
                                    <button onClick={() => eliminarProducto(producto.id)}>Eliminar producto</button>
                                    <button onClick={() => navigate(`/producto/${producto.id}`)}>Ver producto</button>
                                    <CaracteristicasButton />
                                    
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ListaProductos;