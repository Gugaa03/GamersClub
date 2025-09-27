"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/lib/supabaseClient";
import { useCart, Game as CartGame } from "@/lib/CardContext";
import { motion } from "framer-motion";

interface Game {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number | string | null;
  category?: string;
  reviews?: { user: string; rating: number; comment: string }[];
}

const formatPrice = (price: number | string | null) => {
  if (price === null) return "Preço indisponível";
  if (typeof price === "string") return price;
  return `${price.toFixed(2)} €`;
};

export default function GamePage() {
  const router = useRouter();
  const { id } = router.query;
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);

  const { addToCart, clearCart } = useCart();

  const handleAddToCart = () => {
    if (!game) return;
    const gameToAdd: CartGame = {
      id: game.id,
      title: game.title,
      price: Number(game.price || 0),
      image: game.image,
    };
    addToCart(gameToAdd);
    alert(`${game.title} foi adicionado ao carrinho 🛒`);
  };

  const handleBuyNow = () => {
    if (!game) return;
    const gameToAdd: CartGame = {
      id: game.id,
      title: game.title,
      price: Number(game.price || 0),
      image: game.image,
    };

    clearCart();
    addToCart(gameToAdd);
    localStorage.setItem("cart", JSON.stringify([gameToAdd]));
    router.push("/Checkout");
  };

  useEffect(() => {
    if (!id || typeof id !== "string") return;

    async function fetchGame() {
      setLoading(true);
      const { data, error } = await supabase
        .from("games")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("❌ Erro ao buscar jogo:", error);
        setGame(null);
      } else {
        setGame(data);
      }
      setLoading(false);
    }

    fetchGame();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
        <p className="text-xl animate-pulse">Carregando...</p>
      </div>
    );

  if (!game)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
        <p className="text-xl">❌ Jogo não encontrado.</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
      {/* Hero banner */}
      <div
        className="relative h-[60vh] w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${game.image})` }}
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-11/12 max-w-5xl bg-gray-900/80 rounded-2xl shadow-2xl p-8 flex flex-col md:flex-row gap-8">
          <img
            src={game.image}
            alt={game.title}
            className="w-full md:w-1/3 rounded-xl object-cover shadow-lg"
          />
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h1 className="text-4xl font-extrabold mb-4">{game.title}</h1>
              <p className="text-2xl text-blue-400 font-bold mb-6">
                {formatPrice(game.price)}
              </p>
              <p className="text-gray-300 leading-relaxed line-clamp-5">
                {game.description}
              </p>
            </div>
            <div className="mt-6 flex gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBuyNow}
                className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 rounded-xl text-lg font-semibold shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all"
              >
                Comprar Agora
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
                className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-3 rounded-xl text-lg font-semibold shadow-lg hover:from-green-700 hover:to-emerald-700 transition-all"
              >
                Adicionar ao Carrinho
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-6 py-20 space-y-16">
        {/* Genres */}
        <section>
          <h2 className="text-2xl font-bold mb-4">🎭 Géneros</h2>
          <div className="flex flex-wrap gap-3">
            {["Aventura", "Ação", "Terror"].map((genre) => (
              <span
                key={genre}
                className="px-4 py-2 bg-gray-800 rounded-full shadow hover:bg-gray-700 transition cursor-pointer"
              >
                {genre}
              </span>
            ))}
          </div>
        </section>

        {/* Features */}
        <section>
          <h2 className="text-2xl font-bold mb-4">✨ Características</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
            {["Jogador individual", "História imersiva", "Suporte a múltiplos idiomas"].map(
              (f, i) => (
                <li
                  key={i}
                  className="bg-gray-800 p-4 rounded-xl shadow hover:bg-gray-700 transition"
                >
                  {f}
                </li>
              )
            )}
          </ul>
        </section>

        {/* Requirements */}
        <section>
          <h2 className="text-2xl font-bold mb-4">💻 Requisitos de Sistema</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
              <h3 className="font-semibold mb-2 text-blue-400">Mínimo</h3>
              <p>OS: Windows 7 64-bit</p>
              <p>CPU: 2.5 GHz Quad-core Intel ou AMD</p>
              <p>Memória: 4 GB RAM</p>
              <p>GPU: 1 GB VRAM</p>
              <p>DirectX: 11</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
              <h3 className="font-semibold mb-2 text-green-400">Recomendado</h3>
              <p>OS: Windows 10 64-bit</p>
              <p>CPU: 3.0 GHz Quad-core Intel ou AMD</p>
              <p>Memória: 8 GB RAM</p>
              <p>GPU: 2 GB VRAM</p>
              <p>DirectX: 12</p>
            </div>
          </div>
        </section>

        {/* Reviews */}
        <section>
          <h2 className="text-2xl font-bold mb-6">⭐ Avaliações</h2>
          {game.reviews && game.reviews.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2">
              {game.reviews.map((r, i) => (
                <div
                  key={i}
                  className="bg-gray-800 p-6 rounded-xl shadow-lg hover:bg-gray-700 transition"
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold">{r.user}</p>
                    <p className="text-yellow-400">⭐ {r.rating}/5</p>
                  </div>
                  <p className="text-gray-300">{r.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">Ainda não há avaliações.</p>
          )}
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 mt-16 border-t border-gray-700">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} GamersClub. Todos os direitos
            reservados.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="/terms" className="hover:text-blue-400 transition">
              Termos de Serviço
            </a>
            <a href="/privacy" className="hover:text-blue-400 transition">
              Política de Privacidade
            </a>
            <a href="/contact" className="hover:text-blue-400 transition">
              Contato
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
