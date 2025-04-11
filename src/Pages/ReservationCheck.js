import React, { useState, useEffect } from "react";
import { getUnavailableDates, checkAvailability } from "../services/ReservationService";

const ReservationCheck = ({ productId }) => {
    const [unavailableDates, setUnavailableDates] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [isAvailable, setIsAvailable] = useState(null);

    // Cargar las fechas no disponibles cuando se monta el componente
    useEffect(() => {
        const fetchUnavailableDates = async () => {
            const dates = await getUnavailableDates(productId);
            console.log("Fechas no disponibles:", dates);
            setUnavailableDates(dates);
        };
        fetchUnavailableDates();
    }, [productId]);

    // Función para verificar disponibilidad
    const handleCheckAvailability = async () => {
        if (!startDate || !endDate) {
            alert("Selecciona una fecha de inicio y fin");
            return;
        }
        const available = await checkAvailability(productId, startDate, endDate);
        setIsAvailable(available);
    };

    return (
        <div>
            <h2>Verificar Disponibilidad</h2>

            <h4>Fechas No Disponibles:</h4>
            <ul>
                {unavailableDates.length > 0 ? (
                    unavailableDates.map((date, index) => <li key={index}>{date}</li>)
                ) : (
                    <li>No hay fechas bloqueadas</li>
                )}
            </ul>

            <label>Fecha Inicio:</label>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />

            <label>Fecha Fin:</label>
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />

            <button onClick={handleCheckAvailability}>Verificar</button>

            {isAvailable !== null && (
                <p>{isAvailable ? "✅ Disponible" : "❌ No Disponible"}</p>
            )}
        </div>
    );
};

export default ReservationCheck;