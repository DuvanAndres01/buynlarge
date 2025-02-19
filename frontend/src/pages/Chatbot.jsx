// Chatbot.jsx
import React, { useEffect } from 'react';

const Chatbot = () => {
    useEffect(() => {

            window.location.href = "http://localhost:3001"; 

    }, []);

    return (
        <div>
            <h1>Redirigiendo al ChatBot...</h1>

        </div>
    );
};

export default Chatbot;
