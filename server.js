const express = require('express');
const cors = require('cors');
const Database = require('better-sqlite3');

const db = new Database('surveys.db');
// Ahora la tabla tiene 3 columnas para respuestas
db.exec('CREATE TABLE IF NOT EXISTS respuestas(id INTEGER PRIMARY KEY, r1 TEXT, r2 TEXT, r3 TEXT, r4 TEXT, r5 TEXT, r6 TEXT, r7 TEXT, r8 TEXT, r9 TEXT, r10 TEXT)');

const app = express();
app.use(cors());
app.use(express.json());

// Ahora el POST espera 3 respuestas (r1, r2, r3)
app.post('/api', (req, res) => {
  db.prepare('INSERT INTO respuestas(r1, r2, r3, r4, r5, r6, r7, r8, r9, r10) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)').run(req.body.r1, req.body.r2, req.body.r3, req.body.r4, req.body.r5, req.body.r6, req.body.r7, req.body.r8, req.body.r9, req.body.r10);
  res.json({ ok: true });
});

// El GET sigue igual, devuelve todo
app.get('/api', (req, res) => {
  res.json(db.prepare('SELECT * FROM respuestas').all());
});

const port = process.env.PORT || 3000;
app.listen(3000, () => console.log('Servidor listo en http://localhost:3000'));
