// components/GameCarousel.tsx
import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Play, ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function GameCarousel({
  title,
  games,
  autoPlay = false,
  onAddToCart,
}: {
  title: string;
  games: { id: string; name: string; image: string; badge?: string; price?: string | number; href?: string }[];
  autoPlay?: boolean;
  onAddToCart?: (game: any) => void;
}) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const itemsPerPage = 4;
  const maxIndex = Math.max(0, games.length - itemsPerPage);

  const prev = () => {
    setDirection(-1);
    setIndex((i) => Math.max(i - 1, 0));
  };

  const next = () => {
    setDirection(1);
    setIndex((i) => Math.min(i + 1, maxIndex));
  };

  // Auto-play opcional
  useEffect(() => {
    if (!autoPlay) return;
    
    const interval = setInterval(() => {
      setDirection(1);
      setIndex((i) => {
        if (i >= maxIndex) return 0;
        return i + 1;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [autoPlay, maxIndex]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <div className="relative group">
      {/* Header com título e controles */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          {title}
        </h3>
        
        <div className="flex items-center gap-3">
          {/* Indicadores de página */}
          <div className="hidden md:flex gap-1.5">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > index ? 1 : -1);
                  setIndex(i);
                }}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-8 bg-blue-500" : "w-1.5 bg-gray-600 hover:bg-gray-500"
                }`}
              />
            ))}
          </div>

          {/* Botões de navegação */}
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prev}
              disabled={index === 0}
              className={`p-3 rounded-xl transition-all ${
                index === 0
                  ? "bg-gray-800 text-gray-600 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 shadow-lg hover:shadow-blue-500/50"
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={next}
              disabled={index >= maxIndex}
              className={`p-3 rounded-xl transition-all ${
                index >= maxIndex
                  ? "bg-gray-800 text-gray-600 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 shadow-lg hover:shadow-blue-500/50"
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Carousel com animação */}
      <div className="relative overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {games.slice(index, index + itemsPerPage).map((game) => (
              <GameCard key={game.id} game={game} onAddToCart={onAddToCart} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Setas de navegação ao hover (desktop) */}
      <div className="hidden lg:block">
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          whileHover={{ opacity: 1, x: 0 }}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 backdrop-blur-sm p-4 rounded-full shadow-2xl z-10"
          onClick={prev}
          disabled={index === 0}
        >
          <ChevronLeft className="w-6 h-6" />
        </motion.button>

        <motion.button
          initial={{ opacity: 0, x: -20 }}
          whileHover={{ opacity: 1, x: 0 }}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 backdrop-blur-sm p-4 rounded-full shadow-2xl z-10"
          onClick={next}
          disabled={index >= maxIndex}
        >
          <ChevronRight className="w-6 h-6" />
        </motion.button>
      </div>
    </div>
  );
}

// Card de jogo para o carousel
function GameCard({ game, onAddToCart }: { game: any; onAddToCart?: (game: any) => void }) {
  const [isHovered, setIsHovered] = useState(false);
  const price = typeof game.price === 'number' ? game.price : parseFloat(game.price || '0');

  return (
    <motion.div
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative"
    >
      <Link href={game.href || `/games/${game.id}`}>
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 shadow-xl hover:shadow-2xl transition-shadow">
          {/* Imagem */}
          <div className="relative aspect-[3/4] overflow-hidden bg-gray-950">
            <motion.img
              src={game.image}
              alt={game.name}
              className="w-full h-full object-cover"
              animate={{ scale: isHovered ? 1.1 : 1 }}
              transition={{ duration: 0.4 }}
            />
            
            {/* Gradiente */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

            {/* Badge */}
            {game.badge && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-3 right-3"
              >
                <span className="px-3 py-1.5 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold rounded-lg shadow-lg">
                  {game.badge}
                </span>
              </motion.div>
            )}

            {/* Overlay ao hover */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center gap-3"
                >
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-4 bg-blue-600 rounded-full shadow-xl"
                    onClick={(e) => {
                      e.preventDefault();
                      // Ver detalhes
                    }}
                  >
                    <Play className="w-6 h-6" />
                  </motion.button>

                  {onAddToCart && (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-4 bg-green-600 rounded-full shadow-xl"
                      onClick={(e) => {
                        e.preventDefault();
                        onAddToCart(game);
                      }}
                    >
                      <ShoppingCart className="w-6 h-6" />
                    </motion.button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Info */}
          <div className="p-4">
            <h4 className="font-bold text-lg mb-2 line-clamp-1">{game.name}</h4>
            
            <div className="flex items-center justify-between">
              <span className={`text-xl font-black ${price === 0 ? 'text-green-400' : 'text-blue-400'}`}>
                {price === 0 ? 'GRÁTIS' : `€${price.toFixed(2)}`}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
