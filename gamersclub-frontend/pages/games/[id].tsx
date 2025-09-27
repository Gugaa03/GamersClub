"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/lib/supabaseClient";
import { useCart, Game as CartGame } from "@/lib/CardContext";

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

  // Adicionar ao carrinho sem limpar
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

  // Comprar agora: limpa carrinho, adiciona o jogo e vai para o checkout existente
  const handleBuyNow = () => {
  if (!game) return;

  const gameToAdd: Game = {
    id: game.id,
    title: game.title,
    price: Number(game.price || 0),
    image: game.image,
  };

  clearCart(); // Limpa o carrinho
  addToCart(gameToAdd); // Adiciona apenas este jogo
  localStorage.setItem("cart", JSON.stringify([gameToAdd])); // Persistência

  router.push("/Checkout"); // Redireciona para a página de checkout
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
      <div className="pt-24 max-w-6xl mx-auto px-6 space-y-16">
        {/* Cabeçalho */}
        <div className="flex flex-col md:flex-row gap-8 bg-gray-800 rounded-2xl shadow-lg overflow-hidden p-6">
          <img
            src={game.image}
            alt={game.title}
            className="w-full md:w-1/3 h-auto rounded-lg object-cover shadow-lg"
          />
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-4">{game.title}</h1>
              <p className="text-xl text-blue-400 font-semibold mb-4">
                {formatPrice(game.price)}
              </p>
              <p className="text-gray-300 leading-relaxed">{game.description}</p>
            </div>
            <div className="mt-6 flex gap-4">
              <button
                onClick={handleBuyNow}
                className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-lg font-semibold transition-transform transform hover:scale-105"
              >
                Comprar Agora
              </button>
              <button
                onClick={handleAddToCart}
                className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg text-lg font-semibold transition-transform transform hover:scale-105"
              >
                Adicionar ao Carrinho
              </button>
            </div>
          </div>
        </div>

        {/* Géneros */}
        <section>
          <h2 className="text-2xl font-bold mb-4">🎭 Géneros</h2>
          <div className="flex flex-wrap gap-3">
            <span className="px-4 py-2 bg-gray-700 rounded-lg">Aventura</span>
            <span className="px-4 py-2 bg-gray-700 rounded-lg">Ação</span>
            <span className="px-4 py-2 bg-gray-700 rounded-lg">Terror</span>
          </div>
        </section>

        {/* Características */}
        <section>
          <h2 className="text-2xl font-bold mb-4">✨ Características</h2>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>Jogador individual</li>
            <li>História imersiva</li>
            <li>Suporte a múltiplos idiomas</li>
          </ul>
        </section>

        {/* Requisitos */}
        <section>
          <h2 className="text-2xl font-bold mb-4">💻 Requisitos de Sistema</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Mínimo</h3>
              <p>OS: Windows 7 64-bit</p>
              <p>CPU: 2.5 GHz Quad-core Intel ou AMD</p>
              <p>Memória: 4 GB RAM</p>
              <p>GPU: 1 GB VRAM</p>
              <p>DirectX: 11</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Recomendado</h3>
              <p>OS: Windows 10 64-bit</p>
              <p>CPU: 3.0 GHz Quad-core Intel ou AMD</p>
              <p>Memória: 8 GB RAM</p>
              <p>GPU: 2 GB VRAM</p>
              <p>DirectX: 12</p>
            </div>
          </div>
        </section>

        {/* Avaliações */}
        <section>
          <h2 className="text-2xl font-bold mb-4">⭐ Avaliações</h2>
          {game.reviews && game.reviews.length > 0 ? (
            game.reviews.map((r, i) => (
              <div key={i} className="mb-4 p-4 bg-gray-800 rounded-lg">
                <p className="font-semibold">{r.user}</p>
                <p>⭐ {r.rating}/5</p>
                <p className="text-gray-300">{r.comment}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-400">Ainda não há avaliações.</p>
          )}
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 py-8 mt-16">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} GamersClub. Todos os direitos reservados.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="/terms" className="hover:text-white transition">
              Termos de Serviço
            </a>
            <a href="/privacy" className="hover:text-white transition">
              Política de Privacidade
            </a>
            <a href="/contact" className="hover:text-white transition">
              Contato
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
