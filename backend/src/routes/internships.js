const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/', async (req, res) => {
  const internships = await db('internships');
  res.json(internships);
});

router.post('/', async (req, res) => {
  const { company_id, title, description } = req.body;
  const [id] = await db('internships').insert({ company_id, title, description });
  res.json({ id });
});

router.get('/:id', async (req, res) => {
  const internship = await db('internships').where({ id: req.params.id }).first();
  if (!internship) return res.status(404).json({ error: 'Not found' });
  res.json(internship);
});

router.put('/:id', async (req, res) => {
  const { title, description } = req.body;
  await db('internships').where({ id: req.params.id }).update({ title, description });
  res.json({ updated: true });
});

router.delete('/:id', async (req, res) => {
  await db('internships').where({ id: req.params.id }).del();
  res.json({ deleted: true });
});

module.exports = router;
