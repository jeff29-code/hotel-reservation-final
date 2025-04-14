import axios from "axios";

const BASE_URL = "http://localhost:8080/api/categorias";

// Obtener todas las categorías
export const getCategorias = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error al obtener categorías:", error);
    throw error;
  }
};

// Obtener una categoría por ID
export const getCategoriaById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener la categoría:", error);
    throw error;
  }
};

// Crear una nueva categoría
export const crearCategoria = async (categoria) => {
  try {
    const response = await axios.post(BASE_URL, categoria);
    return response.data;
  } catch (error) {
    console.error("Error al crear la categoría:", error);
    throw error;
  }
};

// Actualizar una categoría existente
export const actualizarCategoria = async (id, categoria) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, categoria);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar la categoría:", error);
    throw error;
  }
};

// Eliminar una categoría
export const eliminarCategoria = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
  } catch (error) {
    console.error("Error al eliminar la categoría:", error);
    throw error;
  }
};