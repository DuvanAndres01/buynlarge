import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import defaultImage from '../assets/default-image.jpg'; // Ruta a la imagen por defecto

const Home = () => {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        // Realiza la solicitud GET a la API
        fetch('http://localhost:8000/api/productos/')
            .then((response) => response.json())
            .then((data) => setProductos(data))
            .catch((error) => console.error('Error al obtener los productos:', error));
    }, []);

    return (
        <div>
            <div className="header">
                <h1>Buy n Large</h1>
                <p>Computadoras que transforman tu productividad, con Buy n Large.</p>
            </div>

            <nav className="navbar">
            <Link to="/chatbot">
                <button>ChatBot</button>
            </Link>
            <Link to="/panel">
                <button>Panel de Control</button>
            </Link>
            </nav>

            <div className="container">
                <div className="product-grid">
                    {productos.map((producto) => (
                        <div key={producto.id} className="product-card">
                            <img
                                src={producto.imagen_url || defaultImage} // Si no hay imagen, se usa la imagen por defecto
                                alt={producto.nombre}
                            />
                            <h3>{producto.nombre}</h3>
                            <ul className="product-details">
                                <li>Descripción <br /><strong>{producto.descripcion}</strong></li>
                                <li>Precio <br /><strong>${producto.precio.toLocaleString()}</strong></li>
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
