import bcrypt from 'bcryptjs';
import express from 'express';
import jwt from 'jsonwebtoken';
import db from '../utils/db.js';

const router = express.Router();

// Signup
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  console.log('Signup request received:', { name, email, password: '***' });
  
  if (!name || !email || !password) {
    console.log('Missing fields');
    return res.status(400).json({ error: 'All fields required' });
  }
  
  try {
    const userExists = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    console.log('User exists check:', userExists.rows.length > 0);
    
    if (userExists.rows.length > 0) {
      console.log('Email already exists:', email);
      return res.status(409).json({ error: 'Email already exists' });
    }
    
    const hash = await bcrypt.hash(password, 10);
    const result = await db.query(
      'INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, name, email, created_at',
      [name, email, hash]
    );
    console.log('User created successfully:', result.rows[0]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'All fields required' });
  try {
    const user = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (user.rows.length === 0) return res.status(401).json({ error: 'Invalid credentials' });
    const valid = await bcrypt.compare(password, user.rows[0].password_hash);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ id: user.rows[0].id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
