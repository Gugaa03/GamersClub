"use client";

import { Dispatch, SetStateAction } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { useCart } from "@/lib/CardContext";

interface CartSidebarProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function CartSidebar({ isOpen, setIsOpen }: CartSidebarProps) {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((sum, g) => sum + g.price, 0).toFixed(2);

  return (
    <div
      className={`fixed top-0 right-0 w-80 h-screen bg-gray-900 shadow-lg transform transition-transform z-50 flex flex-col ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-700 flex-shrink-0">
        <h2 className="text-lg font-bold">Carrinho</h2>
        <button onClick={() => setIsOpen(false)}>
          <X className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Conteúdo do Carrinho */}
      <div className="flex-1 overflow-y-auto p-4">
        {cart.length === 0 ? (
          <p className="text-gray-300 text-center mt-4">Seu carrinho está vazio.</p>
        ) : (
          cart.map((game) => (
            <div
              key={game.id}
              className="flex items-center gap-3 bg-gray-800 p-2 rounded-lg mb-2"
            >
              <img
                src={game.image}
                alt={game.title}
                className="w-16 h-16 object-cover rounded"
              />
              <div className="flex-1">
                <p className="text-white font-semibold">{game.title}</p>
                <p className="text-gray-400">€{game.price.toFixed(2)}</p>
              </div>
              <button
                onClick={() => removeFromCart(game.id)}
                className="text-red-500 hover:text-red-400"
              >
                Remover
              </button>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700 flex flex-col gap-2 flex-shrink-0">
        <p className="text-white font-bold text-lg">Total: €{total}</p>
        <Link
          href="/Checkout"
          className={`block w-full text-center py-2 rounded-lg font-semibold transition-colors ${
            cart.length === 0
              ? "bg-gray-700 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
          onClick={() => setIsOpen(false)}
        >
          Finalizar Compra
        </Link>
        <button
          onClick={clearCart}
          disabled={cart.length === 0}
          className={`w-full py-2 rounded-lg font-semibold transition-colors ${
            cart.length === 0
              ? "bg-gray-700 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700"
          }`}
        >
          Limpar Carrinho
        </button>
      </div>
    </div>
  );
}
