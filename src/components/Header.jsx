import React, { useContext } from "react"; 
import { Link, useNavigate } from "react-router-dom"; // 🔹 Importa useNavigate
import { AuthContext } from "../Context/AuthContext";
import "../styles/Header.css";
import logo from "../assets/logoH.png"; 

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate(); // 🔹 Hook para redireccionar

  // Función para cerrar sesión con redirección
  const handleLogout = () => {
    logout();
    navigate("/login"); // 🔹 Redirigir al usuario a /login
  };

  // Función para obtener iniciales
  const getInitials = (firstName, lastName) => {
    if (!firstName || !lastName) return "?";
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
  };

  return (
    <header className="header">
      <div className="header-left">
        <Link to="/" className="logo-container">
          <img src={logo} alt="Hotel Logo" className="logo" />
          <span className="slogan">Siéntete como en tu hogar</span>
        </Link>
      </div>
      <div className="header-right">
        {user ? (
          <div className="user-info">
          <div
            className="user-clickable"
            onClick={() =>
              user.role === "ADMIN" ? navigate("/administracion") : navigate("/productos")
            }
            style={{ display: "flex", alignItems: "center", cursor: "pointer", gap: "10px" }}
          >
            <div className="avatar">{getInitials(user.firstName, user.lastName)}</div>
            <span className="username">{user.firstName} {user.lastName}</span>
          </div>
          <button className="btn" onClick={handleLogout}>Cerrar sesión</button>
        </div>
        ) : (
          <div className="auth-buttons">
            <Link to="/login" className="btn">Iniciar sesión</Link>
            <Link to="/register" className="btn register-btn">Registrarse</Link> 
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;