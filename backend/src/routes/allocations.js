const express = require('express');
const db = require('../db');

const router = express.Router();

router.post('/', async (req, res) => {
  const { student_id, internship_id } = req.body;
  try {
    const [id] = await db('allocations').insert({ student_id, internship_id });
    res.json({ id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  const allocations = await db('allocations');
  res.json(allocations);
});

module.exports = router;
