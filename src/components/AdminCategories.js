import React, { useEffect, useState } from "react";
import { getCategories, createCategory, deleteCategory } from "../services/CategoryService";

const AdminCategories = () => {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const data = await getCategories();
            setCategories(data);
        } catch (error) {
            setError("Error al cargar categorías");
        }
    };

    const handleAddCategory = async () => {
        if (!newCategory.trim()) {
            setError("El nombre de la categoría es obligatorio");
            return;
        }
        try {
            await createCategory({ name: newCategory });
            setNewCategory("");
            fetchCategories();
        } catch (error) {
            setError("Error al agregar categoría");
        }
    };

    const handleDeleteCategory = async (id) => {
        if (!window.confirm("¿Seguro que deseas eliminar esta categoría?")) return;
        try {
            await deleteCategory(id);
            fetchCategories();
        } catch (error) {
            setError("Error al eliminar categoría");
        }
    };

    return (
        <div>
            <h2>Gestión de Categorías</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <input 
                type="text" 
                placeholder="Nueva categoría" 
                value={newCategory} 
                onChange={(e) => setNewCategory(e.target.value)}
            />
            <button onClick={handleAddCategory}>Agregar Categoría</button>
            <ul>
                {categories.map((category) => (
                    <li key={category.id}>
                        {category.name}
                        <button onClick={() => handleDeleteCategory(category.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminCategories;