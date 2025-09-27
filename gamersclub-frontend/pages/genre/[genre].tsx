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
      {/* Navbar */}
      <Navbar />

      <main className="pt-32 max-w-7xl mx-auto px-6 space-y-8">
        {/* Header */}
        <h1 className="text-3xl md:text-4xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-gradient-x">
          🎮 Jogos do gênero: {genre}
        </h1>

        {/* Search */}
        <input
          type="text"
          placeholder="🔎 Buscar neste gênero..."
          className="w-full px-4 py-3 rounded-xl bg-gray-800/70 backdrop-blur-sm text-gray-200 placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-all duration-300"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Loading / Empty / Games */}
        {loading ? (
          <p className="mt-6 text-gray-400 animate-pulse">Carregando jogos...</p>
        ) : filteredGames.length === 0 ? (
          <p className="mt-6 text-gray-400">Nenhum jogo encontrado para este gênero.</p>
        ) : (
          <div className="space-y-6">
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
          </div>
        )}
      </main>
    </div>
  );
}
