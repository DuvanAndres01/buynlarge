1. Introducción
Este proyecto es un ChatBot desarrollado para Buy n Large, utilizando Django, React.js y PostgreSQL. Su función principal es facilitar la consulta de inventario, proporcionar recomendaciones basadas en IA y ofrecer un dashboard de métricas en tiempo real.
2. Tecnologías Utilizadas
•	Backend: Django 4.x (Python 3.10)
•	Frontend: React.js 18 con Vite
•	Base de Datos: PostgreSQL 14
•	• IA: Procesamiento de Lenguaje Natural (NLP) con modelos de Transformers de Hugging Face para comprender preguntas y mejorar recomendaciones de productos.
•	Autenticación: JWT (JSON Web Tokens) con Django Rest Framework
•	Versionado: Git y GitHub
•	Despliegue: Docker con Nginx y AWS EC2
3. Instalación y Configuración
3.1. Requisitos Previos
Asegúrate de tener instalados:
•	Python 3.10+
•	Node.js 16+
•	PostgreSQL 14+
•	Docker y Docker Compose
•	Git
3.2. Clonar el Repositorio
git clone https://github.com/DuvanAndres01/Buy-n-Large.git
cd Buy-n-Large
3.3. Configuración del Backend
cd backend
python -m venv venv
source venv/bin/activate  # En Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
python manage.py migrate
python manage.py createsuperuser  # Crear usuario administrador
python manage.py runserver
3.4. Configuración del Frontend
cd frontend
npm install
cp .env.example .env
npm run dev
4. Arquitectura del Proyecto
Buy-n-Large/
├── backend/   # API con Django Rest Framework
│   ├── manage.py
│   ├── core/
│   ├── inventory/
│   ├── recommendations/
│   ├── users/
├── frontend/  # UI con React.js y Vite
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   ├── public/
├── docs/      # Documentación
├── docker-compose.yml  # Configuración para Docker
├── .env.example  # Variables de entorno
5. Funcionalidades Clave
•	Consulta de Inventario: Permite buscar productos disponibles en la base de datos mediante filtros avanzados.
•	Recomendaciones Inteligentes: Usa IA para sugerir productos basados en patrones de compra y preferencias del usuario.
•	Dashboard de Métricas: Visualiza datos sobre ventas, disponibilidad y rotación de inventario en tiempo real.
•	Autenticación Segura: Registro e inicio de sesión con JWT y manejo de permisos.
•	Integración con API Externas: Posibilidad de sincronizar inventario con proveedores.
6. Uso del ChatBot
El ChatBot responde a preguntas sobre inventario y recomendaciones. Ejemplo de consulta:
Usuario: "¿Cuántas laptops hay disponibles?"
ChatBot: "Actualmente hay 5 laptops en inventario con precios desde $500 USD."
7. Despliegue en Producción
Para ejecutar con Docker en un servidor:
docker-compose -f docker-compose.prod.yml up --build -d
Configuración de Nginx en /etc/nginx/sites-available/buy-n-large:
server {
    listen 80;
    server_name chatbot.devspark.com;

    location / {
        proxy_pass http://127.0.0.1:8000;
    }
}
8. Contribución
1.	Haz un fork del repositorio.
2.	Crea una nueva rama (git checkout -b feature-nueva).
3.	Sube tus cambios (git commit -m "Agrega nueva funcionalidad").
4.	Haz un pull request para revisión.
9. Contacto
Para dudas o sugerencias, contacta a Duvan Arias a través de GitHub.

