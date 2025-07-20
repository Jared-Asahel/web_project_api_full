# Tripleten web_project_api_full

Este proyecto consiste en una red social web en la que los usuarios pueden registrarse, iniciar sesión, ver tarjetas con imágenes de distintos lugares del mundo, dar "me gusta", y gestionar sus propios perfiles y publicaciones. Se construyó como parte del curso de desarrollo web completo con **Practicum by Yandex**.

---

## 🔧 Tecnologías utilizadas

### 🚀 Frontend (React)

- React 18+
- React Router DOM
- Context API
- CSS Modules
- JavaScript ES6+
- Vite (para desarrollo local)
- Webpack (para producción)

### 🛠 Backend (Node.js + Express)

- Node.js
- Express.js
- MongoDB (Mongoose ODM)
- JWT (autenticación segura)
- Celebrate + Joi (validación de solicitudes)
- Bcrypt (hash de contraseñas)
- Helmet (seguridad HTTP)
- CORS (control de origen)
- Winston (log de errores y solicitudes)

---

## 📁 Estructura del proyecto

```bash
web_project/
│
├── backend/
│   ├── controllers/       # Lógica de negocio (usuarios, tarjetas)
│   ├── models/            # Modelos Mongoose
│   ├── routes/            # Rutas de la API
│   ├── middlewares/       # Middlewares personalizados
│   ├── utils/             # Funciones auxiliares
│   ├── errors/            # Clases de errores personalizados
│   └── app.js             # Configuración principal del servidor
│
├── frontend/
│   ├── src/
│   │   ├── components/    # Componentes reutilizables (Header, Main, Popup, etc.)
│   │   ├── pages/         # Vistas principales (Login, Register, Profile)
│   │   ├── contexts/      # Contexto global de usuario
│   │   ├── utils/         # API y validaciones
│   │   └── App.jsx        # Lógica principal del frontend
│
├── .env                   # Variables de entorno
└── README.md              # Este archivo

```

🧪 Características principales
• Registro e inicio de sesión con JWT
• Edición de perfil y avatar
• Publicación de nuevas tarjetas (nombre + enlace de imagen)
• Like y deslike de tarjetas
• Eliminación de tarjetas propias
• Rutas protegidas en el frontend
• Validación robusta en frontend y backend
• Control de errores personalizado

🔐 Autenticación y autorización

El backend usa JWT (JSON Web Token) para autenticar a los usuarios. Una vez que el usuario inicia sesión correctamente, recibe un token que debe enviarse en cada petición protegida mediante el encabezado:

Authorization: Bearer <token>

🚀 Despliegue

El proyecto está desplegado en:
• 🌐 Frontend: https://webaround.jumpingcrab.com
• 🔗 Backend: https://api.webaround.jumpingcrab.com

Servidor VPS configurado con:
• NGINX como servidor proxy inverso
• HTTPS con certificado SSL de Let’s Encrypt
• PM2 para ejecución continua del backend
• SCP y rsync para desplegar código rápidamente

    🙋‍♂️ Autor
    •	Jared Díaz Barranco
