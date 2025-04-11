import React, { useEffect, useState } from "react";
import { fetchWithAuth } from "../components/api";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await fetchWithAuth("users");
        setUsers(data);
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      }
    };

    fetchUsers();
  }, []);

  const toggleAdminRole = async (userId, isAdmin) => {
    const newRole = isAdmin ? "USER" : "ADMIN"; // Alternar entre usuario normal y administrador

    try {
      const response = await fetchWithAuth(`users/${userId}/role`, {
        method: "PUT",
        body: JSON.stringify({ role: newRole }),
      });

      if (response.success) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === userId ? { ...user, role: newRole } : user
          )
        );
      } else {
        alert("Error al actualizar el rol.");
      }
    } catch (error) {
      console.error("Error al actualizar el rol del usuario:", error);
    }
  };

  return (
    <div>
      <h2>Administrar Usuarios</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.firstName} {user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => toggleAdminRole(user.id, user.role === "ADMIN")}>
                  {user.role === "ADMIN" ? "Quitar Admin" : "Hacer Admin"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;