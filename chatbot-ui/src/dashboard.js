import React, { useState, useEffect } from "react";
import { BarChart, Bar, PieChart, Pie, Cell, Tooltip, XAxis, YAxis, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#ff6666"];

const Dashboard = () => {
    const [metrics, setMetrics] = useState(null);

    useEffect(() => {
        fetch("/api/metrics/")
            .then((res) => res.json())
            .then((data) => setMetrics(data))
            .catch((error) => console.error("Error al obtener métricas:", error));
    }, []);

    if (!metrics) return <p>Cargando métricas...</p>;

    return (
        <div className="dashboard-container">
            <h2>Dashboard de Métricas</h2>
            
            <div className="metric-box">
                <h3>Total de Productos</h3>
                <p>{metrics.total_products}</p>
            </div>

            <div className="metric-box">
                <h3>Promedio de Precio</h3>
                <p>${metrics.avg_price}</p>
            </div>

            <div className="metric-box">
                <h3>Productos con Bajo Stock</h3>
                <p>{metrics.low_stock_products}</p>
            </div>

            <div className="charts">
                {/* Gráfico de Barras: Productos por Categoría */}
                <ResponsiveContainer width="50%" height={300}>
                    <BarChart data={metrics.category_counts}>
                        <XAxis dataKey="category" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>

                {/* Gráfico de Pie: Productos por Categoría */}
                <ResponsiveContainer width="50%" height={300}>
                    <PieChart>
                        <Pie data={metrics.category_counts} dataKey="count" nameKey="category" cx="50%" cy="50%" outerRadius={100}>
                            {metrics.category_counts.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Dashboard;
