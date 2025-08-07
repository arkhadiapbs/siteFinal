const express = require("express");
const path = require("path");
const app = express();
const rotas = require("./routes/routes");

// Servir arquivos estáticos (CSS, imagens, etc.)
app.use(express.static(path.join(__dirname, "public")));

// Servir a pasta de imagens explicitamente (caso algum conflito ocorra)
app.use('/imagens', express.static(path.join(__dirname, 'public', 'imagens')));

// Configuração do EJS
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Rotas
app.use("/", rotas);

// Página 404
app.use((req, res) => {
  res.status(404).send("404 - Página não encontrada");
});

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log("=========================================");
  console.log(`✅ Servidor rodando em: http://localhost:${PORT}`);
  console.log("=========================================");
});
