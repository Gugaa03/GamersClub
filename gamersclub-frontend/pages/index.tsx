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

  // Função para pegar jogos aleatórios sem repetir
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

      // Hero Games
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

      // Mais Vendidos
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

      // Ofertas
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

      // Gratuitos
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

      // Recomendados
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

      // Em Breve (últimos 5 lançamentos)
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

      // Por gênero
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
        {/* Hero */}
        {heroGames.length > 0 && (
          <section className="relative h-[550px] rounded-xl overflow-hidden shadow-2xl">
            <div
              className="absolute inset-0 bg-cover bg-center blur-lg opacity-40"
              style={{ backgroundImage: `url(${heroGames[selectedHero].image})` }}
            />
            <div className="relative flex h-full">
              <div className="flex flex-col space-y-4 w-40 p-2 z-10">
                {heroGames.map((game, i) => (
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    key={i}
                    src={game.image}
                    alt={game.name}
                    className={`h-20 w-full object-cover rounded-lg cursor-pointer border-2 transition-all ${
                      selectedHero === i ? "border-blue-500 shadow-lg" : "border-transparent"
                    }`}
                    onClick={() => setSelectedHero(i)}
                  />
                ))}
              </div>

              <div className="flex-1 relative ml-6 rounded-xl overflow-hidden shadow-lg z-10">
                <img
                  src={heroGames[selectedHero].image}
                  alt={heroGames[selectedHero].name}
                  className="w-full h-full object-cover brightness-75"
                />
                <div className="absolute bottom-8 left-8 max-w-lg bg-black/50 backdrop-blur-sm p-6 rounded-lg">
                  <h2 className="text-4xl font-extrabold drop-shadow-lg">
                    {heroGames[selectedHero].name}
                  </h2>
                  <p className="mt-2 text-lg text-gray-200">
                    Preço: {heroGames[selectedHero].price}
                  </p>
                  <p className="mt-2 text-gray-400 text-sm line-clamp-3">
                    {heroGames[selectedHero].description}
                  </p>
                  <Link
                    href={`/games/${heroGames[selectedHero].id}`}
                    className="mt-4 inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-6 py-3 rounded-lg text-lg font-semibold shadow-lg transition-transform transform hover:scale-105"
                  >
                    🎮 Jogar Agora
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Outras seções */}
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
          <h2 className="text-3xl font-bold mb-4 border-l-4 border-blue-600 pl-3">📈 Mais Vendidos</h2>
          <GameCarousel
            title="Mais Vendidos"
            games={filterGames(maisVendidos).map((g) => ({
              id: g.id,
              name: g.title,
              image: g.image,
              price: g.price,
              badge: "🔥 Popular",
            }))}
          />
        </motion.section>

        <motion.section initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <h2 className="text-3xl font-bold mb-4 border-l-4 border-green-500 pl-3">💰 Ofertas Especiais</h2>
          <GameCarousel
            title="Ofertas Especiais"
            games={filterGames(ofertas).map((g) => ({
              id: g.id,
              name: g.title,
              image: g.image,
              price: g.price,
              badge: g.discount ? `-${g.discount}%` : undefined,
            }))}
          />
        </motion.section>

        {genres.map(
          (genre) =>
            gamesByGenre[genre] &&
            filterGames(gamesByGenre[genre]).length > 0 && (
              <motion.section key={genre} whileHover={{ scale: 1.02 }}>
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 border-l-4 border-purple-500 pl-3">{genre}</h2>
                <GameCarousel
                  title={genre}
                  games={filterGames(gamesByGenre[genre]).map((g) => ({
                    id: g.id,
                    name: g.name,
                    image: g.image,
                    price: g.price,
                    badge: "Novo",
                  }))}
                />
              </motion.section>
            )
        )}

        {emBreve.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold mb-4 border-l-4 border-yellow-500 pl-3">⏳ Em Breve</h2>
            <GameCarousel
              title="Em Breve"
              games={filterGames(emBreve).map((g) => ({
                id: g.id,
                name: g.name,
                image: g.image,
                price: g.price,
                badge: "Exclusivo",
              }))}
            />
          </section>
        )}

        <section>
          <h2 className="text-3xl font-bold mb-4 border-l-4 border-pink-500 pl-3">⭐ Recomendados</h2>
          <GameCarousel
            title="Recomendados"
            games={filterGames(recomendados).map((g) => ({
              id: g.id,
              name: g.title,
              image: g.image,
              price: g.price,
              badge: "✨ Recomendado",
            }))}
          />
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-4 border-l-4 border-cyan-500 pl-3">🎁 Jogos Gratuitos</h2>
          <GameCarousel
            title="Grátis"
            games={filterGames(gratis).map((g) => ({
              id: g.id,
              name: g.title,
              image: g.image,
              price: g.price,
              badge: "Free",
            }))}
          />
        </section>
      </main>

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
