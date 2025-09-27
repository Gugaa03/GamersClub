// scripts/updateGame.ts
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import fetch from "node-fetch";
import { createClient } from "@supabase/supabase-js";

// Variáveis de ambiente
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

console.log("🔹 SUPABASE_URL =", supabaseUrl);
console.log("🔹 SUPABASE_SERVICE_KEY =", supabaseKey?.slice(0, 10) + "...");

if (!supabaseUrl || !supabaseKey) {
  throw new Error("❌ As variáveis de ambiente do Supabase não estão definidas!");
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Lista de jogos por gênero (10 jogos por gênero)
const gamesList = [
  // Ação
  { appid: 271590, category: "Ação" }, // GTA V
  { appid: 578080, category: "Ação" }, // PUBG
  { appid: 1174180, category: "Ação" }, // Mortal Kombat 11
  { appid: 1091500, category: "Ação" }, // Cyberpunk 2077
  { appid: 1599340, category: "Ação" }, // Resident Evil Village
  { appid: 1222730, category: "Ação" }, // Valheim
  { appid: 550, category: "Ação" }, // Left 4 Dead 2
  { appid: 4000, category: "Ação" }, // Garry's Mod
  { appid: 271590, category: "Ação" }, // GTA V (repetido para teste)
  { appid: 304930, category: "Ação" }, // Unturned

  // Aventura
  { appid: 292030, category: "Aventura" }, // Witcher 3
  { appid: 105600, category: "Aventura" }, // Terraria
  { appid: 274940, category: "Aventura" }, // Dark Souls II
  { appid: 620, category: "Aventura" }, // Portal 2
  { appid: 225540, category: "Aventura" }, // Don't Starve Together
  { appid: 359550, category: "Aventura" }, // Payday 2
  { appid: 1057090, category: "Aventura" }, // Cyber Hook
  { appid: 211820, category: "Aventura" }, // Torchlight II
  { appid: 105600, category: "Aventura" }, // Terraria (repetido)
  { appid: 323090, category: "Aventura" }, // Don't Starve

  // RPG
  { appid: 238960, category: "RPG" }, // Path of Exile
  { appid: 582010, category: "RPG" }, // Hollow Knight
  { appid: 1091500, category: "RPG" }, // Cyberpunk 2077
  { appid: 325610, category: "RPG" }, // Dark Souls III
  { appid: 292030, category: "RPG" }, // Witcher 3
  { appid: 56790, category: "RPG" }, // The Elder Scrolls V: Skyrim
  { appid: 7660, category: "RPG" }, // Diablo III
  { appid: 105600, category: "RPG" }, // Terraria
  { appid: 1091500, category: "RPG" }, // Cyberpunk 2077 (repetido)
  { appid: 1057090, category: "RPG" }, // Cyber Hook

  // Indie
  { appid: 1811260, category: "Indie" }, // Hades
  { appid: 209080, category: "Indie" }, // Terraria
  { appid: 391540, category: "Indie" }, // Dead Cells
  { appid: 582010, category: "Indie" }, // Hollow Knight
  { appid: 381210, category: "Indie" }, // Ori and the Blind Forest
  { appid: 687890, category: "Indie" }, // Slay the Spire
  { appid: 1057090, category: "Indie" }, // Cyber Hook
  { appid: 225540, category: "Indie" }, // Don't Starve Together
  { appid: 319630, category: "Indie" }, // Castle Crashers
  { appid: 391540, category: "Indie" }, // Dead Cells (repetido)

  // Simulação
  { appid: 578080, category: "Simulação" }, // PUBG
  { appid: 255710, category: "Simulação" }, // Cities: Skylines
  { appid: 250900, category: "Simulação" }, // Kerbal Space Program
  { appid: 105600, category: "Simulação" }, // Terraria
  { appid: 1057090, category: "Simulação" }, // Cyber Hook
  { appid: 1174180, category: "Simulação" }, // Mortal Kombat 11
  { appid: 1091500, category: "Simulação" }, // Cyberpunk 2077
  { appid: 292030, category: "Simulação" }, // Witcher 3
  { appid: 271590, category: "Simulação" }, // GTA V
  { appid: 4000, category: "Simulação" }, // Garry's Mod

  // Esportes
  { appid: 1506830, category: "Esportes" }, // FIFA 23
  { appid: 1600120, category: "Esportes" }, // NBA 2K23
  { appid: 1730800, category: "Esportes" }, // PGA Tour 2K21
  { appid: 1747740, category: "Esportes" }, // F1 22
  { appid: 1551360, category: "Esportes" }, // Madden NFL 22
  { appid: 207940, category: "Esportes" }, // Rocket League
  { appid: 252950, category: "Esportes" }, // Football Manager 2021
  { appid: 220, category: "Esportes" }, // Half-Life (teste)
  { appid: 105600, category: "Esportes" }, // Terraria (teste)
  { appid: 730, category: "Esportes" }, // CS:GO
  { appid: 440, category: "Esportes" }, // Team Fortress 2
];

// Função para buscar dados da Steam
async function fetchSteamGame(appid: number) {
  try {
    console.log(`🔹 Buscando Steam AppID: ${appid}`);
    const res = await fetch(
      `https://store.steampowered.com/api/appdetails?appids=${appid}&cc=br&l=pt`
    );
    const data: any = await res.json();
    const gameData = data[appid]?.data;
    if (!gameData) {
      console.log(`⚠️ Jogo não encontrado: ${appid}`);
      return null;
    }

    return {
      id: appid,
      name: gameData.name,
      image: gameData.header_image,
      description: gameData.short_description,
    };
  } catch (err) {
    console.error("❌ Erro Steam:", err);
    return null;
  }
}

// Atualiza Supabase
async function updateSupabase() {
  console.log("🔹 Iniciando atualização...");
  for (const g of gamesList) {
    const game = await fetchSteamGame(g.appid);
    if (!game) continue;

    const { error } = await supabase.from("games").upsert({
      title: game.name,
      description: game.description,
      category: g.category,
      image: game.image,
    });

    if (error) console.error("❌ Erro Supabase:", error);
    else console.log(`✅ Inserido/upsertado: ${game.name} -> ${g.category}`);
  }
  console.log("🔹 Atualização concluída!");
}

updateSupabase();
