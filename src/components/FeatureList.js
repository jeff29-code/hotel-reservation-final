import { useContext } from "react"; 
import { FeatureContext } from "../Context/FeatureContext";
import { deleteFeature } from "../services/FeatureService";
import { AuthContext } from "../Context/AuthContext"; // 👈 Agregado para conocer el rol del usuario

const FeatureList = ({ onEdit }) => {
  const { features, loadFeatures } = useContext(FeatureContext);
  const { user } = useContext(AuthContext); // 👈 Obtener info del usuario
  const isAdmin = user?.role === "ADMIN";

  const handleDelete = async (id) => {
    if (window.confirm("¿Estas seguro que quieres borrar esta caracteristica?")) {
      await deleteFeature(id);
      loadFeatures();
    }
  };

  return (
    <div>
      <h2>Lista de Características</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Icon</th>
            {isAdmin && <th>Acciones</th>} {/* Mostrar columna solo si es admin */}
          </tr>
        </thead>
        <tbody>
          {features.map((feature) => (
            <tr key={feature.id}>
              <td>{feature.name}</td>
              <td>{feature.icon}</td>
              {isAdmin && (
                <td>
                  <button onClick={() => onEdit(feature)}>Editar</button>
                  <button onClick={() => handleDelete(feature.id)}>Borrar</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FeatureList;