import { useState, useEffect } from "react"; 
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AgregarProducto = () => {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagenes, setImagenes] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [error, setError] = useState("");

  // Cargar categorías desde el backend
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/categorias");
        setCategorias(response.data);
      } catch (error) {
        console.error("Error al obtener categorías:", error);
      }
    };
    fetchCategorias();
  }, []);

  const handleImagenesChange = (event) => {
    const archivos = event.target.files;
    if (archivos.length > 0) {
      setImagenes([...archivos]);
    }
  };

  const handleGuardar = async () => {
    if (!nombre.trim() || !descripcion.trim() || imagenes.length === 0 || !categoriaSeleccionada) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    try {
      const productData = JSON.stringify({
        productName: nombre,
        description: descripcion,
        categoryId: categoriaSeleccionada, // Agregar categoría seleccionada
      });

      const formData = new FormData();
      formData.append("product", productData);
      imagenes.forEach((imagen) => {
        formData.append("images", imagen);
      });

      const response = await axios.post("http://localhost:8080/api/productos", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("✅ Respuesta del servidor:", response.data);
      setNombre("");
      setDescripcion("");
      setImagenes([]);
      setCategoriaSeleccionada("");
      setError("");
      document.getElementById("input-imagenes").value = "";
    } catch (error) {
      console.error("❌ Error al guardar el producto:", error);
      setError("Hubo un error al guardar el producto.");
    }
  };

  return (
    <div>
      <h2>Agregar Producto</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
      <textarea placeholder="Descripción" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
      <select value={categoriaSeleccionada} onChange={(e) => setCategoriaSeleccionada(e.target.value)}>
        <option value="">Selecciona una categoría</option>
        {categorias.map((categoria) => (
          <option key={categoria.id} value={categoria.id}>{categoria.nombre}</option>
        ))}
      </select>
      <input type="file" multiple id="input-imagenes" onChange={handleImagenesChange} />
      <button onClick={handleGuardar}>Guardar Producto</button>
      <button onClick={() => navigate(-1)}>Volver</button>
    </div>
  );
};


export default AgregarProducto;