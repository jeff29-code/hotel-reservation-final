import { useContext } from "react"; 
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const PrivateRoute = ({ children, adminOnly = false }) => {
    const { user, token } = useContext(AuthContext);
    const location = useLocation(); // Obtener la ubicación actual
    const role = user?.role;

    // Verificar si el usuario está autenticado
    const isAuthenticated = user && token;
    
    // Verificar si el usuario es administrador
    const isAdmin = isAuthenticated && role === "ADMIN"; // 🔹 Usar el rol en lugar de email
    console.log("User data:", user);
    console.log("User role:", role);

    // Si es una ruta solo para admins y el usuario no es admin, redirigir a /administracion
    if (adminOnly && !isAdmin) {
        return <Navigate to="/productos" replace />;  // ✅ Enviar a productos en lugar de administración
    }

    // Si no está autenticado, redirigir a login
    return isAuthenticated ? children : <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;