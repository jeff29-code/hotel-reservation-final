import React, { useEffect, useState } from "react";  
import { useParams, useNavigate } from "react-router-dom";

const EditarProducto = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [producto, setProducto] = useState({
        productName: "",
        description: "",  // Agregamos description con un valor por defecto
        categoryId: "",
    });
    const [categorias, setCategorias] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducto = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/productos/${id}`);
                if (!response.ok) throw new Error("No se pudo cargar el producto");
                const data = await response.json();
                console.log("Producto cargado:", data);

                setProducto({
                    productName: data.productName,
                    description: data.description || "Sin descripción", // Asegurar valor por defecto
                    categoryId: data.categoryId || "",
                });
            } catch (error) {
                setError(error.message);
            }
        };

        const fetchCategorias = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/categorias");
                if (!response.ok) throw new Error("No se pudieron cargar las categorías");
                const data = await response.json();

                const categoriasUnicas = Array.from(new Map(data.map(cat => [cat.id, cat])).values());
                setCategorias(categoriasUnicas);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchProducto();
        fetchCategorias();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProducto(prevState => ({
            ...prevState,
            [name]: name === "categoryId" ? (value ? Number(value) : null) : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Evitar que la página se recargue

        if (!producto.description.trim()) {
            alert("La descripción no puede estar vacía");
            return;
        }

        const formData = new FormData();
        const updatedProduct = {
            ...producto,
            description: producto.description || "Sin descripción", // Asegurar valor por defecto antes de enviar
        };

        formData.append("product", JSON.stringify(updatedProduct));

        if (producto.images && producto.images.length > 0) {
            producto.images.forEach((image) => {
                formData.append("images", image);
            });
        }

        try {
            const response = await fetch(`http://localhost:8080/api/productos/${id}`, {
                method: "PUT",
                body: formData
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error en el servidor:", errorData);
                throw new Error(errorData.message || "Error al actualizar el producto");
            }

            alert("Producto actualizado correctamente");
            navigate("/administracion");
        } catch (error) {
            console.error("Error al actualizar el producto:", error);
            alert(error.message);
        }
    };

    return (
        <div>
            <h2>Editar Producto</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre del Producto:</label>
                    <input
                        type="text"
                        name="productName"
                        value={producto.productName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Descripción:</label>
                    <textarea
                        name="description"
                        value={producto.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Categoría:</label>
                    <select name="categoryId" value={producto.categoryId} onChange={handleChange} required>
                        <option value="">Seleccione una categoría</option>
                        {categorias.length > 0 ? (
                            categorias.map((cat) => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))
                        ) : (
                            <option disabled>Cargando categorías...</option>
                        )}
                    </select>
                </div>
                <button type="submit">Guardar Cambios</button>
                <button type="button" onClick={() => navigate("/administracion")}>Cancelar</button>
            </form>
        </div>
    );
};

export default EditarProducto;