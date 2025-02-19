import React from "react";
import ReactDOM from "react-dom/client"; // Asegúrate de usar 'react-dom/client' si estás usando React 18
import App from "./App.jsx";
import "./index.css"; // Si tienes estilos globales

const root = ReactDOM.createRoot(document.getElementById("root")); // Para React 18
root.render(<App />);
