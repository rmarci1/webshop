import express from "express";
import cors from 'cors';
import mysql from 'mysql2';
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import session from "express-session";
import MySQLStore from "express-mysql-session";

const MySQLSessionStore = MySQLStore(session);
const app = express();
const port = 3000;

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'webshop',
  }).promise();
const sessionStore = new MySQLSessionStore({}, db);
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
  }));

app.use(bodyParser.json());
app.use(session({
    key: 'session_cookie_name',
    secret: 'your_secret_key',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true, maxAge: 60000 } // Sütik beállításai
  }));

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
      if (rows.length > 0) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      await db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
});
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
      if (rows.length === 0) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      const user = rows[0];
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      req.session.user = { id: user.id, username: user.username };
      res.json({ message: 'Login successful' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
});
app.get('/protected', (req, res) => {
    if (!req.session.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    res.json({ message: `${req.session.user.username}` });
});
app.post('/logout', (req, res) => {
    req.session.destroy(err => {
      if (err) {
        return res.status(500).json({ message: 'Logout failed' });
      }
      res.clearCookie('session_cookie_name');
      res.json({ message: 'Logout successful' });
    });
  });
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
app.post('/update-username', async (req, res) => {
  const { currentUsername, newUsername } = req.body;

  try {
    // Ellenőrzés, hogy az új név nem foglalt-e
    const [existingUser] = await db.query(
      'SELECT * FROM users WHERE username = ?',
      [newUsername]
    );
    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    // Frissítés a régi név alapján
    const [result] = await db.query(
      'UPDATE users SET username = ? WHERE username = ?',
      [newUsername, currentUsername]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'Username updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/update-password', async (req, res) => {
  const { username, newPassword } = req.body;

  try {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!passwordRegex.test(newPassword)) {
      return res.status(400).json({
        message: 'Password must be at least 6 characters long, contain a lowercase letter, an uppercase letter, and a number',
      });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const [result] = await db.query(
      'UPDATE users SET password = ? WHERE username = ?',
      [hashedPassword, username]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.listen(port);
