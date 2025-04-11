import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const CaracteristicasButton = () => {
  const { user } = useContext(AuthContext);
  const isAdmin = user?.role === "ADMIN";
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/admin/features");
  };

  return (
    <button onClick={handleClick}>
      {isAdmin ? "Características" : "Ver características"}
    </button>
  );
};

export default CaracteristicasButton;