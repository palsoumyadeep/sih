const express = require('express');
const authRoutes = require('./routes/auth');
const studentRoutes = require('./routes/students');
const internshipRoutes = require('./routes/internships');
const allocationRoutes = require('./routes/allocations');

const app = express();
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/students', studentRoutes);
app.use('/internships', internshipRoutes);
app.use('/allocations', allocationRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
