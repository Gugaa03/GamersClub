import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../lib/supabaseClient";
import { useCart } from "../lib/CardContext";
import { 
  ShoppingCart, Star, TrendingUp, Zap, Gift, Sparkles, ChevronRight, 
  Play, Flame, Trophy, Clock, GamepadIcon, Search, Filter
} from "lucide-react";
import { LoadingScreen } from "../components/Loading";

export default function HomeV2() {
  const [allGames, setAllGames] = useState<any[]>([]);
  const [heroGames, setHeroGames] = useState<any[]>([]);
  const [selectedHero, setSelectedHero] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("Todos");
  const { addToCart } = useCart();

  const genres = ["Todos", "RPG", "Indie", "Ação", "FPS", "MOBA", "Simulação", "Aventura", "Esportes"];

  useEffect(() => {
    async function fetchGames() {
      setLoading(true);
      const { data, error } = await supabase.from("games").select("*");
      
      if (error) {
        console.error("Erro Supabase:", error);
        setLoading(false);
        return;
      }

      if (!data || data.length === 0) {
        console.warn("Nenhum jogo encontrado");
        setLoading(false);
        return;
      }

      setAllGames(data);
      const shuffled = [...data].sort(() => 0.5 - Math.random());
      setHeroGames(shuffled.slice(0, 5));
      setLoading(false);
    }

    fetchGames();
  }, []);

  // Auto-rotate hero
  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedHero((prev) => (prev + 1) % heroGames.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [heroGames]);

  const handleAddToCart = (game: any) => {
    addToCart({
      id: game.id,
      title: game.title,
      price: game.price || 0,
      image: game.image,
    });
  };

  // Filtrar jogos
  const filteredGames = allGames.filter((game) => {
    const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenre === "Todos" || game.category === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  if (loading) {
    return <LoadingScreen message="Carregando jogos épicos..." />;
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* MEGA HERO SECTION */}
      <section className="relative h-screen">
        <AnimatePresence mode="wait">
          {heroGames.length > 0 && (
            <motion.div
              key={selectedHero}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0"
            >
              {/* Background Image - Better positioning */}
              <div className="absolute inset-0 overflow-hidden">
                <motion.img
                  src={heroGames[selectedHero]?.image}
                  alt={heroGames[selectedHero]?.title}
                  className="w-full h-full object-cover object-center"
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 10, ease: "linear" }}
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/1920x1080/1f2937/3b82f6?text=' + encodeURIComponent(heroGames[selectedHero]?.title || 'Game');
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              </div>

              {/* Content */}
              <div className="relative h-full flex items-center max-w-7xl mx-auto px-6">
                <div className="max-w-3xl space-y-8">
                  <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <Flame className="w-6 h-6 text-orange-500 animate-pulse" />
                      <span className="text-orange-500 font-bold uppercase tracking-wider">
                        Destaque da Semana
                      </span>
                    </div>
                    
                    <h1 className="text-7xl md:text-8xl font-black leading-none mb-6 drop-shadow-2xl">
                      {heroGames[selectedHero]?.title}
                    </h1>

                    <p className="text-2xl text-gray-300 leading-relaxed mb-8 max-w-2xl drop-shadow-lg">
                      {heroGames[selectedHero]?.description}
                    </p>

                    {/* Metadata */}
                    <div className="flex items-center gap-6 mb-8">
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <span className="text-sm text-gray-400">4.8/5.0</span>
                      </div>
                      
                      <div className="h-6 w-px bg-gray-600" />
                      
                      <span className="px-3 py-1 bg-blue-600/30 border border-blue-500 rounded-full text-sm font-semibold backdrop-blur-sm">
                        {heroGames[selectedHero]?.category}
                      </span>
                    </div>

                    {/* CTAs */}
                    <div className="flex flex-wrap items-center gap-4">
                      <Link href={`/games/${heroGames[selectedHero]?.id}`}>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="group flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-2xl font-black text-xl shadow-2xl shadow-blue-500/50 transition-all"
                        >
                          <Play className="w-6 h-6 fill-white" />
                          JOGAR AGORA
                        </motion.button>
                      </Link>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAddToCart(heroGames[selectedHero])}
                        className="flex items-center gap-3 px-10 py-5 bg-white/10 hover:bg-white/20 backdrop-blur-xl border-2 border-white/20 rounded-2xl font-bold text-xl transition-all"
                      >
                        <ShoppingCart className="w-6 h-6" />
                        {heroGames[selectedHero]?.price === 0 
                          ? "GRÁTIS" 
                          : `€${heroGames[selectedHero]?.price?.toFixed(2)}`
                        }
                      </motion.button>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Navigation Dots */}
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3">
                {heroGames.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedHero(index)}
                    className={`transition-all ${
                      index === selectedHero
                        ? "w-16 h-2 bg-white"
                        : "w-8 h-2 bg-white/30 hover:bg-white/50"
                    } rounded-full`}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* SEARCH & FILTERS */}
      <section className="sticky top-0 z-50 bg-gray-950/95 backdrop-blur-xl border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Buscar jogos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-gray-900 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            {/* Genre Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {genres.map((genre) => (
                <button
                  key={genre}
                  onClick={() => setSelectedGenre(genre)}
                  className={`px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition-all ${
                    selectedGenre === genre
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                      : "bg-gray-900 text-gray-400 hover:text-white hover:bg-gray-800"
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TRENDING SECTION */}
      <section className="py-24 bg-gradient-to-b from-black to-gray-950 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-orange-600/20 to-red-600/20 border border-orange-500/30 rounded-full mb-6">
              <Flame className="w-5 h-5 text-orange-500 animate-pulse" />
              <span className="text-orange-400 font-bold uppercase tracking-wider text-sm">
                Trending Now
              </span>
            </div>
            
            <h2 className="text-6xl font-black mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                Em Alta Agora
              </span>
            </h2>
            <p className="text-gray-400 text-xl max-w-2xl mx-auto">
              Os jogos mais populares e procurados do momento
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredGames.slice(0, 8).map((game, index) => (
              <GameCard key={game.id} game={game} index={index} onAddToCart={handleAddToCart} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-xl font-bold text-lg transition shadow-lg shadow-blue-500/30 group"
            >
              Ver Todos os Jogos
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* FREE TO PLAY */}
      {allGames.filter(g => g.price === 0).length > 0 && (
        <section className="py-24 bg-gray-950 relative">
          {/* Glow Effects */}
          <div className="absolute top-1/2 left-0 w-72 h-72 bg-green-600 rounded-full blur-3xl opacity-20"></div>
          <div className="absolute top-1/3 right-0 w-72 h-72 bg-emerald-600 rounded-full blur-3xl opacity-20"></div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-500/30 rounded-full mb-6">
                <Gift className="w-5 h-5 text-green-500" />
                <span className="text-green-400 font-bold uppercase tracking-wider text-sm">
                  100% Free
                </span>
              </div>
              
              <h2 className="text-6xl font-black mb-4">
                <span className="bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
                  Grátis para Jogar
                </span>
              </h2>
              <p className="text-gray-400 text-xl max-w-2xl mx-auto">
                Diversão garantida sem gastar nada
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {allGames
                .filter(g => g.price === 0)
                .slice(0, 4)
                .map((game, index) => (
                  <GameCard key={game.id} game={game} index={index} onAddToCart={handleAddToCart} />
                ))}
            </div>
          </div>
        </section>
      )}

      {/* ALL GAMES GRID */}
      <section className="py-24 bg-black relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-full mb-6">
              <GamepadIcon className="w-5 h-5 text-purple-500" />
              <span className="text-purple-400 font-bold uppercase tracking-wider text-sm">
                Catálogo Completo
              </span>
            </div>
            
            <h2 className="text-6xl font-black mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                Todos os Jogos
              </span>
            </h2>
            <p className="text-gray-400 text-xl max-w-2xl mx-auto">
              Explore nossa coleção completa de {filteredGames.length} jogos incríveis
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredGames.map((game, index) => (
              <GameCard key={game.id} game={game} index={index} onAddToCart={handleAddToCart} />
            ))}
          </div>

          {filteredGames.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="inline-block p-6 rounded-full bg-gray-900 mb-6">
                <Search className="w-16 h-16 text-gray-600" />
              </div>
              <h3 className="text-3xl font-black text-gray-500 mb-4">
                Nenhum jogo encontrado
              </h3>
              <p className="text-gray-600 mb-8">
                Tente ajustar os filtros de pesquisa
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedGenre("Todos");
                }}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-xl font-bold transition shadow-lg shadow-blue-500/30"
              >
                Limpar Filtros
              </button>
            </motion.div>
          )}
        </div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-purple-600 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-pink-600 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-950 border-t border-gray-900">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-2">
              <h3 className="text-3xl font-black mb-4 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                GamersClub
              </h3>
              <p className="text-gray-400 mb-6 max-w-md">
                A plataforma definitiva para descobrir, comprar e jogar os melhores jogos. 
                Ofertas exclusivas, lançamentos e muito mais.
              </p>
              <div className="flex gap-4">
                {/* Social icons */}
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Explorar</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/" className="hover:text-white transition">Loja</Link></li>
                <li><Link href="/Library" className="hover:text-white transition">Biblioteca</Link></li>
                <li><Link href="/profile" className="hover:text-white transition">Perfil</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition">Termos</a></li>
                <li><a href="#" className="hover:text-white transition">Privacidade</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-900 mt-12 pt-8 text-center text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} GamersClub. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Section Header Component
interface SectionHeaderProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  color?: "blue" | "green" | "purple";
}

const SectionHeader = ({ icon, title, subtitle, color = "blue" }: SectionHeaderProps) => {
  const colorClasses = {
    blue: "from-blue-500 to-purple-600",
    green: "from-green-500 to-emerald-600",
    purple: "from-purple-500 to-pink-600",
  };

  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="flex items-center gap-4 mb-3">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${colorClasses[color]}/20 ring-2 ring-${color}-500/50`}>
            {icon}
          </div>
          <h2 className="text-5xl font-black">{title}</h2>
        </div>
        <p className="text-gray-400 text-lg ml-16">{subtitle}</p>
      </div>
    </div>
  );
};

