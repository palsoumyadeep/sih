const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');

const router = express.Router();
const SECRET = process.env.JWT_SECRET || 'secret';

router.post('/students/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    const [id] = await db('students').insert({ name, email, password: hashed });
    res.json({ id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/students/login', async (req, res) => {
  const { email, password } = req.body;
  const student = await db('students').where({ email }).first();
  if (!student) return res.status(400).json({ error: 'Invalid credentials' });
  const valid = await bcrypt.compare(password, student.password);
  if (!valid) return res.status(400).json({ error: 'Invalid credentials' });
  const token = jwt.sign({ id: student.id, type: 'student' }, SECRET);
  res.json({ token });
});

router.post('/companies/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    const [id] = await db('companies').insert({ name, email, password: hashed });
    res.json({ id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/companies/login', async (req, res) => {
  const { email, password } = req.body;
  const company = await db('companies').where({ email }).first();
  if (!company) return res.status(400).json({ error: 'Invalid credentials' });
  const valid = await bcrypt.compare(password, company.password);
  if (!valid) return res.status(400).json({ error: 'Invalid credentials' });
  const token = jwt.sign({ id: company.id, type: 'company' }, SECRET);
  res.json({ token });
});

module.exports = router;
