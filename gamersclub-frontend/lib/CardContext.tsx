"use client";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";

export interface Game {
  id: string;
  title: string;
  price: number;
  image: string;
}

interface CartContextType {
  cart: Game[];
  addToCart: (game: Game) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Game[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) setCart(JSON.parse(stored));
  }, []);

  const addToCart = (game: Game) => {
    console.log("➕ Adicionando ao carrinho:", game);
    const exists = cart.find((g) => g.id === game.id);
    if (!exists) {
      const newCart = [...cart, game];
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
    }
  };

  const removeFromCart = (id: string) => {
    const newCart = cart.filter((g) => g.id !== id);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
