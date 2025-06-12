const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Видача клієнтських файлів
app.use(express.static(path.join(__dirname, '../client')));

// Приклад API
app.get('/api/status', (req, res) => {
  res.json({ status: 'OK', message: 'Agro IoT server is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
