// pages/genre/[genre].tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import GameCarousel from "@/components/GameCarousel";
import { supabase } from "@/lib/supabaseClient";

interface Game {
  id: string;
  title: string;
  category: string;
  description?: string;
  price: number;
  image: string;
  badge?: string;
}

export default function GenrePage() {
  const router = useRouter();
  const { genre } = router.query;
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!genre) return;

    async function fetchGames() {
      setLoading(true);
      const { data, error } = await supabase
        .from<Game>("games")
        .select("*")
        .eq("category", genre);

      if (error) {
        console.error("Erro ao buscar jogos:", error);
      } else {
        setGames(data || []);
      }
      setLoading(false);
    }

    fetchGames();
  }, [genre]);

  const filteredGames = games.filter((g) =>
    g.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-950 text-white min-h-screen">
      <Navbar />

      <main className="pt-32 max-w-7xl mx-auto px-6 space-y-12">
        <h1 className="text-3xl font-bold mb-4">
          🎮 Jogos do gênero: {genre}
        </h1>

        <input
          type="text"
          placeholder="🔎 Buscar neste gênero..."
          className="w-full px-4 py-2 rounded-lg bg-gray-800 text-gray-200 placeholder-gray-400 border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {loading ? (
          <p className="mt-4 text-gray-400">Carregando jogos...</p>
        ) : filteredGames.length === 0 ? (
          <p className="mt-4 text-gray-400">
            Nenhum jogo encontrado para este gênero.
          </p>
        ) : (
          <GameCarousel
            title={`Jogos de ${genre}`}
            games={filteredGames.map((g) => ({
              id: g.id,
              name: g.title,
              image: g.image,
              price: g.price === 0 ? "Free" : g.price.toFixed(2) + " €",
              badge: g.badge || undefined,
            }))}
          />
        )}
      </main>
    </div>
  );
}
