const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/:id/profile', async (req, res) => {
  const profile = await db('student_profiles').where({ student_id: req.params.id }).first();
  res.json(profile || {});
});

router.put('/:id/profile', async (req, res) => {
  const { major, year, resume } = req.body;
  const existing = await db('student_profiles').where({ student_id: req.params.id }).first();
  if (existing) {
    await db('student_profiles').where({ student_id: req.params.id }).update({ major, year, resume });
    res.json({ updated: true });
  } else {
    await db('student_profiles').insert({ student_id: req.params.id, major, year, resume });
    res.json({ created: true });
  }
});

module.exports = router;
