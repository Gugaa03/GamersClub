import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../lib/supabaseClient";
import { useCart } from "../lib/CardContext";
import { ShoppingCart, Star, TrendingUp, Zap, Gift, Clock, Sparkles, ChevronRight, Play } from "lucide-react";
import { LoadingScreen, SkeletonGameGrid } from "../components/Loading";

export default function Home() {
  const [allGames, setAllGames] = useState<any[]>([]);
  const [heroGames, setHeroGames] = useState<any[]>([]);
  const [gamesByGenre, setGamesByGenre] = useState<{ [genre: string]: any[] }>({});
  const [maisVendidos, setMaisVendidos] = useState<any[]>([]);
  const [ofertas, setOfertas] = useState<any[]>([]);
  const [gratis, setGratis] = useState<any[]>([]);
  const [selectedHero, setSelectedHero] = useState(0);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  const genres = ["RPG", "Indie", "Ação", "FPS", "MOBA", "Simulação", "Aventura", "Esportes"];

  const formatPrice = (price: number | null) =>
    price === 0 ? "GRÁTIS" : `€${price?.toFixed(2)}`;

  const getRandomGames = (games: any[], count: number, excludeIds: string[] = []) => {
    const filtered = games.filter((g: any) => !excludeIds.includes(g.id));
    const shuffled = filtered.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

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
      const usedIds: string[] = [];

      // Hero
      const hero = getRandomGames(data, 5);
      hero.forEach((g: any) => usedIds.push(g.id));
      setHeroGames(hero);

      // Mais vendidos
      const maisVendidosGames = getRandomGames(data, 8, usedIds);
      maisVendidosGames.forEach((g: any) => usedIds.push(g.id));
      setMaisVendidos(maisVendidosGames);

      // Ofertas
      const ofertasGames = data
        .filter((g: any) => g.price > 0 && !usedIds.includes(g.id))
        .slice(0, 8);
      ofertasGames.forEach((g: any) => usedIds.push(g.id));
      setOfertas(ofertasGames);

      // Grátis
      const gratisGames = data.filter((g: any) => g.price === 0);
      setGratis(gratisGames);

      // Por gênero
      const grouped: { [genre: string]: any[] } = {};
      genres.forEach((genre) => {
        grouped[genre] = data
          .filter((g: any) => g.category === genre)
          .slice(0, 8);
      });
      setGamesByGenre(grouped);

      setLoading(false);
    }

    fetchGames();

    const interval = setInterval(() => {
      setSelectedHero((prev) => (prev + 1) % 5);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const handleAddToCart = (game: any) => {
    addToCart({
      id: game.id,
      title: game.title,
      price: game.price || 0,
      image: game.image,
    });
  };

  if (loading) {
    return <LoadingScreen message="Carregando jogos incríveis..." />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white">
      {/* HERO SECTION - Ultra moderno */}
      <section className="relative h-[80vh] overflow-hidden">
        <AnimatePresence mode="wait">
          {heroGames.length > 0 && (
            <motion.div
              key={selectedHero}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.7 }}
              className="absolute inset-0"
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${heroGames[selectedHero]?.image})`,
                  filter: "brightness(0.4) blur(2px)",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
              
              <div className="relative h-full max-w-7xl mx-auto px-6 flex items-center">
                <div className="max-w-2xl space-y-6">
                  <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <span className="inline-block px-4 py-1.5 bg-blue-600/90 rounded-full text-sm font-semibold mb-4">
                      🔥 Jogo em Destaque
                    </span>
                  </motion.div>

                  <motion.h1
                    className="text-6xl md:text-7xl font-black leading-tight"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {heroGames[selectedHero]?.title}
                  </motion.h1>

                  <motion.p
                    className="text-xl text-gray-300 line-clamp-3"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    {heroGames[selectedHero]?.description}
                  </motion.p>

                  <motion.div
                    className="flex items-center gap-4"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Link
                      href={`/games/${heroGames[selectedHero]?.id}`}
                      className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-2xl"
                    >
                      <Play className="w-5 h-5" />
                      Jogar Agora
                    </Link>
                    
                    <button
                      onClick={() => handleAddToCart(heroGames[selectedHero])}
                      className="flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl font-semibold transition-all border border-white/20"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      {formatPrice(heroGames[selectedHero]?.price)}
                    </button>
                  </motion.div>

                  {/* Dots de navegação */}
                  <div className="flex gap-2 mt-8">
                    {heroGames.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedHero(index)}
                        className={`h-1.5 rounded-full transition-all ${
                          index === selectedHero
                            ? "w-12 bg-blue-500"
                            : "w-6 bg-white/30 hover:bg-white/50"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <main className="max-w-7xl mx-auto px-6 py-12 space-y-16">
        {/* MAIS VENDIDOS */}
        <Section
          icon={<TrendingUp className="w-6 h-6" />}
          title="🔥 Mais Vendidos"
          subtitle="Os jogos mais populares do momento"
          games={maisVendidos}
          onAddToCart={handleAddToCart}
        />

        {/* OFERTAS */}
        {ofertas.length > 0 && (
          <Section
            icon={<Zap className="w-6 h-6" />}
            title="⚡ Ofertas Relâmpago"
            subtitle="Aproveite os melhores descontos"
            games={ofertas}
            onAddToCart={handleAddToCart}
            highlight
          />
        )}

        {/* JOGOS GRÁTIS */}
        {gratis.length > 0 && (
          <Section
            icon={<Gift className="w-6 h-6" />}
            title="🎁 Jogos Gratuitos"
            subtitle="100% grátis para jogar"
            games={gratis}
            onAddToCart={handleAddToCart}
          />
        )}

        {/* POR GÊNERO */}
        {genres.map((genre) =>
          gamesByGenre[genre] && gamesByGenre[genre].length > 0 ? (
            <Section
              key={genre}
              icon={<Sparkles className="w-6 h-6" />}
              title={genre}
              subtitle={`Explore os melhores jogos de ${genre}`}
              games={gamesByGenre[genre]}
              onAddToCart={handleAddToCart}
            />
          ) : null
        )}
      </main>

      {/* FOOTER */}
      <footer className="bg-gray-950 border-t border-gray-800 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                GamersClub
              </h3>
              <p className="text-gray-400 text-sm">
                A melhor plataforma para descobrir e comprar jogos incríveis.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Explorar</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/" className="hover:text-blue-400 transition">Loja</Link></li>
                <li><Link href="/Library" className="hover:text-blue-400 transition">Biblioteca</Link></li>
                <li><Link href="/profile" className="hover:text-blue-400 transition">Perfil</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Suporte</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-blue-400 transition">Ajuda</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Contato</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-blue-400 transition">Termos de Uso</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Privacidade</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} GamersClub. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// COMPONENTE DE SEÇÃO - VERSÃO MELHORADA
interface SectionProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  games: any[];
  onAddToCart: (game: any) => void;
  highlight?: boolean;
}

const Section = ({ icon, title, subtitle, games, onAddToCart, highlight }: SectionProps) => {
  return (
    <section className="relative">
      <div className="flex items-center justify-between mb-8">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl ${
              highlight 
                ? 'bg-gradient-to-br from-yellow-500/20 to-orange-500/20 ring-2 ring-yellow-500/50' 
                : 'bg-gradient-to-br from-blue-500/20 to-purple-500/20 ring-2 ring-blue-500/50'
            }`}>
              <span className={highlight ? 'text-yellow-400' : 'text-blue-400'}>
                {icon}
              </span>
            </div>
            <h2 className="text-4xl font-black bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              {title}
            </h2>
          </div>
          <p className="text-gray-400 text-lg ml-14">{subtitle}</p>
        </div>
        
        <Link
          href="#"
          className="group hidden md:flex items-center gap-2 px-5 py-3 bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-xl font-semibold transition-all border border-white/10 hover:border-white/20"
        >
          <span className="text-gray-300 group-hover:text-white transition">Ver todos</span>
          <ChevronRight className="w-5 h-5 text-blue-400 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {games.slice(0, 8).map((game, index) => (
          <motion.div
            key={game.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <GameCard
              game={game}
              onAddToCart={onAddToCart}
              highlight={highlight}
            />
          </motion.div>
        ))}
      </div>

      {/* Gradiente nas bordas para efeito profissional */}
      <div className="absolute -inset-x-6 inset-y-0 bg-gradient-to-r from-gray-900 via-transparent to-gray-900 pointer-events-none opacity-30" />
    </section>
  );
};

// COMPONENTE DE CARD DE JOGO - VERSÃO PREMIUM
interface GameCardProps {
  game: any;
  onAddToCart: (game: any) => void;
  highlight?: boolean;
}

const GameCard = ({ game, onAddToCart, highlight }: GameCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative"
    >
      <Link href={`/games/${game.id}`}>
        <div className={`relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 shadow-2xl transition-all ${
          highlight ? 'ring-2 ring-yellow-400 shadow-yellow-500/20' : 'hover:shadow-blue-500/20'
        }`}>
          {/* Imagem */}
          <div className="relative aspect-[3/4] overflow-hidden bg-gray-950">
            <motion.img
              src={game.image}
              alt={game.title}
              className="w-full h-full object-cover"
              animate={{ scale: isHovered ? 1.1 : 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
            
            {/* Overlay gradiente sempre visível */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80" />
            
            {/* Overlay interativo no hover */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40 flex flex-col justify-end p-5"
                >
                  <div className="space-y-3">
                    <p className="text-sm text-gray-300 line-clamp-4 leading-relaxed">
                      {game.description || "Descubra este incrível jogo agora!"}
                    </p>
                    
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 bg-blue-600/80 backdrop-blur-sm rounded-md text-xs font-semibold">
                        {game.category || "Jogo"}
                      </span>
                      {game.price === 0 && (
                        <span className="px-2.5 py-1 bg-green-600/80 backdrop-blur-sm rounded-md text-xs font-semibold">
                          FREE TO PLAY
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-1.5 text-yellow-400">
                      <Star className="w-4 h-4 fill-yellow-400" />
                      <Star className="w-4 h-4 fill-yellow-400" />
                      <Star className="w-4 h-4 fill-yellow-400" />
                      <Star className="w-4 h-4 fill-yellow-400" />
                      <Star className="w-4 h-4 fill-gray-600" />
                      <span className="ml-1 text-xs text-gray-400">(4.0)</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Badges superiores */}
            <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
              <div className="flex flex-col gap-2">
                {highlight && (
                  <motion.span
                    initial={{ scale: 0, rotate: -12 }}
                    animate={{ scale: 1, rotate: 0 }}
                    className="px-3 py-1.5 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold rounded-lg shadow-lg flex items-center gap-1"
                  >
                    <Zap className="w-3 h-3" />
                    OFERTA
                  </motion.span>
                )}
              </div>
              
              {game.price === 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="px-3 py-1.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-bold rounded-lg shadow-lg"
                >
                  GRÁTIS
                </motion.span>
              )}
            </div>
          </div>

          {/* Info do card */}
          <div className="p-5 space-y-3">
            <div className="min-h-[3rem]">
              <h3 className="font-bold text-lg mb-1 line-clamp-2 leading-tight">
                {game.title}
              </h3>
              <p className="text-xs text-gray-400 uppercase tracking-wide">
                {game.category || "Diversos"}
              </p>
            </div>
            
            <div className="flex items-center justify-between pt-2 border-t border-gray-700/50">
              <div className="flex flex-col">
                <span className="text-xs text-gray-500 mb-0.5">Preço</span>
                <span className={`text-2xl font-black ${
                  game.price === 0 ? 'text-green-400' : 'text-blue-400'
                }`}>
                  {game.price === 0 ? 'FREE' : `€${game.price.toFixed(2)}`}
                </span>
              </div>

              <motion.button
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.preventDefault();
                  onAddToCart(game);
                }}
                className="p-3.5 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 rounded-xl transition-all shadow-lg hover:shadow-blue-500/50"
              >
                <ShoppingCart className="w-5 h-5" />
              </motion.button>
            </div>
          </div>

          {/* Efeito de brilho no hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none"
            initial={{ x: "-100%", y: "-100%" }}
            animate={isHovered ? { x: "100%", y: "100%" } : { x: "-100%", y: "-100%" }}
            transition={{ duration: 0.6 }}
          />
        </div>
      </Link>
    </motion.div>
  );
};
