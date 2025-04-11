import React, { useEffect, useState, useContext } from "react";
import { Link,useNavigate } from "react-router-dom";
import ListaProductos from "./ListaProductos";
import ManageUsers from "./ManageUsers";
import { AuthContext } from "../Context/AuthContext"; // Importar el contexto de autenticación


const AdminPanel = () => {
  const navigate = useNavigate();
  const { role } = useContext(AuthContext); // Obtener el rol del usuario
  const [isMobile, setIsMobile] = useState(false);
  const [mostrarLista, setMostrarLista] = useState(false);
  const [mostrarUsuarios, setMostrarUsuarios] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    }
  }, []);

  if (isMobile) {
    return (
      <div style={{ textAlign: "center", padding: "20px", color: "red" }}>
        <h2>El panel de administración no está disponible en dispositivos móviles.</h2>
      </div>
    );
  }

  // 🔹 Verificar si el usuario es administrador
  const isAdmin = role === "ADMIN";

  return (
    <div>
      <h1>Panel de Administración</h1>
      <button onClick={() => navigate("/agregar-producto")}>Agregar Producto</button>

      <nav>
        <ul>
        <li><Link to="/administracion/productos">Gestionar Productos</Link></li>
        <li><Link to="/administracion/reservas">Gestionar Reservas</Link></li>
          {/* 🔹 Mostrar "Gestionar Usuarios" solo si el usuario es ADMIN */}
          {isAdmin && <li><Link to="/administracion/usuarios">Gestionar Usuarios</Link></li>}
        </ul>
      </nav>

      <button onClick={() => setMostrarLista(!mostrarLista)}>
        {mostrarLista ? "Ocultar Lista" : "Ver Lista de Productos"}
      </button>
      {mostrarLista && <ListaProductos />}

      {/* 🔹 Mostrar el botón solo si el usuario es ADMIN */}
      {isAdmin && (
        <button onClick={() => setMostrarUsuarios(!mostrarUsuarios)}>
          {mostrarUsuarios ? "Ocultar Usuarios" : "Administrar Usuarios"}
        </button>
      )}
      
      {/* 🔹 Mostrar la sección solo si el usuario es ADMIN y ha hecho clic en el botón */}
      {isAdmin && mostrarUsuarios && <ManageUsers />}
    </div>
  );
};

export default AdminPanel;