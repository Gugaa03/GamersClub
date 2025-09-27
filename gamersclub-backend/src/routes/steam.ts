import { Router } from "express";

const router = Router();

// Função para buscar dados da Steam
async function fetchSteamGame(appid: number) {
  try {
    console.log(`🔍 Buscando dados do jogo Steam com appid=${appid}`);
    
    const res = await fetch(
      `https://store.steampowered.com/api/appdetails?appids=${appid}&cc=br&l=pt`
    );

    if (!res.ok) {
      console.error(`❌ Erro na resposta da Steam: ${res.status}`);
      return null;
    }

    const data = await res.json();
    const gameData = data[appid]?.data;

    if (!gameData) {
      console.warn(`⚠️ Nenhum dado encontrado para appid=${appid}`);
      return null;
    }

    return {
      id: appid,
      name: gameData.name,
      image: gameData.header_image,
      description: gameData.short_description,
    };
  } catch (err) {
    console.error("❌ Exceção ao buscar dados da Steam:", err);
    return null;
  }
}

// Rota para buscar vários jogos
router.get("/", async (req, res) => {
  const appids = [570, 730, 440, 292030, 238960]; // Dota2, CS:GO, TF2, Witcher3, PoE
  const games = [];

  for (const id of appids) {
    const game = await fetchSteamGame(id);
    if (game) games.push(game);
  }

  console.log(`✅ Jogos buscados: ${games.map(g => g.name).join(", ")}`);
  res.json(games);
});

export default router;
