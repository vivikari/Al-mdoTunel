const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

// Servindo arquivos estáticos do front
app.use(express.static(path.join(__dirname, '../front')));

// Rota principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../front/index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
