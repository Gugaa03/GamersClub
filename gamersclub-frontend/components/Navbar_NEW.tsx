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
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showGenreDropdown, setShowGenreDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Game[]>([]);
  const [scrolled, setScrolled] = useState(false);

  // Detect scroll for glassmorphism effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Search functionality
  useEffect(() => {
    if (searchTerm.length > 0) {
      supabase
        .from("games")
        .select("*")
        .ilike("title", `%${searchTerm}%`)
        .limit(5)
        .then(({ data }) => {
          setSearchResults(data || []);
        });
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-gray-950/95 backdrop-blur-xl shadow-2xl shadow-blue-500/10 border-b border-white/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
                className="p-2 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg shadow-blue-500/50"
              >
                <Gamepad2 className="w-7 h-7 text-white" />
              </motion.div>
              <span className="text-2xl font-black bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                GamersClub
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {/* Genre Dropdown */}
              <div className="relative">
                <button
                  onMouseEnter={() => setShowGenreDropdown(true)}
                  onMouseLeave={() => setShowGenreDropdown(false)}
                  className="flex items-center gap-2 text-gray-300 hover:text-white font-semibold transition group"
                >
                  Géneros
                  <ChevronDown className={`w-4 h-4 transition-transform ${showGenreDropdown ? 'rotate-180' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {showGenreDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      onMouseEnter={() => setShowGenreDropdown(true)}
                      onMouseLeave={() => setShowGenreDropdown(false)}
                      className="absolute top-full left-0 mt-2 w-56 bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 p-2 overflow-hidden"
                    >
                      {genres.map((genre) => (
                        <Link
                          key={genre}
                          href={`/genre/${genre}`}
                          className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-purple-600/20 rounded-xl transition font-medium"
                        >
                          {genre}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {user && (
                <Link
                  href="/Library"
                  className="flex items-center gap-2 text-gray-300 hover:text-white font-semibold transition group"
                >
                  <Library className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Biblioteca
                </Link>
              )}

              {/* Search Bar */}
              <div className="relative w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  placeholder="Procurar jogos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setShowSearch(true)}
                  onBlur={() => setTimeout(() => setShowSearch(false), 200)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-gray-900 transition"
                />

                <AnimatePresence>
                  {showSearch && searchResults.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 right-0 mt-2 bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 overflow-hidden max-h-96 overflow-y-auto"
                    >
                      {searchResults.map((game) => (
                        <Link
                          key={game.id}
                          href={`/games/${game.id}`}
                          onClick={() => setShowSearch(false)}
                          className="flex items-center gap-4 px-4 py-3 hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-purple-600/20 transition group"
                        >
                          <img
                            src={game.image}
                            alt={game.title}
                            className="w-12 h-12 rounded-lg object-cover ring-2 ring-white/10 group-hover:ring-blue-500/50 transition"
                          />
                          <div className="flex-1">
                            <p className="font-semibold text-white group-hover:text-blue-400 transition">
                              {game.title}
                            </p>
                          </div>
                          <span className="text-blue-400 font-bold">
                            €{game.price.toFixed(2)}
                          </span>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Cart */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setCartOpen(true)}
                className="relative p-3 rounded-xl bg-gray-900/50 hover:bg-gray-800 border border-gray-800 hover:border-blue-500/50 transition group"
              >
                <ShoppingCart className="w-6 h-6 text-gray-300 group-hover:text-blue-400 transition" />
                {cart.length > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-red-500 to-pink-600 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg"
                  >
                    {cart.length}
                  </motion.span>
                )}
              </motion.button>

              {/* User Menu */}
              {user ? (
                <div className="relative">
                  <button
                    onMouseEnter={() => setShowUserDropdown(true)}
                    onMouseLeave={() => setShowUserDropdown(false)}
                    className="flex items-center gap-3 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 hover:border-blue-500 transition group"
                  >
                    <div className="p-2 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-bold text-white">
                        {user.nickname || user.name}
                      </p>
                      <p className="text-xs text-blue-400 font-semibold">
                        {new Intl.NumberFormat("pt-PT", {
                          style: "currency",
                          currency: "EUR",
                        }).format(user.balance || 0)}
                      </p>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showUserDropdown ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {showUserDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        onMouseEnter={() => setShowUserDropdown(true)}
                        onMouseLeave={() => setShowUserDropdown(false)}
                        className="absolute top-full right-0 mt-2 w-64 bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 p-2 overflow-hidden"
                      >
                        <Link
                          href="/profile"
                          className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-purple-600/20 rounded-xl transition"
                        >
                          <User className="w-5 h-5" />
                          <span className="font-medium">Perfil</span>
                        </Link>
                        
                        <Link
                          href="/add-funds"
                          className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-purple-600/20 rounded-xl transition"
                        >
                          <Wallet className="w-5 h-5" />
                          <span className="font-medium">Adicionar Fundos</span>
                        </Link>

                        <Link
                          href="/security"
                          className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-purple-600/20 rounded-xl transition"
                        >
                          <Shield className="w-5 h-5" />
                          <span className="font-medium">Segurança</span>
                        </Link>

                        <div className="my-2 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                        <button
                          onClick={logout}
                          className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition font-medium"
                        >
                          <LogOut className="w-5 h-5" />
                          Logout
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link
                    href="/register"
                    className="px-6 py-3 text-gray-300 hover:text-white font-semibold transition"
                  >
                    Registar
                  </Link>
                  <Link
                    href="/login"
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-xl font-bold transition shadow-lg shadow-blue-500/30"
                  >
                    Login
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center gap-3">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setCartOpen(true)}
                className="relative p-2 rounded-xl bg-gray-900/50"
              >
                <ShoppingCart className="w-6 h-6 text-gray-300" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl bg-gray-900/50"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 text-gray-300" />
                ) : (
                  <Menu className="w-6 h-6 text-gray-300" />
                )}
              </motion.button>
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
              className="lg:hidden bg-gray-950/98 backdrop-blur-xl border-t border-white/10"
            >
              <div className="max-w-7xl mx-auto px-4 py-6 space-y-1">
                {/* Search Mobile */}
                <div className="relative mb-4">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Procurar jogos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {user && (
                  <>
                    <Link
                      href="/Library"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-900 rounded-xl transition"
                    >
                      <Library className="w-5 h-5" />
                      Biblioteca
                    </Link>

                    <Link
                      href="/profile"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-900 rounded-xl transition"
                    >
                      <User className="w-5 h-5" />
                      Perfil
                    </Link>

                    <Link
                      href="/add-funds"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-900 rounded-xl transition"
                    >
                      <Wallet className="w-5 h-5" />
                      Adicionar Fundos ({new Intl.NumberFormat("pt-PT", {
                        style: "currency",
                        currency: "EUR",
                      }).format(user.balance || 0)})
                    </Link>
                  </>
                )}

                <div className="border-t border-gray-800 my-2" />
                <p className="px-4 py-2 text-xs uppercase tracking-wider text-gray-500 font-bold">
                  Géneros
                </p>

                {genres.map((genre) => (
                  <Link
                    key={genre}
                    href={`/genre/${genre}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-900 rounded-xl transition"
                  >
                    {genre}
                  </Link>
                ))}

                <div className="border-t border-gray-800 my-2" />

                {user ? (
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition font-medium"
                  >
                    <LogOut className="w-5 h-5" />
                    Logout
                  </button>
                ) : (
                  <div className="space-y-2 pt-2">
                    <Link
                      href="/register"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block w-full px-4 py-3 text-center bg-gray-900 text-white rounded-xl font-semibold transition hover:bg-gray-800"
                    >
                      Registar
                    </Link>
                    <Link
                      href="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block w-full px-4 py-3 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold transition hover:from-blue-500 hover:to-purple-500"
                    >
                      Login
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <CartSidebar isOpen={cartOpen} setIsOpen={setCartOpen} />
    </>
  );
}
