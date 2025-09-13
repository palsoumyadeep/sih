const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cookieParser());

const users = [];
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

app.post('/api/auth/register', async (req, res) => {
  const { username, password, role } = req.body;
  if (!username || !password || !role) {
    return res.status(400).json({ message: 'username, password and role are required' });
  }

  const existing = users.find(u => u.username === username && u.role === role);
  if (existing) {
    return res.status(409).json({ message: 'User already exists' });
  }

  const hashed = await bcrypt.hash(password, 10);
  const user = {
    id: users.length + 1,
    username,
    password: hashed,
    role,
    profile: {}
  };
  users.push(user);

  res.status(201).json({ message: 'Registered' });
});

app.post('/api/auth/login', async (req, res) => {
  const { username, password, role } = req.body;
  const user = users.find(u => u.username === username && u.role === role);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
  res.cookie('token', token, { httpOnly: true });
  res.json({ message: 'Logged in' });
});

function auth(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch (err) {
    res.status(401).json({ message: 'Unauthorized' });
  }
}

app.get('/api/profile', auth, (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  if (!user) {
    return res.status(404).json({ message: 'Not found' });
  }
  res.json({ username: user.username, role: user.role, profile: user.profile });
});

app.put('/api/profile', auth, (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  if (!user) {
    return res.status(404).json({ message: 'Not found' });
  }
  user.profile = { ...user.profile, ...req.body };
  res.json({ message: 'Profile updated', profile: user.profile });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;

