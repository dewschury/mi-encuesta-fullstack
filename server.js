const express = require('express');
const cors = require('cors');
const { createClient } = require('@libsql/client');
require('dotenv').config();

const db = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

const app = express();
app.use(cors());
app.use(express.json());

// Crear la tabla en la nube
db.execute(`
  CREATE TABLE IF NOT EXISTS respuestas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    r1 TEXT, r2 TEXT, r3 TEXT, r4 TEXT, r5 TEXT,
    r6 TEXT, r7 TEXT, r8 TEXT, r9 TEXT, r10 TEXT
  )
`).catch(console.error);

app.post('/api', async (req, res) => {
  try {
    await db.execute({
      sql: `INSERT INTO respuestas (r1, r2, r3, r4, r5, r6, r7, r8, r9, r10) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        req.body.r1, req.body.r2, req.body.r3, req.body.r4, req.body.r5,
        req.body.r6, req.body.r7, req.body.r8, req.body.r9, req.body.r10
      ]
    });
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api', async (req, res) => {
  try {
    const result = await db.execute('SELECT * FROM respuestas');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Servidor listo en puerto ${port}`));