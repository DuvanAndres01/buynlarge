import React, { useState, useEffect } from 'react';
import './ControlPanel.css'; 

const ControlPanel = () => {
    const [metrics, setMetrics] = useState(null);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/api/productos/')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('No se pudo obtener los productos');
                }
                return response.json();
            })
            .then((data) => {
                console.log('Datos recibidos:', data);

                const totalStock = data.reduce((acc, product) => acc + (product.stock ? product.stock : 0), 0);

                const totalSales = data.reduce((acc, product) => {
                    const sales = typeof product.sales === 'number' ? product.sales : 0;
                    return acc + sales;
                }, 0);

                const computers = data.filter(product => 
                    product.nombre.toLowerCase().includes('mac') || 
                    product.nombre.toLowerCase().includes('hp') ||
                    product.nombre.toLowerCase().includes('dell')
                );

                setMetrics({
                    totalStock,
                    totalSales,
                    computers 
                });

                setProducts(data);
            })
            .catch((error) => console.error('Error al obtener los productos:', error));
    }, []);

    if (!metrics) {
        return (
            <div className="loading">
                <div className="spinner"></div>
                <p>Cargando métricas...</p>
            </div>
        );
    }

    return (

        <div className="panel-container">
            <h1>Panel de Control</h1>
            
            <div className="metrics">
                <h3>Referencias de Computadores</h3>
                {metrics.computers && metrics.computers.length > 0 ? (
                    <ul className="computer-list">
                        {metrics.computers.map((product) => (
                            <li key={product.id}>
                                <span>{product.nombre}</span>
                                <span className="stock-count">{product.stock}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No se encontraron computadores.</p>
                )}
                                <p className="metric">
                    <strong>Total de productos:</strong>
                    <span className="metric-value">{metrics.totalStock} Unidades</span>
                </p>
            </div>

            <h2>Lista de Productos</h2>
            <table className="product-table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Precio</th>

                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.nombre}</td>
                            <td>{product.descripcion}</td>
                            <td>${parseFloat(product.precio).toLocaleString()}</td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ControlPanel;
