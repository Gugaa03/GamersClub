"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/lib/AuthContext";
import { useCart } from "@/lib/CardContext";
import { supabase } from "@/lib/supabaseClient";

export default function CheckoutPage() {
  const { user } = useAuth();
  const { cart, clearCart } = useCart();
  const [loading, setLoading] = useState(false);

  // Recupera carrinho salvo
  useEffect(() => {
    if (cart.length === 0) {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        const parsed = JSON.parse(savedCart);
        clearCart();
        localStorage.setItem("cart", JSON.stringify(parsed));
      }
    }
  }, []);

  const totalPrice = cart.reduce((acc, g) => acc + (g.price || 0), 0);

  const handlePurchase = async () => {
    if (!user) return alert("⚠️ Faça login primeiro!");
    if (!user.id) return alert("Usuário sem ID válido.");
    if ((user.balance || 0) < totalPrice)
      return alert("💸 Saldo insuficiente!");

    setLoading(true);

    try {
      // Inserir compras
      const inserts = cart.map((game) => ({
        user_id: user.id,
        game_id: game.id,
        price: Number(game.price),
      }));
      const { error: purchaseError } = await supabase
        .from("purchases")
        .insert(inserts);
      if (purchaseError) throw purchaseError;

      // Atualizar saldo
      const newBalance = (user.balance || 0) - totalPrice;
      const { error: balanceError } = await supabase
        .from("users")
        .update({ balance: newBalance })
        .eq("id", user.id);
      if (balanceError) throw balanceError;

      // Email de recibo
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
                     ${cart
                       .map(
                         (g) => `<li>${g.title} - €${g.price.toFixed(2)}</li>`
                       )
                       .join("")}
                   </ul>
                   <p><strong>Total: €${totalPrice.toFixed(2)}</strong></p>`,
          }),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Erro ao enviar email");
        console.log("📧 Email enviado:", data);
      } catch (emailErr) {
        console.error("❌ Erro ao enviar email:", emailErr);
      }

      clearCart();
      alert("✅ Compra realizada com sucesso!");
    } catch (err) {
      console.error("❌ Erro ao registrar compra:", err);
      alert("Erro ao registrar a compra.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-10 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          🛒 Finalizar Compra
        </h1>

        {/* Lista de jogos no carrinho */}
        <div className="space-y-4">
          {cart.length === 0 ? (
            <p className="text-gray-400 text-center text-lg">
              📭 Seu carrinho está vazio.
            </p>
          ) : (
            cart.map((game) => (
              <div
                key={game.id}
                className="flex items-center justify-between bg-gray-800 p-4 rounded-xl shadow-md hover:shadow-blue-500/30 transition"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={game.image}
                    alt={game.title}
                    className="w-16 h-16 object-cover rounded-lg shadow-md"
                  />
                  <span className="font-semibold">{game.title}</span>
                </div>
                <span className="text-blue-400 font-bold">
                  €{game.price.toFixed(2)}
                </span>
              </div>
            ))
          )}
        </div>

        {/* Total e botão */}
        {cart.length > 0 && (
          <div className="mt-10 bg-gray-800 rounded-2xl p-6 shadow-lg">
            <div className="flex justify-between items-center text-xl font-bold mb-6">
              <span>Total:</span>
              <span className="text-green-400">
                €{totalPrice.toFixed(2)}
              </span>
            </div>
            <button
              onClick={handlePurchase}
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-6 py-4 rounded-xl font-bold shadow-lg transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "🔄 Processando..." : "✅ Confirmar Compra"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
