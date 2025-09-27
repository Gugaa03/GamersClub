// components/GameCarousel.tsx
import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function GameCarousel({
  title,
  games,
}: {
  title: string;
  games: { id: string; name: string; image: string; badge?: string; price?: string; href?: string }[];
}) {
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => Math.max(i - 1, 0));
  const next = () => setIndex((i) => Math.min(i + 1, games.length - 3));

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xl font-semibold">{title}</h3>
        <div className="flex gap-2">
          <button
            onClick={prev}
            className="p-2 rounded-full bg-gray-700 hover:bg-gray-600"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="p-2 rounded-full bg-gray-700 hover:bg-gray-600"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Grid com imagens retangulares */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.slice(index, index + 3).map((game) => (
          <Link key={game.id} href={game.href || `/games/${game.id}`}>
            <div className="relative bg-gray-800 rounded-xl overflow-hidden shadow-md hover:scale-105 transition-transform cursor-pointer">
              <img
                src={game.image}
                alt={game.name}
                className="w-full h-40 object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                <h4 className="text-lg font-bold">{game.name}</h4>
                {game.price && (
                  <p className="text-sm text-gray-300">{game.price}</p>
                )}
                {game.badge && (
                  <span className="text-sm text-blue-400 font-semibold">
                    {game.badge}
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
