import { useState, useEffect, useContext } from "react";
import { FeatureContext } from "../Context/FeatureContext";
import { createFeature, updateFeature } from "../services/FeatureService";
import { AuthContext } from "../Context/AuthContext"; // 👈 Agregado

const FeatureForm = ({ editingFeature, setEditingFeature }) => {
  const { loadFeatures } = useContext(FeatureContext);
  const { user } = useContext(AuthContext); // 👈 Obtener usuario
  const isAdmin = user?.role === "ADMIN";   // 👈 Verificar si es admin

  const [feature, setFeature] = useState({ name: "", icon: "" });

  useEffect(() => {
    if (editingFeature) {
      setFeature(editingFeature);
    } else {
      setFeature({ name: "", icon: "" });
    }
  }, [editingFeature]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (feature.name.trim() === "" || feature.icon.trim() === "") {
      alert("Please enter all fields.");
      return;
    }

    if (editingFeature) {
      await updateFeature(feature.id, feature);
    } else {
      await createFeature(feature);
    }

    loadFeatures();
    setEditingFeature(null);
    setFeature({ name: "", icon: "" });
  };

  // 🔐 Si NO es admin, no mostrar el formulario
  if (!isAdmin) {
    return null;
  }

  return (
    <div>
      <h2>{editingFeature ? "Editar Caracteristica" : "Agregar nueva caracteristica"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre de la caracteristica"
          value={feature.name}
          onChange={(e) => setFeature({ ...feature, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Feature Icon"
          value={feature.icon}
          onChange={(e) => setFeature({ ...feature, icon: e.target.value })}
        />
        <button type="submit">{editingFeature ? "Actualizar" : "Agregar"}</button>
        {editingFeature && <button onClick={() => setEditingFeature(null)}>Cancel</button>}
      </form>
    </div>
  );
};

export default FeatureForm;