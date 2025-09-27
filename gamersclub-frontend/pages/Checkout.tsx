"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/lib/AuthContext";
import { useCart } from "@/lib/CardContext";
import { supabase } from "@/lib/supabaseClient";

export default function CheckoutPage() {
  const { user } = useAuth();
  const { cart, clearCart } = useCart();
  const [loading, setLoading] = useState(false);

  // Garante que, se o cart estiver vazio, tente carregar do localStorage
  useEffect(() => {
    if (cart.length === 0) {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        const parsed = JSON.parse(savedCart);
        clearCart(); // Limpa antes de adicionar
        localStorage.setItem("cart", JSON.stringify(parsed));
      }
    }
  }, []);

  const totalPrice = cart.reduce((acc, g) => acc + (g.price || 0), 0);

  const handlePurchase = async () => {
    if (!user) return alert("Faça login primeiro!");
    if (!user.id) return alert("Usuário sem ID definido.");
    if ((user.balance || 0) < totalPrice) return alert("Saldo insuficiente!");

    setLoading(true);

    try {
      // Registrar todas as compras
      const inserts = cart.map((game) => ({
        user_id: user.id, // deve existir na auth.users
        game_id: game.id,
        price: Number(game.price),
      }));

      const { error: purchaseError } = await supabase.from("purchases").insert(inserts);
      if (purchaseError) throw purchaseError;
      console.log("✅ Compras registradas no Supabase", inserts);

      // Atualiza saldo diretamente
      const newBalance = (user.balance || 0) - totalPrice;
      const { error: balanceError } = await supabase
        .from("users")
        .update({ balance: newBalance })
        .eq("id", user.id);
      if (balanceError) throw balanceError;
      console.log("💰 Saldo atualizado:", newBalance);

      // Enviar email de recibo
      try {
        const response = await fetch("/api/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            recipient: user.email,
            subject: "Recibo da sua compra",
            html: `<h1>Obrigado pela compra!</h1>
                   <p>Você comprou os seguintes jogos:</p>
                   <ul>
                     ${cart.map((g) => `<li>${g.title} - €${g.price.toFixed(2)}</li>`).join("")}
                   </ul>
                   <p>Total: €${totalPrice.toFixed(2)}</p>`,
          }),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Erro ao enviar email");
        console.log("📧 Email de recibo enviado com sucesso:", data);
      } catch (emailErr) {
        console.error("❌ Erro ao enviar email de recibo:", emailErr);
      }

      // Limpa carrinho usando o método do contexto
      clearCart();
      alert("Compra realizada com sucesso!");
    } catch (err) {
      console.error("❌ Erro ao registrar compra:", err);
      alert("Erro ao registrar a compra.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <div className="space-y-4">
        {cart.length === 0 && <p className="text-gray-400">Seu carrinho está vazio.</p>}
        {cart.map((game) => (
          <div
            key={game.id}
            className="flex items-center justify-between bg-gray-800 p-4 rounded-lg"
          >
            <img src={game.image} className="w-16 h-16 object-cover rounded" />
            <span>{game.title}</span>
            <span>€{game.price.toFixed(2)}</span>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-between items-center">
        <span className="text-xl font-bold">Total: €{totalPrice.toFixed(2)}</span>
        <button
          onClick={handlePurchase}
          disabled={loading || cart.length === 0}
          className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-lg font-bold transition disabled:opacity-50"
        >
          {loading ? "Processando..." : "Comprar"}
        </button>
      </div>
    </div>
  );
}
