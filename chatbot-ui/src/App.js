import React, { useState } from "react";
import axios from "axios";
import './styles-chatbot.css';

function App() {
  const [mensaje, setMensaje] = useState("");
  const [respuestas, setRespuestas] = useState([]);
  const [cargando, setCargando] = useState(false);

  const enviarMensaje = async () => {
    if (!mensaje.trim()) return; 
    setCargando(true);

    try {
      const { data } = await axios.post("http://127.0.0.1:8000/api/chatbot/", { mensaje });
      
      setRespuestas([
        ...respuestas,
        { mensaje: "Tu: " + mensaje, tipo: "usuario" },
        { mensaje: data.respuesta, tipo: "chatbot" }
      ]);  // Agregar al historial de respuestas

      setMensaje("");  // Limpiar el campo de entrada después de enviar
    } catch (error) {
      setRespuestas([
        ...respuestas,
        { mensaje: "Hubo un error al obtener la respuesta.", tipo: "chatbot" }
      ]);
    }
    
    setCargando(false);
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-box">
        <h1 className="chatbot-title">ChatBot de Buy n Large</h1>

        <div className="chatbot-response-container">
          {/* Mostrar mensajes del usuario y del chatbot */}
          {respuestas.map((respuesta, index) => (
            <div
              key={index}
              className={`message ${respuesta.tipo === "usuario" ? "user-message" : "bot-response"}`}
            >
              <p>{respuesta.mensaje}</p>
            </div>
          ))}

          {/* Indicador de carga */}
          {cargando && (
            <div className="message bot-response">
              <p><i>El chatbot está pensando...</i></p>
            </div>
          )}
        </div>

        <div className="chatbot-input-container">
          {/* Input de usuario */}
          <input
            className="chatbot-input"
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            placeholder="Escribe tu pregunta..."
          />

          {/* Botón para enviar mensaje */}
          <button onClick={enviarMensaje} className="chatbot-button">Enviar</button>
        </div>
      </div>
    </div>
  );
}

export default App;
