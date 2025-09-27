"use client";

import { useState } from "react";
import { useAuth } from "@/lib/AuthContext";

const predefinedAmounts = [5, 10, 20, 50];

export default function AddFundsPage() {
  const { user, addFunds } = useAuth();
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [step, setStep] = useState<"selectAmount" | "payment">("selectAmount");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "paypal">("card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCVV, setCardCVV] = useState("");
  const [paypalEmail, setPaypalEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleProceedToPayment = () => {
    if (!selectedAmount) return alert("Escolha um valor primeiro!");
    setStep("payment");
  };

  const handleAddFunds = async () => {
    if (!user) return alert("Você precisa estar logado.");

    if (paymentMethod === "card") {
      if (cardNumber.length < 12) return alert("Número de cartão inválido!");
      if (!/^\d{2}\/\d{2}$/.test(cardExpiry))
        return alert("Data de validade inválida (MM/AA)!");
      if (cardCVV.length < 3) return alert("CVV inválido!");
    }
    if (paymentMethod === "paypal" && !paypalEmail.includes("@")) {
      return alert("Email PayPal inválido!");
    }

    setLoading(true);
    try {
      await addFunds(selectedAmount!);

      alert(`€${selectedAmount!.toFixed(2)} adicionados à sua conta!`);

      setSelectedAmount(null);
      setCardNumber("");
      setCardExpiry("");
      setCardCVV("");
      setPaypalEmail("");
      setStep("selectAmount");
    } catch (error) {
      console.error("Erro ao adicionar fundos:", error);
      alert("Ocorreu um erro. Tente novamente.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white flex flex-col items-center justify-center px-6 py-12">
      <h1 className="text-4xl font-extrabold mb-10 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
        💳 Adicionar Fundos
      </h1>

      <div className="bg-gray-800/60 backdrop-blur-md border border-gray-700 p-8 rounded-2xl shadow-2xl w-full max-w-md space-y-6">
        {step === "selectAmount" && (
          <>
            <h2 className="text-xl font-semibold mb-4">Escolha um valor</h2>
            <div className="flex gap-3 flex-wrap">
              {predefinedAmounts.map((amount) => (
                <button
                  key={amount}
                  onClick={() => setSelectedAmount(amount)}
                  className={`px-6 py-3 rounded-xl font-semibold transition transform hover:scale-105 shadow-md ${
                    selectedAmount === amount
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  €{amount}
                </button>
              ))}
            </div>
            <button
              onClick={handleProceedToPayment}
              disabled={!selectedAmount}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-5 py-3 rounded-xl font-bold text-lg transition transform hover:scale-105 disabled:opacity-50 mt-6"
            >
              Avançar para Pagamento →
            </button>
          </>
        )}

        {step === "payment" && (
          <>
            <h2 className="text-xl font-semibold mb-4">Método de pagamento</h2>
            <div className="flex justify-between gap-4 mb-6">
              {(["card", "paypal"] as const).map((method) => (
                <button
                  key={method}
                  onClick={() => setPaymentMethod(method)}
                  className={`flex-1 px-5 py-3 rounded-xl font-semibold transition transform hover:scale-105 ${
                    paymentMethod === method
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  {method === "card" ? "💳 Cartão" : "🅿️ PayPal"}
                </button>
              ))}
            </div>

            {paymentMethod === "card" && (
              <>
                <input
                  type="text"
                  placeholder="Número do cartão"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-gray-700/60 border border-gray-600 focus:border-blue-500 text-white mb-3"
                />
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Validade (MM/AA)"
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    className="w-1/2 px-4 py-3 rounded-lg bg-gray-700/60 border border-gray-600 focus:border-blue-500 text-white"
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    value={cardCVV}
                    onChange={(e) => setCardCVV(e.target.value)}
                    className="w-1/2 px-4 py-3 rounded-lg bg-gray-700/60 border border-gray-600 focus:border-blue-500 text-white"
                  />
                </div>
              </>
            )}

            {paymentMethod === "paypal" && (
              <input
                type="email"
                placeholder="Email do PayPal"
                value={paypalEmail}
                onChange={(e) => setPaypalEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-700/60 border border-gray-600 focus:border-blue-500 text-white mb-4"
              />
            )}

            <button
              onClick={handleAddFunds}
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-5 py-3 rounded-xl font-bold text-lg transition transform hover:scale-105 disabled:opacity-50"
            >
              {loading
                ? "Processando..."
                : `Confirmar pagamento de €${selectedAmount?.toFixed(2)}`}
            </button>

            <button
              onClick={() => setStep("selectAmount")}
              className="w-full mt-3 bg-gray-700 hover:bg-gray-600 px-5 py-2 rounded-lg text-white font-semibold transition"
            >
              ← Voltar
            </button>
          </>
        )}
      </div>
    </div>
  );
}
