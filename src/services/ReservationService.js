import axios from "axios";

const API_URL = "http://localhost:8080/api/reservaciones";  // Ajusta según tu backend
const formatDateToISO = (date) => {
    if (!date) return null;
    return new Date(date).toISOString().split('T')[0]; // Convierte a yyyy-MM-dd
};

// Obtener las fechas no disponibles de un producto
export const getUnavailableDates = async (productId) => {
    try {
        const response = await axios.get(`${API_URL}/unavailable-dates/${productId}`);
        return response.data; // Devuelve un array de fechas
    } catch (error) {
        console.error("Error al obtener fechas no disponibles:", error);
        return [];
    }
};


// Verificar si un rango de fechas está disponible
export const checkAvailability = async (productId, startDate, endDate) => {
    try {
        const response = await axios.get(`${API_URL}/is-available`, {
            params: { productId, startDate, endDate }
        });
        return response.data; // Devuelve true o false
    } catch (error) {
        console.error("Error al verificar disponibilidad:", error);
        return false;
    }
};