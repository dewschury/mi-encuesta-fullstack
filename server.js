const express = require('express');
const cors = require('cors');
const Database = require('better-sqlite3');

const db = new Database('surveys.db');
// Ahora la tabla tiene 3 columnas para respuestas
db.exec('CREATE TABLE IF NOT EXISTS respuestas(id INTEGER PRIMARY KEY, r1 TEXT, r2 TEXT, r3 TEXT)');

const app = express();
app.use(cors());
app.use(express.json());

// Ahora el POST espera 3 respuestas (r1, r2, r3)
app.post('/api', (req, res) => {
  db.prepare('INSERT INTO respuestas(r1, r2, r3) VALUES(?, ?, ?)').run(req.body.r1, req.body.r2, req.body.r3);
  res.json({ ok: true });
});

// El GET sigue igual, devuelve todo
app.get('/api', (req, res) => {
  res.json(db.prepare('SELECT * FROM respuestas').all());
});

app.listen(3000, () => console.log('Servidor listo en http://localhost:3000'));