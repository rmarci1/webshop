import express from "express";
import cors from 'cors';
import mysql from 'mysql2';

const app = express();
const port = 3000;

app.use(cors())

app.use(express.json());

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'webshop',
}).promise();


app.get('/books', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM books');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Database query failed' });
    }
});

app.get('/clothes', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM clothes');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Database query failed' });
    }
});

app.get('/equipment', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM equipment');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Database query failed' });
    }
});

// Start the server
app.listen(port);
