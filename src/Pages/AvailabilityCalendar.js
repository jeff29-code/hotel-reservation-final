import { useState, useEffect } from "react";  
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Importa los estilos predeterminados
import axios from "axios";

const API_URL = "http://localhost:8080/api/reservaciones"; // Ajusta según tu backend

const AvailabilityCalendar = ({ productId }) => {
  const [unavailableDates, setUnavailableDates] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUnavailableDates = async () => {
      try {
        const response = await axios.get(`${API_URL}/unavailable-dates/${productId}`);
        
        // Convertir las fechas de "yyyy-MM-dd" a objetos Date
        const formattedDates = response.data.map(date => new Date(date + "T00:00:00")); 
        
        setUnavailableDates(formattedDates);
      } catch (error) {
        setError("No se pudo cargar la disponibilidad. Inténtalo más tarde.");
      }
    };

    fetchUnavailableDates();
  }, [productId]);

  // Función para determinar si una fecha está ocupada
  const tileClassName = ({ date, view }) => {
    if (view === "month") {
        const dateString = date.toISOString().split("T")[0]; // Convertir a yyyy-MM-dd
        const isUnavailable = unavailableDates.includes(dateString);
        return isUnavailable ? "unavailable-date" : "";
    }
    return "";
};

  return (
    <div>
      <h3>Disponibilidad</h3>
      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <Calendar tileClassName={tileClassName} />
      )}
    </div>
  );
};

export default AvailabilityCalendar;