"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useAuth } from "@/lib/AuthContext";
import { ShoppingCart, Gamepad2, LogOut, Menu, X, Search, User, Wallet, Library, Shield, ChevronDown } from "lucide-react";
import CartSidebar from "./CartSidebar";
import { supabase } from "@/lib/supabaseClient";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/CardContext";

const genres = ["Ação", "Aventura", "RPG", "Indie", "Simulação", "Esportes", "FPS", "MOBA"];

interface Game {
  id: string;
  title: string;
  image: string;
  price: number;
}

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const [games, setGames] = useState<Game[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Game[]>([]);
  const [showSearch, setShowSearch] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    async function fetchGames() {
      const { data, error } = await supabase
        .from("games")
        .select("id, title, price, image");
      if (error) console.error("❌ Erro ao buscar jogos:", error);
      else setGames(data || []);
    }
    fetchGames();
  }, []);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }
    const filtered = games.filter((g) =>
      g.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filtered);
  }, [searchTerm, games]);

  return (
    <>
      <nav className="w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 backdrop-blur-md shadow-xl fixed top-0 left-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group">
              <Gamepad2 className="w-8 h-8 text-blue-500 group-hover:text-blue-400 transition-colors" />
              <h1 className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                GamersClub
              </h1>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
          {/* Explorar Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <span className="flex items-center text-gray-300 hover:text-blue-400 cursor-pointer">
              Explorar
            </span>
            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 mt-2 w-52 bg-gray-800 rounded-xl shadow-lg z-50 p-2"
                >
                  {genres.map((genre, i) => (
                    <Link
                      key={i}
                      href={`/genre/${genre}`}
                      className="flex items-center gap-2 px-4 py-2 text-gray-200 hover:bg-gray-700 rounded-lg"
                    >
                      <Gamepad2 className="w-4 h-4 text-blue-400" />
                      {genre}
                    </Link>
                  ))}
                  <hr className="border-gray-700 my-2" />
                  <Link
                    href="/promotions"
                    className="block px-4 py-2 text-white hover:bg-gray-700 rounded-lg"
                  >
                    Promoções
                  </Link>
                  <Link
                    href="/novidades"
                    className="block px-4 py-2 text-white hover:bg-gray-700 rounded-lg"
                  >
                    Novidades
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
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
              className="px-3 py-1 rounded-md text-black w-32 sm:w-56 focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setShowSearch(true)}
              onBlur={() => setTimeout(() => setShowSearch(false), 200)}
            />
            <AnimatePresence>
              {showSearch && searchResults.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 w-full bg-gray-800 rounded-lg shadow-xl mt-1 z-50 max-h-60 overflow-y-auto"
                >
                  {searchResults.map((g) => (
                    <Link
                      key={g.id}
                      href={`/games/${g.id}`}
                      className="flex items-center gap-3 px-4 py-2 text-white hover:bg-gray-700 transition"
                      onClick={() => setShowSearch(false)}
                    >
                      <img
                        src={g.image}
                        alt={g.title}
                        className="w-8 h-8 rounded object-cover"
                      />
                      <span className="flex-1">{g.title}</span>
                      <span className="text-blue-400 font-semibold">
                        € {g.price.toFixed(2)}
                      </span>
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Carrinho */}
          <button
            onClick={() => setCartOpen(true)}
            className="relative focus:outline-none"
            title="Ver carrinho"
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
                Olá, {user.nickname || user.name} 💰{" "}
                {new Intl.NumberFormat("pt-PT", {
                  style: "currency",
                  currency: "EUR",
                }).format(user.balance || 0)}
              </span>
              <div className="absolute right-0 mt-2 w-56 bg-gray-800 rounded-lg shadow-lg z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-white hover:bg-gray-700"
                >
                  Editar Perfil
                </Link>
                <Link
                  href="/add-funds"
                  className="block px-4 py-2 text-white hover:bg-gray-700"
                >
                  Adicionar Fundos
                </Link>
                <Link
                  href="/security"
                  className="block px-4 py-2 text-white hover:bg-gray-700"
                >
                  Segurança
                </Link>
                <button
                  onClick={logout}
                  className="w-full flex items-center gap-2 px-4 py-2 text-white hover:bg-gray-700"
                >
                  <LogOut className="w-4 h-4" /> Logout
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

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-4">
              <button
                onClick={() => setCartOpen(true)}
                className="relative focus:outline-none"
              >
                <ShoppingCart className="w-6 h-6 text-gray-300" />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {cart.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="focus:outline-none"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 text-gray-300" />
                ) : (
                  <Menu className="w-6 h-6 text-gray-300" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-gray-800 overflow-hidden"
            >
              <div className="px-4 py-4 space-y-3">
                {user && (
                  <Link
                    href="/Library"
                    className="block text-gray-300 hover:text-blue-400"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Minha Biblioteca
                  </Link>
                )}
                
                {genres.map((genre, i) => (
                  <Link
                    key={i}
                    href={`/genre/${genre}`}
                    className="block text-gray-300 hover:text-blue-400"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {genre}
                  </Link>
                ))}

                {user ? (
                  <>
                    <Link
                      href="/profile"
                      className="block text-gray-300 hover:text-blue-400"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Editar Perfil
                    </Link>
                    <Link
                      href="/add-funds"
                      className="block text-gray-300 hover:text-blue-400"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Adicionar Fundos
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full text-left text-gray-300 hover:text-blue-400"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/register"
                      className="block text-gray-300 hover:text-blue-400"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Registrar
                    </Link>
                    <Link
                      href="/login"
                      className="block text-gray-300 hover:text-blue-400"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Login
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Sidebar do Carrinho */}
      <CartSidebar
        isOpen={cartOpen}
        setIsOpen={setCartOpen}
      />
    </>
  );
}
