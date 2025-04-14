import { useState } from "react"; 
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function ProductGallery({ images }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  if (!images || images.length < 5) {
    return <p>No hay suficientes imágenes para mostrar la galería.</p>;
  }

  return (
    <div className="w-full flex flex-col md:flex-row gap-2">
      {/* Imagen principal */}
      <div className="md:w-1/2 h-[300px] md:h-[500px]">
        <img
          src={images[0]}
          alt="Imagen principal"
          className="w-full h-full object-cover rounded-lg"
          onError={(e) => (e.target.src = "https://via.placeholder.com/150")}
        />
      </div>

      {/* Cuadrícula de imágenes */}
      <div className="md:w-1/2 grid grid-cols-2 grid-rows-2 gap-2 relative">
        {images.slice(1, 5).map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Imagen ${index + 1}`}
            className="w-full h-full object-cover rounded-lg"
            onError={(e) => (e.target.src = "https://via.placeholder.com/150")}
          />
        ))}

        {/* Botón Ver Más */}
        <Button
          className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white"
          onClick={() => setIsOpen(true)}
        >
          Ver más
        </Button>
      </div>

      {/* Modal para ver todas las imágenes */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <div className="p-4 grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Imagen ${index}`}
              className="w-full h-auto object-cover rounded-lg"
              onError={(e) => (e.target.src = "https://via.placeholder.com/150")}
            />
          ))}
        </div>
      </Dialog>

      {/* Botón Volver */}
      <Button onClick={() => navigate("/administracion/reservas")} className="mt-4">
        ← Volver
      </Button>
    </div>
  );
}