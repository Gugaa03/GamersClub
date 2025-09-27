// pages/genre/[genre].tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

interface Game {
  id: string;
  title: string;
  category: string;
  description?: string;
  price: number;
  image: string;
  badge?: string;
}

type PriceFilter = "all" | "free" | "under10" | "above10";
type SortOption = "asc" | "desc";

export default function GenrePage() {
  const router = useRouter();
  const { genre } = router.query;
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState<PriceFilter>("all");
  const [sortOption, setSortOption] = useState<SortOption>("asc");

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

  const filteredAndSortedGames = games
    .filter((g) =>
      g.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((g) => {
      if (priceFilter === "free") return g.price === 0;
      if (priceFilter === "under10") return g.price > 0 && g.price <= 10;
      if (priceFilter === "above10") return g.price > 10;
      return true;
    })
    .sort((a, b) =>
      sortOption === "asc" ? a.price - b.price : b.price - a.price
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

        {/* Search + Filters */}
        <div className="flex flex-col md:flex-row gap-4 items-center">
          {/* Search */}
          <input
            type="text"
            placeholder="🔎 Buscar neste gênero..."
            className="flex-1 px-4 py-3 rounded-xl bg-gray-800/70 backdrop-blur-sm text-gray-200 placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-all duration-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* Filtro preço */}
          <select
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value as PriceFilter)}
            className="px-4 py-3 rounded-xl bg-gray-800/70 text-gray-200 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          >
            <option value="all">💰 Todos os preços</option>
            <option value="free">🆓 Apenas grátis</option>
            <option value="under10">💵 Até 10€</option>
            <option value="above10">💎 Acima de 10€</option>
          </select>

          {/* Ordenação */}
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value as SortOption)}
            className="px-4 py-3 rounded-xl bg-gray-800/70 text-gray-200 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          >
            <option value="asc">⬆️ Preço Crescente</option>
            <option value="desc">⬇️ Preço Decrescente</option>
          </select>
        </div>

        {/* Loading / Empty / Games */}
        {loading ? (
          <p className="mt-6 text-gray-400 animate-pulse">
            Carregando jogos...
          </p>
        ) : filteredAndSortedGames.length === 0 ? (
          <p className="mt-6 text-gray-400">
            Nenhum jogo encontrado para este gênero.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredAndSortedGames.map((game) => (
              <div
                key={game.id}
                className="bg-gray-800/80 rounded-2xl overflow-hidden shadow-lg hover:shadow-purple-600/20 transform hover:scale-105 transition duration-300"
              >
                <div className="relative">
                  <img
                    src={game.image}
                    alt={game.title}
                    className="w-full h-48 object-cover"
                  />
                  {game.badge && (
                    <span className="absolute top-2 left-2 bg-purple-600 text-xs px-2 py-1 rounded">
                      {game.badge}
                    </span>
                  )}
                  <span className="absolute top-2 right-2 bg-blue-600 text-xs px-2 py-1 rounded">
                    {game.price === 0 ? "Free" : `€${game.price.toFixed(2)}`}
                  </span>
                </div>
                <div className="p-4 flex flex-col h-32 justify-between">
                  <h2 className="text-lg font-bold truncate">{game.title}</h2>
                  <Link
                    href={`/games/${game.id}`}
                    className="mt-3 inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-4 py-2 rounded-lg font-semibold text-center transition transform hover:scale-105"
                  >
                    Ver Jogo ▶
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
