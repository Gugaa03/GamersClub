"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

interface Game {
  id: string;
  title: string;
  image: string;
  price: number;
  purchased_at?: string;
}

export default function LibraryPage() {
  const { user } = useAuth();
  const [library, setLibrary] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    async function fetchLibrary() {
      setLoading(true);

      try {
        const { data: purchases, error: purchaseError } = await supabase
          .from("purchases")
          .select("game_id, purchased_at")
          .eq("user_id", user.id);

        if (purchaseError) throw purchaseError;
        if (!purchases || purchases.length === 0) {
          setLibrary([]);
          setLoading(false);
          return;
        }

        const gameIds = purchases.map((p: any) => p.game_id);

        const { data: games, error: gameError } = await supabase
          .from("games")
          .select("*")
          .in("id", gameIds);

        if (gameError) throw gameError;

        const libraryWithDate = games.map((g: any) => {
          const purchase = purchases.find((p: any) => p.game_id === g.id);
          return { ...g, purchased_at: purchase?.purchased_at };
        });

        setLibrary(libraryWithDate);
      } catch (error) {
        console.error("Erro ao buscar biblioteca:", error);
      }

      setLoading(false);
    }

    fetchLibrary();
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
        <p className="text-xl">⚠️ Faça login para acessar sua biblioteca.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
        <p className="text-xl animate-pulse">Carregando sua biblioteca...</p>
      </div>
    );
  }

  if (library.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
        <p className="mb-6 text-lg">📭 Você ainda não comprou nenhum jogo.</p>
        <Link
          href="/"
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold text-white shadow-lg transition transform hover:scale-105"
        >
          Explorar Jogos
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
      <div className="px-6 py-12 max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-10 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          🎮 Minha Biblioteca
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {library.map((game) => (
            <div
              key={game.id}
              className="bg-gray-800 rounded-2xl overflow-hidden shadow-lg transform hover:scale-105 transition duration-300 hover:shadow-blue-600/30"
            >
              <div className="relative">
                <img
                  src={game.image}
                  alt={game.title}
                  className="w-full h-56 object-cover"
                />
                <span className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                  €{game.price.toFixed(2)}
                </span>
              </div>
              <div className="p-4 flex flex-col justify-between h-40">
                <h2 className="text-lg font-bold truncate">{game.title}</h2>
                <p className="text-gray-400 text-sm">
                 📅 Data de compra:  {new Date(game.purchased_at!).toLocaleDateString()}
                </p>
                <Link
                  href={`/games/${game.id}`}
                  className="mt-3 inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-4 py-2 rounded-lg font-semibold text-center transition transform hover:scale-105"
                >
                  Jogar ▶
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
