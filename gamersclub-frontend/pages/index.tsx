import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import GameCarousel from "../components/GameCarousel";
import { supabase } from "../lib/supabaseClient";

export default function Home() {
  const [heroGames, setHeroGames] = useState<any[]>([]);
  const [gamesByGenre, setGamesByGenre] = useState<{ [genre: string]: any[] }>({});
  const [emBreve, setEmBreve] = useState<any[]>([]);
  const [maisVendidos, setMaisVendidos] = useState<any[]>([]);
  const [ofertas, setOfertas] = useState<any[]>([]);
  const [gratis, setGratis] = useState<any[]>([]);
  const [recomendados, setRecomendados] = useState<any[]>([]);
  const [selectedHero, setSelectedHero] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const genres = ["RPG", "Indie", "Ação", "FPS", "MOBA", "Simulação"];

  const formatPrice = (price: number | null) =>
    price === 0 ? "Free" : price?.toFixed(2) + " €";

  const getRandomGames = (games: any[], count: number, excludeIds: string[] = []) => {
    const filtered = games.filter((g) => !excludeIds.includes(g.id));
    const shuffled = filtered.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  useEffect(() => {
    async function fetchGames() {
      const { data, error } = await supabase.from("games").select("*");
      if (error) return console.error("Erro Supabase:", error);

      const usedIds: string[] = [];

      const hero = getRandomGames(data, 5);
      hero.forEach((g) => usedIds.push(g.id));
      setHeroGames(
        hero.map((g) => ({
          id: g.id,
          name: g.title,
          image: g.image,
          price: formatPrice(g.price),
          description: g.description,
        }))
      );

      const maisVendidosGames = getRandomGames(data, 6, usedIds);
      maisVendidosGames.forEach((g) => usedIds.push(g.id));
      setMaisVendidos(
        maisVendidosGames.map((g) => ({
          id: g.id,
          title: g.title,
          image: g.image,
          price: formatPrice(g.price),
          description: g.description,
        }))
      );

      const ofertasGames = getRandomGames(data, 6, usedIds);
      ofertasGames.forEach((g) => usedIds.push(g.id));
      setOfertas(
        ofertasGames.map((g) => ({
          id: g.id,
          title: g.title,
          image: g.image,
          price: formatPrice(g.price),
          oldPrice: g.oldPrice ? formatPrice(g.oldPrice) : undefined,
          discount: g.discount || 0,
          description: g.description,
        }))
      );

      const gratisGames = data.filter((g) => g.price === 0 && !usedIds.includes(g.id));
      gratisGames.forEach((g) => usedIds.push(g.id));
      setGratis(
        gratisGames.map((g) => ({
          id: g.id,
          title: g.title,
          image: g.image,
          price: "Free",
          description: g.description,
        }))
      );

      const recomendadosGames = getRandomGames(data, 6, usedIds);
      recomendadosGames.forEach((g) => usedIds.push(g.id));
      setRecomendados(
        recomendadosGames.map((g) => ({
          id: g.id,
          title: g.title,
          image: g.image,
          price: formatPrice(g.price),
          description: g.description,
        }))
      );

      const emBreveGames = data.slice(-5).filter((g) => !usedIds.includes(g.id));
      emBreveGames.forEach((g) => usedIds.push(g.id));
      setEmBreve(
        emBreveGames.map((g) => ({
          id: g.id,
          name: g.title,
          image: g.image,
          price: formatPrice(g.price),
          description: g.description,
        }))
      );

      const grouped: { [genre: string]: any[] } = {};
      genres.forEach((genre) => {
        grouped[genre] = data
          .filter((g) => g.category === genre && !usedIds.includes(g.id))
          .map((g) => ({
            id: g.id,
            name: g.title,
            image: g.image,
            price: formatPrice(g.price),
            description: g.description,
          }));
      });
      setGamesByGenre(grouped);
    }

    fetchGames();
  }, []);

  const filterGames = (games: any[]) =>
    games.filter((g) => {
      const gameName = g.name || g.title || "";
      return gameName.toLowerCase().includes(searchTerm.toLowerCase());
    });

  return (
    <div className="bg-gray-950 text-white min-h-screen">
      {/* Navbar + Search */}
      <div className="fixed top-0 left-0 w-full z-50 bg-gray-900/90 backdrop-blur-md shadow-lg">
        <Navbar />
        <div className="max-w-7xl mx-auto px-6 py-3">
          <input
            type="text"
            placeholder="🔎 Procurar jogo..."
            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-gray-200 placeholder-gray-400 border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <main className="pt-32 max-w-7xl mx-auto px-6 space-y-24">
        {/* Hero Section */}
        {heroGames.length > 0 && (
          <section className="relative h-[600px] md:h-[700px] rounded-xl overflow-hidden shadow-2xl">
            <div
              className="absolute inset-0 bg-cover bg-center after:content-[''] after:absolute after:inset-0 after:bg-gradient-to-b after:from-black/40 after:to-black/70"
              style={{ backgroundImage: `url(${heroGames[selectedHero].image})` }}
            />
            <div className="relative flex h-full items-center justify-between px-6 md:px-16">
              <div className="flex flex-col space-y-4 w-44 md:w-60 z-20">
                {heroGames.map((game, i) => (
                  <motion.img
                    key={i}
                    whileHover={{ scale: 1.1, rotate: 2 }}
                    src={game.image}
                    alt={game.name}
                    className={`h-24 md:h-32 w-full object-cover rounded-xl cursor-pointer border-2 transition-all ${
                      selectedHero === i ? "border-blue-500 shadow-xl" : "border-transparent"
                    }`}
                    onClick={() => setSelectedHero(i)}
                  />
                ))}
              </div>

              <motion.div
                className="flex-1 relative ml-6 rounded-xl overflow-hidden shadow-2xl z-20"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <img
                  src={heroGames[selectedHero].image}
                  alt={heroGames[selectedHero].name}
                  className="w-full h-full object-cover brightness-75"
                />
                <div className="absolute bottom-8 left-8 max-w-lg bg-black/40 backdrop-blur-md p-6 rounded-xl border border-gray-700 shadow-lg">
                  <h2 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg animate-pulse">
                    {heroGames[selectedHero].name}
                  </h2>
                  <p className="mt-2 text-lg text-gray-200 font-semibold">
                    Preço: {heroGames[selectedHero].price}
                  </p>
                  <p className="mt-2 text-gray-300 text-sm line-clamp-3">{heroGames[selectedHero].description}</p>
                  <Link
                    href={`/games/${heroGames[selectedHero].id}`}
                    className="mt-4 inline-block bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 hover:from-blue-600 hover:to-pink-600 px-6 py-3 rounded-2xl text-lg font-semibold shadow-xl transition-transform transform hover:scale-105"
                  >
                    🎮 Jogar Agora
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* Sections */}
        <Section title="📈 Mais Vendidos" color="blue-600" games={filterGames(maisVendidos).map(g => ({
          id: g.id,
          name: g.title,
          image: g.image,
          price: g.price,
          badge: "🔥 Popular",
        }))} />

        <Section title="💰 Ofertas Especiais" color="green-500" games={filterGames(ofertas).map(g => ({
          id: g.id,
          name: g.title,
          image: g.image,
          price: g.price,
          badge: g.discount ? `-${g.discount}%` : undefined,
        }))} />

        {genres.map(genre =>
          gamesByGenre[genre] && filterGames(gamesByGenre[genre]).length > 0 && (
            <Section key={genre} title={genre} color="purple-500" games={filterGames(gamesByGenre[genre]).map(g => ({
              id: g.id,
              name: g.name,
              image: g.image,
              price: g.price,
              badge: "Novo",
            }))} />
          )
        )}

        <Section title="⏳ Em Breve" color="yellow-500" games={filterGames(emBreve).map(g => ({
          id: g.id,
          name: g.name,
          image: g.image,
          price: g.price,
          badge: "Exclusivo",
        }))} />

        <Section title="⭐ Recomendados" color="pink-500" games={filterGames(recomendados).map(g => ({
          id: g.id,
          name: g.title,
          image: g.image,
          price: g.price,
          badge: "✨ Recomendado",
        }))} />

        <Section title="🎁 Jogos Gratuitos" color="cyan-500" games={filterGames(gratis).map(g => ({
          id: g.id,
          name: g.title,
          image: g.image,
          price: g.price,
          badge: "Free",
        }))} />
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-700 text-gray-400 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} GamersClub. Todos os direitos reservados.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="/terms" className="hover:text-blue-400 transition">Termos de Serviço</a>
            <a href="/privacy" className="hover:text-blue-400 transition">Política de Privacidade</a>
            <a href="/contact" className="hover:text-blue-400 transition">Contato</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Reusable Section Component
const Section = ({ title, color, games }: { title: string, color: string, games: any[] }) => {
  return (
    <motion.section
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
    >
      <h2 className={`text-3xl font-bold mb-4 border-l-4 pl-3 border-${color}`}>{title}</h2>
      <div className="flex space-x-6 overflow-x-auto scrollbar-thin scrollbar-thumb-blue-600 scrollbar-track-gray-800 p-2">
        {games.map((g) => (
          <motion.div
            key={g.id}
            whileHover={{ scale: 1.05, y: -5 }}
            className="min-w-[180px] md:min-w-[220px] bg-black/30 backdrop-blur-md rounded-2xl overflow-hidden shadow-lg border border-gray-700 cursor-pointer transition-transform"
          >
            <img src={g.image} alt={g.name} className="w-full h-40 md:h-48 object-cover" />
            <div className="p-4">
              <h3 className="font-bold text-lg line-clamp-2">{g.name}</h3>
              <p className="text-sm text-gray-300 mt-1">{g.price}</p>
              {g.badge && (
                <span className="inline-block mt-2 bg-gradient-to-r from-pink-500 via-purple-600 to-blue-500 text-xs font-semibold px-2 py-1 rounded-full animate-pulse">
                  {g.badge}
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};
