import { useEffect, useState } from "react";
import axios from "axios";

const Productos = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/productos/")
      .then(response => setProductos(response.data))
      .catch(error => console.error("Error al obtener productos:", error));
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Lista de Productos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {productos.map(producto => (
          <div key={producto.id} className="border rounded-lg p-4 shadow-md">
            {producto.imagen_url && (
              <img src={producto.imagen_url} alt={producto.nombre} className="w-full h-48 object-cover mb-2 rounded" />
            )}
            <h2 className="text-xl font-semibold">{producto.nombre}</h2>
            <p className="text-gray-600">{producto.descripcion}</p>
            <p className="text-green-500 font-bold">${producto.precio}</p>
            <p className="text-sm text-gray-500">Stock: {producto.stock}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Productos;