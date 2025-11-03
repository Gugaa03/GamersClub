import { useEffect, useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, Search, Filter, Grid3x3, List, Clock, 
  Calendar, TrendingUp, Star, Gamepad2, ArrowUpDown,
  DollarSign, Package
} from "lucide-react";

interface Game {
  id: string;
  title: string;
  image: string;
  price: number;
  category: string;
  purchased_at?: string;
}

type SortOption = "recent" | "alphabetical" | "price";
type ViewMode = "grid" | "list";

export default function Library() {
  const { user } = useAuth();
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<string>("Todos");
  const [sortBy, setSortBy] = useState<SortOption>("recent");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  useEffect(() => {
    if (user) {
      fetchLibrary();
    }
  }, [user]);

  const fetchLibrary = async () => {
    if (!user) return;

    setLoading(true);
    const { data, error } = await supabase
      .from("purchases")
      .select("game_id, created_at")
      .eq("user_id", user.id);

    if (error) {
      console.error("Erro ao buscar biblioteca:", error);
      setLoading(false);
      return;
    }

    const gameIds = data.map((p: any) => p.game_id);
    const { data: gamesData, error: gamesError } = await supabase
      .from("games")
      .select("*")
      .in("id", gameIds);

    if (gamesError) {
      console.error("Erro ao buscar jogos:", gamesError);
      setLoading(false);
      return;
    }

    const gamesWithPurchaseDate = gamesData.map((game) => {
      const purchase = data.find((p: any) => p.game_id === game.id);
      return {
        ...game,
        purchased_at: purchase?.created_at,
      };
    });

    setGames(gamesWithPurchaseDate || []);
    setLoading(false);
  };

  // Get unique genres
  const genres = ["Todos", ...Array.from(new Set(games.map(g => g.category).filter(Boolean)))];

  // Filter and sort games
  const filteredGames = games
    .filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGenre = selectedGenre === "Todos" || game.category === selectedGenre;
      return matchesSearch && matchesGenre;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "recent":
          return new Date(b.purchased_at || 0).getTime() - new Date(a.purchased_at || 0).getTime();
        case "alphabetical":
          return a.title.localeCompare(b.title);
        case "price":
          return b.price - a.price;
        default:
          return 0;
      }
    });

  // Calculate stats
  const totalSpent = games.reduce((sum, game) => sum + (game.price || 0), 0);
  const totalGames = games.length;
  const freeGames = games.filter(g => g.price === 0).length;

  if (!user) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-black pt-32 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-black text-white mb-4">
              Faça login para ver sua biblioteca
            </h1>
            <Link
              href="/login"
              className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:from-blue-500 hover:to-purple-500 transition"
            >
              Fazer Login
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-black pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-6xl font-black bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent mb-4">
              Minha Biblioteca
            </h1>
            <p className="text-gray-400 text-xl">
              {totalGames} {totalGames === 1 ? 'jogo' : 'jogos'} na sua coleção
            </p>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-blue-600/20 to-blue-900/20 border border-blue-500/30"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-semibold mb-2">Total de Jogos</p>
                  <p className="text-4xl font-black text-white">{totalGames}</p>
                </div>
                <div className="p-4 rounded-xl bg-blue-600/30">
                  <Package className="w-8 h-8 text-blue-400" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-green-600/20 to-green-900/20 border border-green-500/30"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-semibold mb-2">Total Gasto</p>
                  <p className="text-4xl font-black text-white">€{totalSpent.toFixed(2)}</p>
                </div>
                <div className="p-4 rounded-xl bg-green-600/30">
                  <DollarSign className="w-8 h-8 text-green-400" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-purple-600/20 to-purple-900/20 border border-purple-500/30"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-semibold mb-2">Jogos Grátis</p>
                  <p className="text-4xl font-black text-white">{freeGames}</p>
                </div>
                <div className="p-4 rounded-xl bg-purple-600/30">
                  <Star className="w-8 h-8 text-purple-400" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Filters & Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8 space-y-4"
          >
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  placeholder="Procurar na biblioteca..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-gray-900 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>

              {/* View Mode Toggle */}
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-4 rounded-xl border transition ${
                    viewMode === "grid"
                      ? "bg-blue-600 border-blue-500 text-white"
                      : "bg-gray-900 border-gray-800 text-gray-400 hover:text-white"
                  }`}
                >
                  <Grid3x3 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-4 rounded-xl border transition ${
                    viewMode === "list"
                      ? "bg-blue-600 border-blue-500 text-white"
                      : "bg-gray-900 border-gray-800 text-gray-400 hover:text-white"
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Genre Filter & Sort */}
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 text-gray-400 text-sm font-semibold">
                <Filter className="w-4 h-4" />
                Género:
              </div>
              {genres.map((genre) => (
                <button
                  key={genre}
                  onClick={() => setSelectedGenre(genre)}
                  className={`px-4 py-2 rounded-xl font-semibold transition ${
                    selectedGenre === genre
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                      : "bg-gray-900 text-gray-400 hover:text-white hover:bg-gray-800"
                  }`}
                >
                  {genre}
                </button>
              ))}

              <div className="ml-auto flex items-center gap-2">
                <ArrowUpDown className="w-4 h-4 text-gray-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="px-4 py-2 bg-gray-900 border border-gray-800 rounded-xl text-white font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="recent">Mais Recentes</option>
                  <option value="alphabetical">A-Z</option>
                  <option value="price">Preço</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* Games Grid/List */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
            </div>
          ) : filteredGames.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="inline-block p-6 rounded-full bg-gray-900 mb-6">
                <Gamepad2 className="w-16 h-16 text-gray-600" />
              </div>
              <h2 className="text-3xl font-black text-gray-400 mb-4">
                {searchTerm || selectedGenre !== "Todos"
                  ? "Nenhum jogo encontrado"
                  : "Biblioteca vazia"}
              </h2>
              <p className="text-gray-500 mb-8">
                {searchTerm || selectedGenre !== "Todos"
                  ? "Tente ajustar os filtros"
                  : "Comece a adicionar jogos à sua coleção!"}
              </p>
              <Link
                href="/"
                className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:from-blue-500 hover:to-purple-500 transition shadow-lg shadow-blue-500/30"
              >
                Explorar Jogos
              </Link>
            </motion.div>
          ) : (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  : "space-y-4"
              }
            >
              {filteredGames.map((game, index) =>
                viewMode === "grid" ? (
                  <GridGameCard key={game.id} game={game} index={index} />
                ) : (
                  <ListGameCard key={game.id} game={game} index={index} />
                )
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// Grid View Card Component
const GridGameCard = ({ game, index }: { game: Game; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative"
    >
      <Link href={`/games/${game.id}`}>
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 to-black shadow-2xl hover:shadow-blue-500/20 transition-all">
          {/* Image */}
          <div className="relative aspect-[3/4] overflow-hidden">
            <motion.img
              src={game.image}
              alt={game.title}
              className="w-full h-full object-cover"
              animate={{ scale: isHovered ? 1.1 : 1 }}
              transition={{ duration: 0.6 }}
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

            {/* Play Button Overlay */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="p-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-2xl"
                  >
                    <Play className="w-12 h-12 text-white fill-white" />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Info */}
          <div className="p-6">
            <h3 className="font-black text-xl mb-3 line-clamp-1 text-white">
              {game.title}
            </h3>
            
            {game.purchased_at && (
              <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
                <Calendar className="w-4 h-4" />
                {new Date(game.purchased_at).toLocaleDateString("pt-PT", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </div>
            )}

            <div className="flex items-center justify-between">
              <span className="px-3 py-1 bg-blue-600/20 border border-blue-500/50 rounded-lg text-blue-400 text-sm font-bold">
                {game.category || "Geral"}
              </span>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 transition"
              >
                <Play className="w-5 h-5 text-white" />
              </motion.button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

// List View Card Component
const ListGameCard = ({ game, index }: { game: Game; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ x: 8 }}
    >
      <Link href={`/games/${game.id}`}>
        <div className="flex items-center gap-6 p-4 rounded-2xl bg-gray-900 hover:bg-gray-800 border border-gray-800 hover:border-blue-500/50 transition group">
          {/* Image */}
          <div className="relative w-24 h-32 rounded-xl overflow-hidden flex-shrink-0">
            <img
              src={game.image}
              alt={game.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h3 className="font-black text-2xl mb-2 text-white group-hover:text-blue-400 transition">
              {game.title}
            </h3>
            
            <div className="flex items-center gap-4 text-sm text-gray-400">
              {game.category && (
                <span className="px-3 py-1 bg-blue-600/20 border border-blue-500/50 rounded-lg text-blue-400 font-semibold">
                  {game.category}
                </span>
              )}
              
              {game.purchased_at && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(game.purchased_at).toLocaleDateString("pt-PT")}
                </div>
              )}

              {game.price > 0 && (
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  €{game.price.toFixed(2)}
                </div>
              )}
            </div>
          </div>

          {/* Play Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-xl font-bold text-white shadow-lg shadow-blue-500/30 transition"
          >
            <Play className="w-5 h-5" />
            JOGAR
          </motion.button>
        </div>
      </Link>
    </motion.div>
  );
};
