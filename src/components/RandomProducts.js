import React, { useEffect, useState } from "react";
import axios from "axios";

const RandomProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/random-products")
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error("Error fetching random products", error);
      });
  }, []);

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {products.map((product) => (
        <div key={product.id} className="border rounded-lg shadow-md p-3">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-40 object-cover rounded-md mb-2"
          />
          <h3 className="text-lg font-bold">{product.name}</h3>
          <p className="text-sm text-gray-600">{product.description}</p>
        </div>
      ))}
    </div>
  );
};

export default RandomProducts;