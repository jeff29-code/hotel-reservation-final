import { useParams, useNavigate } from "react-router-dom"; 
import AvailabilityCalendar from "./AvailabilityCalendar";
import ReservationCheck from "./ReservationCheck";  
import axios from "axios";
import { useEffect, useState } from "react";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const storedUser = JSON.parse(localStorage.getItem("user"));
  console.log("Usuario almacenado:", storedUser);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/productos/${id}`)
      .then((response) => {
        console.log("Respuesta del backend:", response.data); // 👈 Agregamos esto
        console.log("Proveedor del producto:", response.data.provider);
        setProduct(response.data);
      })
      .catch((error) => console.error("Error cargando producto", error));
  }, [id]);

  const handleReserve = () => {
    if (!startDate || !endDate) {
      alert("Por favor selecciona un rango de fechas válido.");
      return;
    }
  
    const token = localStorage.getItem("token");
    const storedUser = JSON.parse(localStorage.getItem("user"));
  
    if (!token || !storedUser) {
      alert("Debes iniciar sesión para hacer una reserva.");
      return;
    }
  
    const reservationData = {
      product: { id },
      user: { id: storedUser.id },
      startDate,
      endDate,
    };
  
    axios
      .post("http://localhost:8080/api/reservaciones/create", reservationData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then(() => alert("Reserva realizada con éxito"))
      .catch((error) => {
        console.error("Error en la reserva:", error);
        alert("Error al realizar la reserva. Verifica que estés autenticado.");
      });
  };
  if (!product) return <p>Cargando...</p>;

  return (
    <div>
      {/* Header */}
      <div style={{ width: "100%", display: "flex", justifyContent: "space-between", padding: "20px", backgroundColor: "#f5f5f5" }}>
        <h1 style={{ margin: 0 }}>{product.name}</h1>
        <button onClick={() => navigate("/administracion/productos")} style={{ background: "none", border: "none", cursor: "pointer" }}>
          ← Volver
        </button>
      </div>

      {/* Body */}
      <div style={{ padding: "20px" }}>
        <p>{product.description}</p>
      
      {/* Botón flotante de WhatsApp */}
      {product.providerPhone && (
  <a
    href={`https://wa.me/${product.providerPhone}?text=Hola,%20estoy%20interesado%20en%20el%20producto%20${encodeURIComponent(product.productName || "que ofreces")}`}
    target="_blank"
    rel="noopener noreferrer"
    style={{
      position: "fixed",
      bottom: "20px",
      right: "20px",
      backgroundColor: "#25D366",
      color: "white",
      borderRadius: "50%",
      width: "60px",
      height: "60px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textDecoration: "none",
      boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
      zIndex: 9999,
    }}
  >
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
      alt="WhatsApp"
      style={{ width: "30px", height: "30px" }}
    />
  </a>
)}
        

        {/* Manejo de imágenes */}
        {product.images && product.images.length > 0 ? (
  <div style={{ display: "flex", gap: "20px", alignItems: "flex-start", marginTop: "20px" }}>
    {/* Imagen principal */}
    <img 
      src={product.images[0]} 
      alt="Imagen del hotel" 
      style={{ width: "300px", height: "250px", objectFit: "cover", borderRadius: "8px" }} 
    />

    {/* Detalles del producto */}
    <div>
      <h2>{product.productName}</h2>
      <p><strong>Descripción:</strong> {product.description}</p>
      <p><strong>Categoria:</strong> {product.categoryId}</p>
    </div>
  </div>
) : (
  <p>No hay imágenes disponibles.</p>
)}

{storedUser ? (
  <div style={{ marginTop: "20px", padding: "15px", border: "1px solid #ccc", borderRadius: "5px", backgroundColor: "#f0f8ff" }}>
    <h2>Datos del usuario</h2>
    <p><strong>Nombre:</strong> {storedUser.firstName}</p>
    <p><strong>Apellido:</strong> {storedUser.lastName}</p>
    <p><strong>Rol:</strong> {storedUser.role}</p>
  </div>
) : (
  <p style={{ color: "red" }}>Debes iniciar sesión para ver tus datos.</p>
)}

        {/* Calendario de Disponibilidad */}
        <AvailabilityCalendar productId={id} />

        {/* Verificación de Disponibilidad */}
        <ReservationCheck productId={id} />

        {/* Selección de Fechas */}
        <h3>Selecciona las fechas para tu reserva:</h3>
        <input 
          type="date" 
          value={startDate || ""} 
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input 
          type="date" 
          value={endDate || ""} 
          onChange={(e) => setEndDate(e.target.value)}
        />

        {/* Botón de Reserva */}
        <button 
          onClick={handleReserve} 
          style={{
            marginTop: "10px",
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            cursor: "pointer",
            borderRadius: "5px"
          }}>
          Reservar del {startDate || "???"} al {endDate || "???"}
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;