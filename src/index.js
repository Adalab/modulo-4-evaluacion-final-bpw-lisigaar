const express = require("express");
const cors = require("cors");
const db = require("./db");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// 1. LISTAR PERSONAJES (Esto arreglará el error "Cannot GET /personajes")
app.get("/personajes", async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM personajes");
    res.json({
      info: { count: rows.length },
      results: rows,
    });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener personajes" });
  }
});

// 2. LISTAR CAPÍTULOS
app.get("/capitulos", async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM capitulos");
    res.json({
      info: { count: rows.length },
      results: rows,
    });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener capítulos" });
  }
});

// 3. CRUD DE FRASES
// Listar todas con nombre de personaje
app.get("/frases", async (req, res) => {
  try {
    const [rows] = await db.execute(`
      SELECT frases.*, personajes.nombre as nombre_personaje 
      FROM frases 
      JOIN personajes ON frases.personaje_id = personajes.id;
    `);
    res.json({
      info: { count: rows.length },
      results: rows,
    });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las frases" });
  }
});

// Insertar frase
app.post("/frases", async (req, res) => {
  const { texto, marca_tiempo, descripcion, personaje_id } = req.body;
  try {
    const [result] = await db.execute(
      "INSERT INTO frases (texto, marca_tiempo, descripcion, personaje_id) VALUES (?, ?, ?, ?)",
      [texto, marca_tiempo, descripcion, personaje_id]
    );
    res.status(201).json({ success: true, id: result.insertId });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error al crear la frase" });
  }
});

// Actualizar frase
app.put("/frases/:id", async (req, res) => {
  const { id } = req.params;
  const { texto, marca_tiempo, descripcion, personaje_id } = req.body;
  try {
    const [result] = await db.execute(
      "UPDATE frases SET texto = ?, marca_tiempo = ?, descripcion = ?, personaje_id = ? WHERE id = ?",
      [texto, marca_tiempo, descripcion, personaje_id, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Frase no encontrada" });
    }
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error al actualizar" });
  }
});

// Eliminar frase
app.delete("/frases/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.execute("DELETE FROM frases WHERE id = ?", [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Frase no encontrada" });
    }
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error al eliminar" });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});