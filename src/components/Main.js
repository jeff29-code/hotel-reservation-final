import React, { useEffect, useState } from "react"; 
import "./Main.css";
import hotelImg from "../assets/hotel1.jpeg";
import hostelImg from "../assets/hostel.jpeg";
import departamentoImg from "../assets/departamento.jpeg";
import bnbImg from "../assets/bnb.jpg";
import { getCategorias } from "../services/CategoryService";

const Main = () => {
  const [categorias, setCategorias] = useState([]);
  const [productos, setProductos] = useState([]); // Asegurar que inicie como array vacío
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;

  const [randomProducts, setRandomProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/productos/random")
      .then((response) => response.json())
      .then((data) => {
        console.log("Productos aleatorios:", data);
        setRandomProducts(data);
      })
      .catch((error) => {
        console.error("Error al obtener productos aleatorios:", error);
      });
  }, []);

  //Cargar categorías al montar el componente
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const data = await getCategorias();
        setCategorias(data);
        console.log("Categorías cargadas:", data);
      } catch (error) {
        console.error("Error al obtener categorías:", error);
      }
    };

    fetchCategorias();
  }, []);

  // Llamar al backend para obtener productos paginados
  useEffect(() => {
    fetch(`http://localhost:8080/api/productos?page=${page}&size=${pageSize}`)
      .then(response => response.json())
      .then(data => {
        console.log("Productos paginados recibidos:", data);
        setProductos(Array.isArray(data.content) ? data.content : []); // Validar que content sea un array
        setTotalPages(data.totalPages || 1);
      })
      .catch(error => {
        console.error("Error al obtener productos:", error);
        setProductos([]); // Asegurar que productos no sea undefined
      });
  }, [page]);

  return (
    <main className="main-container">
      {/* Sección de búsqueda */}
      <section className="search-section">
        <h2>Buscar por tipo de alojamiento</h2>
        <div className="search-grid">
          <div className="search-item">
            <img src={hotelImg} alt="Hoteles" />
            <p>Hoteles</p>
          </div>
          <div className="search-item">
            <img src={hostelImg} alt="Hostels" />
            <p>Hostels</p>
          </div>
          <div className="search-item">
            <img src={departamentoImg} alt="Departamentos" />
            <p>Departamentos</p>
          </div>
          <div className="search-item">
            <img src={bnbImg} alt="Bed and Breakfast" />
            <p>Bed and Breakfast</p>
          </div>
        </div>
      </section>

      {/* Sección de productos paginados */}
      {/* Sección de productos aleatorios */}
      <section className="random-section">
  <h2>Productos recomendados</h2>
  <div className="random-grid">
          {randomProducts.map((producto) => (
            <div className="random-item" key={producto.id}>
              <img
                src={
                  producto.images && producto.images.length > 0
                    ? producto.images[0]
                    : "https://via.placeholder.com/150"
                }
                alt={producto.productName}
                style={{ width: "100%", height: "auto" }}
              />
              <p>{producto.productName}</p>
            </div>
             ))}
             </div>

  {/* Paginación */}
  <div className="pagination">
    <button onClick={() => setPage(0)} disabled={page === 0}>
      ⏮ Inicio
    </button>
    <button onClick={() => setPage(prev => Math.max(prev - 1, 0))} disabled={page === 0}>
      ◀ Anterior
    </button>
    <span>Página {page + 1} de {totalPages}</span>
    <button onClick={() => setPage(prev => Math.min(prev + 1, totalPages - 1))} disabled={page === totalPages - 1}>
      Siguiente ▶
    </button>
    <button onClick={() => setPage(totalPages - 1)} disabled={page === totalPages - 1}>
      ⏭ Última
    </button>
  </div>
</section>
    </main>
  );
};

export default Main;