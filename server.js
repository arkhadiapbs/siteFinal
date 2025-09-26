const express = require("express");
const path = require("path");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mongoose = require("mongoose");
const jogos = require("./routes/jogos");
const Marketplace = require("./routes/Marketplace");
const Comunidade = require("./routes/Comunidade");
const Home = require("./routes/home");
const auth = require("./routes/auth");

//conexao com o mongo
mongoose.connect("mongodb+srv://arkhadia168_db_user:safu54e0ahDeMh02@arkhadia.tc5pwcx.mongodb.net/Arkhadia", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB conectado"))
  .catch(err => console.log(err));

// Servir arquivos estáticos (CSS, imagens, etc.)
app.use(express.static(path.join(__dirname, "public")));

// Servir a pasta de imagens explicitamente (caso algum conflito ocorra)
app.use('/imagens', express.static(path.join(__dirname, 'public', 'imagens')));

// Configuração do EJS
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Rotas
app.use("/", Home);
app.use("/Jogos", jogos);
app.use("/Marketplace", Marketplace);
app.use("/Comunidade", Comunidade);
app.use("/auth", auth);

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
