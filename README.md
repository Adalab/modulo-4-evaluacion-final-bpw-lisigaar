# 📺 API de Frases de Los Simpsons

Una REST API desarrollada con **Node.js**, **Express** y **MySQL** para consultar y gestionar frases icónicas de los personajes de la serie *The Simpsons*.

---

## 🛠️ Configuración Inicial
Para ejecutar este proyecto, sigue estos pasos:
1. Instala las dependencias: `npm install`
2. Configura tu archivo `.env` con las credenciales de tu base de datos.
3. Importa el archivo SQL de la carpeta `db/` en tu MySQL.
4. Inicia el servidor: `npm run dev`

---

## 🚀 Endpoints disponibles

### 📌 Frases
* 🔹 **GET** `/frases`  
  Obtiene todas las frases, incluyendo información del personaje.
* 🔹 **GET** `/frases/:id`  
  Obtiene una frase por su ID.
* 🔹 **POST** `/frases`  
  Crea una nueva frase.
* 🔹 **PUT** `/frases/:id`  
  Actualiza una frase existente.
* 🔹 **DELETE** `/frases/:id`  
  Elimina una frase.
* 🔹 **GET** `/frases/personaje/:personaje_id`  
  Obtiene todas las frases de un personaje específico.

### 📌 Personajes
* 🔹 **GET** `/personajes`  
  Obtiene todos los personajes.

### 📌 Capítulos
* 🔹 **GET** `/capitulos`  
  Obtiene todos los capítulos.

---

## ℹ️ Notas
> [!IMPORTANT]
> * Todas las respuestas son en formato **JSON**.
> * Si ocurre un error, se devuelve un mensaje de error y el código HTTP correspondiente.
> * Puedes probar los endpoints usando **Postman** o cualquier cliente HTTP.

---
**Autora:** Lis García Arango