const express = require('express');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';

// Simple in-memory users by type for demo purposes
const users = {
  student: { password: 'student123', role: 'student' },
  company: { password: 'company123', role: 'company' },
  admin: { password: 'admin123', role: 'admin' }
};

app.post('/api/auth/:type/login', (req, res) => {
  const { type } = req.params;
  const { username, password } = req.body;
  const user = users[type];
  if (!user || username !== type || password !== user.password) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = jwt.sign({ role: user.role, username }, JWT_SECRET, { expiresIn: '1h' });
  res.cookie('token', token, { httpOnly: true, sameSite: 'strict' });
  res.json({ token });
});

app.get('/api/auth/me', (req, res) => {
  const token = req.cookies.token || (req.headers.authorization || '').replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'No token' });
  try {
    const data = jwt.verify(token, JWT_SECRET);
    res.json({ user: data });
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

app.listen(PORT, () => {
  console.log(`Auth server listening on ${PORT}`);
});