// Game Card Component
interface GameCardProps {
  game: any;
  index: number;
  onAddToCart: (game: any) => void;
}

const GameCard = ({ game, index, onAddToCart }: GameCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group"
    >
      <Link href={`/games/${game.id}`}>
        <div className="relative rounded-xl overflow-hidden bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 hover:border-blue-500/50 transition-all duration-300 shadow-lg hover:shadow-blue-500/20">
          {/* Image Container */}
          <div className="relative w-full aspect-video overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
            <img
              src={game.image}
              alt={game.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              onError={(e) => {
                e.currentTarget.src = `https://via.placeholder.com/600x340/1f2937/3b82f6?text=${encodeURIComponent(game.title)}`;
              }}
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent opacity-60" />

            {/* Free Badge */}
            {game.price === 0 && (
              <div className="absolute top-3 right-3">
                <span className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold rounded-lg shadow-lg">
                  GRÁTIS
                </span>
              </div>
            )}

            {/* Hover Play Button */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center"
                >
                  <motion.div
                    initial={{ y: 20 }}
                    animate={{ y: 0 }}
                    className="flex flex-col items-center gap-3"
                  >
                    <div className="p-4 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full shadow-2xl">
                      <Play className="w-8 h-8 text-white fill-white" />
                    </div>
                    <span className="text-white font-bold text-sm">Ver Detalhes</span>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Content */}
          <div className="p-4 space-y-3">
            {/* Title */}
            <h3 className="font-bold text-base text-white line-clamp-2 min-h-[3rem] leading-snug">
              {game.title}
            </h3>

            {/* Category & Rating */}
            <div className="flex items-center justify-between">
              {game.category && (
                <span className="px-2 py-1 bg-gray-800/80 text-gray-300 text-xs font-semibold rounded-md">
                  {game.category}
                </span>
              )}
              <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                <span className="text-xs text-gray-400 font-medium">4.8</span>
              </div>
            </div>

            {/* Price & Add to Cart */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-800/50">
              <div className="flex flex-col">
                {game.price > 0 && (
                  <span className="text-xs text-gray-500 line-through">€{(game.price * 1.2).toFixed(2)}</span>
                )}
                <span className={`font-black text-xl ${
                  game.price === 0 ? 'text-green-400' : 'text-blue-400'
                }`}>
                  {game.price === 0 ? 'GRÁTIS' : `€${game.price.toFixed(2)}`}
                </span>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.preventDefault();
                  onAddToCart(game);
                }}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-lg text-white font-semibold text-sm shadow-lg shadow-blue-500/30 transition-all flex items-center gap-2"
              >
                <ShoppingCart className="w-4 h-4" />
                Adicionar
              </motion.button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
