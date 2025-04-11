import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Main from "./components/Main.js";
import AdminPanel from "./components/AdminPanel";
import ListaProductos from "./components/ListaProductos";
import EditarProductos from "./components/EditarProductos.jsx";
import AgregarProducto from "./components/AgregarProducto";
import ProductDetail from "./Pages/ProductDetail";
import Footer from "./components/Footer";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import UserList from "./Pages/UserList";
import { AuthProvider } from "./Context/AuthContext";
import PrivateRoute from "./Routes/PrivateRoute";
import ManageUsers from "./components/ManageUsers.js";
import "./App.css";
import { FeatureProvider } from "./Context/FeatureContext";
import FeatureManagement from "./Pages/FeatureManagement";
import WhatsAppButton from "./components/WhatsAppButton";

const App = () => {
  return (
    <AuthProvider>
      <FeatureProvider> {/* 👈 Agregamos FeatureProvider aquí */}
        <div className="app-container">
          <Header />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/agregar-producto" element={<AgregarProducto />} />
            <Route path="/admin/lista-productos" element={<ListaProductos />} />
            <Route path="/productos" element={<ListaProductos />} />
            <Route path="/login" element={<Login />} />
            {/* Ruta protegida para administración */}
            <Route path="/administracion" element={<PrivateRoute><AdminPanel /></PrivateRoute>} />
            {/* Ruta protegida para gestión de usuarios */}
            <Route path="/admin/usuarios" element={<PrivateRoute adminOnly={true}><ManageUsers /></PrivateRoute>} />
            <Route path="/register" element={<Register />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/editar/:id" element={<EditarProductos />} />
            <Route path="/producto/:id" element={<ProductDetail />} />
            
            
            {/* Nueva Ruta para administrar características */}
            
            <Route path="/admin/features" element={
         <PrivateRoute>
         <FeatureManagement />
         </PrivateRoute>
           } />
          </Routes>
          <WhatsAppButton />
          <Footer />
        </div>
      </FeatureProvider>
    </AuthProvider>
  );
};

export default App;