// Importa o módulo Express, um framework para criação de servidores web em Node.js.
const express = require('express');

// Importa o módulo 'path' para manipulação de diretórios e caminhos de arquivos.
const path = require('path');

// Cria uma instância do aplicativo Express.
const app = express();

// Define a porta do servidor. Usa a variável de ambiente 'PORT' se disponível; caso contrário, usa a porta 3000.
const PORT = process.env.PORT || 3000;

// Define a pasta 'frontend' como um diretório de arquivos estáticos, permitindo servir arquivos como HTML, CSS, JavaScript e imagens.
// Resolve corretamente o caminho absoluto do diretório de arquivos estáticos.
app.use(express.static(path.resolve(__dirname, '../frontend')));

// Rota para a página inicial ('/'). Quando um usuário acessar essa rota, o servidor enviará o arquivo 'index.html' localizado na pasta 'frontend'.
//Garante que o caminho do arquivo HTML seja resolvido corretamente.
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/index.html'));
});

// Inicia o servidor na porta definida e exibe uma mensagem no console informando que ele está rodando.
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
