const express = require('express');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cookieParser());

const SECRET = process.env.JWT_SECRET || 'dev-secret';

// Demo users
const users = [
  { id: 1, username: 'student@university.edu', password: 'password', profile: { name: 'Student User' } }
];

// Login endpoint issues JWT
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: '1h' });
  res.cookie('token', token, { httpOnly: true });
  res.json({ token });
});

// Middleware to verify JWT for protected routes
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1] || req.cookies.token;
  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET, (err, payload) => {
    if (err) return res.sendStatus(403);
    req.user = payload;
    next();
  });
}

// Profile endpoint uses authenticated user ID
app.get('/api/profile', authenticateToken, (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  if (!user) return res.sendStatus(404);
  res.json(user.profile);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
