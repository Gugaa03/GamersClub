"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useAuth } from "@/lib/AuthContext";
import { ShoppingCart } from "lucide-react";
import CartSidebar from "./CartSidebar";
import { supabase } from "@/lib/supabaseClient";

const genres = ["Ação", "Aventura", "RPG", "Indie", "Simulação", "Esportes"];

interface Game {
  id: string;
  title: string;
  image: string;
  price: number;
}

export default function Navbar() {
  const { user, logout } = useAuth();
  const [games, setGames] = useState<Game[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Game[]>([]);
  const [showSearch, setShowSearch] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Carrinho
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<Game[]>([]);

  // Pega carrinho do localStorage
useEffect(() => {
  async function fetchGames() {
    console.log("🔍 Buscando jogos do Supabase...");
    const { data, error } = await supabase
      .from("games")
      .select("id, title, price, image");

    if (error) {
      console.error("❌ Erro ao buscar jogos do Supabase:", error);
    } else {
      console.log("✅ Jogos recebidos do Supabase:", data);
      setGames(data || []);
    }
  }
  fetchGames();
}, []);


  // Busca jogos do Supabase
  useEffect(() => {
    async function fetchGames() {
      console.log("🔍 Buscando jogos do Supabase...");
      const { data, error } = await supabase
        .from("games")
        .select("id, title, price, image");

      if (error) {
        console.error("❌ Erro ao buscar jogos do Supabase:", error);
      } else {
        console.log("✅ Jogos recebidos do Supabase:", data);
        setGames(data || []);
      }
    }
    fetchGames();
  }, []);

  // Filtra resultados enquanto digita
  useEffect(() => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      console.log("🔍 Pesquisa limpa, resultados zerados");
      return;
    }
    const filtered = games.filter((g) =>
      g.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    console.log("🔍 Resultados filtrados para:", searchTerm, filtered);
    setSearchResults(filtered);
  }, [searchTerm, games]);

  return (
    <>
      <nav className="w-full bg-gray-800 p-4 shadow-md fixed top-0 left-0 z-50 flex justify-between items-center h-20">
        {/* Logo */}
        <h1 className="text-2xl sm:text-3xl font-bold text-white">
          <Link href="/">GamersClub</Link>
        </h1>

        <div className="flex items-center space-x-6 text-sm sm:text-base relative">
          {/* Explorar Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <span className="flex items-center text-gray-300 hover:text-blue-400 cursor-pointer">
              Explorar
            </span>
            <div
              className={`absolute top-full left-0 mt-2 w-48 bg-gray-700 rounded-md shadow-lg z-50 transition-all duration-150 ${
                dropdownOpen ? "opacity-100 visible" : "opacity-0 invisible"
              }`}
            >
              {genres.map((genre, i) => (
                <Link
                  key={i}
                  href={`/games?genre=${genre}`}
                  className="block px-4 py-2 text-white hover:bg-gray-600"
                >
                  {genre}
                </Link>
              ))}
              <hr className="border-gray-600 my-1" />
              <Link
                href="/promotions"
                className="block px-4 py-2 text-white hover:bg-gray-600"
              >
                Promoções
              </Link>
              <Link
                href="/novidades"
                className="block px-4 py-2 text-white hover:bg-gray-600"
              >
                Novidades
              </Link>
            </div>
          </div>

          {/* Minha Biblioteca */}
          {user && (
            <Link
              href="/Library"
              className="text-gray-300 hover:text-blue-400"
            >
              Minha Biblioteca
            </Link>
          )}

          {/* Pesquisa */}
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar jogos..."
              className="px-3 py-1 rounded-md text-black w-32 sm:w-48 focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setShowSearch(true)}
              onBlur={() => setTimeout(() => setShowSearch(false), 200)}
            />
            {showSearch && searchResults.length > 0 && (
              <div className="absolute top-full left-0 w-full bg-gray-700 rounded-md shadow-lg mt-1 z-50 max-h-60 overflow-y-auto">
                {searchResults.map((g) => (
                  <Link
                    key={g.id}
                    href={`/games/${g.id}`}
                    className="block px-4 py-2 text-white hover:bg-gray-600"
                    onClick={() => setShowSearch(false)}
                  >
                    {g.title}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Carrinho */}
          <button
            onClick={() => setCartOpen(true)}
            className="relative focus:outline-none"
          >
            <ShoppingCart className="w-6 h-6 text-gray-300 hover:text-blue-400 transition" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {cart.length}
              </span>
            )}
          </button>

          {/* Conta / Login */}
          {user ? (
            <div className="relative group">
              <span className="text-gray-300 hover:text-blue-400 cursor-pointer">
                Olá, {user.nickname || user.name} 💰 €
                {user.balance?.toFixed(2) || "0"}
              </span>
              <div className="absolute right-0 mt-2 w-48 bg-gray-700 rounded-md shadow-lg z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-white hover:bg-gray-600"
                >
                  Editar Perfil
                </Link>
                <Link
                  href="/add-funds"
                  className="block px-4 py-2 text-white hover:bg-gray-600"
                >
                  Adicionar Fundos
                </Link>
                <Link
                  href="/security"
                  className="block px-4 py-2 text-white hover:bg-gray-600"
                >
                  Segurança
                </Link>
                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-2 text-white hover:bg-gray-600"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <>
              <Link
                href="/register"
                className="text-gray-300 hover:text-blue-400"
              >
                Registrar
              </Link>
              <Link
                href="/login"
                className="text-gray-300 hover:text-blue-400"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Sidebar do Carrinho */}
      <CartSidebar
        isOpen={cartOpen}
        setIsOpen={setCartOpen}
        cart={cart}
        setCart={setCart}
      />
    </>
  );
}
