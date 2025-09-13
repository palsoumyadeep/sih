const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Stats overview endpoint
app.get('/api/admin/overview', (req, res) => {
  res.json({
    totalStudents: 1247,
    companies: 156,
    activeInternships: 89,
    placements: 423,
  });
});

// Smart allocation endpoint
app.post('/api/admin/run-allocation', async (req, res) => {
  // Simulate processing delay
  await new Promise((r) => setTimeout(r, 2000));
  res.json({
    processed: 245,
    allocated: 45,
    message: 'Smart allocation completed successfully!',
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
