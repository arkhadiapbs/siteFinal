const express = require("express");
const router = express.Router();

const votos = {}; // Votos salvos por IP

const candidatos = [
  "Elden Ring",
  "God of War Ragnarök",
  "Final Fantasy XVI"
];

// ✅ Esta é a única rota GET que você precisa
router.get("/", (req, res) => {
  const top10Ano = [
    "The Legend of Zelda: Breath of the Wild",
    "Elden Ring",
    "God of War Ragnarök",
    "Horizon Forbidden West",
    "Resident Evil Village",
    "Halo Infinite",
    "Final Fantasy XVI",
    "Metroid Dread",
    "Cyberpunk 2077",
    "Deathloop"
  ];

  const maisJogados = [
    "Fortnite",
    "League of Legends",
    "Minecraft",
    "Valorant",
    "Call of Duty: Warzone",
    "Genshin Impact",
    "Among Us",
    "Apex Legends",
    "Counter-Strike: Global Offensive",
    "Roblox"
  ];

  res.render("pages/jogos", { top10Ano, maisJogados, candidatos });
});

// API de votação
router.post("/api/voto", express.json(), (req, res) => {
  const ip = req.ip;
  const { jogo, justificativa } = req.body;

  if (votos[ip]) {
    return res.status(403).json({ message: "Você já votou!" });
  }

  if (!candidatos.includes(jogo)) {
    return res.status(400).json({ message: "Jogo inválido." });
  }

  votos[ip] = { jogo, justificativa };
  console.log(`🗳️ Voto registrado de ${ip}: ${jogo} — ${justificativa}`);
  return res.json({ message: "Voto registrado com sucesso!" });
});

module.exports = router;
