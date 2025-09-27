"use client";

import { useState } from "react";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:4000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });

      const data = await res.json();

      if (!res.ok) {
        setIsError(true);
        setMessage(data.error || "Erro ao registrar");
      } else {
        setIsError(false);
        setMessage(`✅ Registro realizado! Bem-vindo(a), ${data.name}`);
      }
    } catch (err) {
      setIsError(true);
      setMessage("❌ Erro na conexão com o servidor");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white px-4">
      <div className="bg-gray-800/70 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md">
        {/* Header */}
        <h1 className="text-4xl font-extrabold mb-6 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Registro GamersClub
        </h1>

        {/* Inputs */}
        <input
          type="text"
          placeholder="👤 Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 mb-4 rounded-xl bg-gray-700/60 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />

        <input
          type="email"
          placeholder="📧 Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 rounded-xl bg-gray-700/60 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />

        <input
          type="password"
          placeholder="🔒 Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-6 rounded-xl bg-gray-700/60 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />

        {/* Button */}
        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 p-3 rounded-xl font-semibold transition transform hover:scale-105 disabled:opacity-50"
        >
          {loading ? "🔄 Registrando..." : "🚀 Registrar"}
        </button>

        {/* Feedback */}
        {message && (
          <p
            className={`mt-4 text-center font-medium ${
              isError ? "text-red-400" : "text-green-400"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
