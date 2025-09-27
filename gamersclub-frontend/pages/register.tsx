import { useState } from "react";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    try {
      const res = await fetch("http://localhost:4000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Erro ao registrar");
      } else {
        setMessage(`Registro realizado! Bem-vindo(a), ${data.name}`);
      }
    } catch (err) {
      setMessage("Erro na conexão com o servidor");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md text-white">
        <h1 className="text-3xl font-bold mb-6 text-center">Registro GamersClub</h1>

        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 mb-4 rounded bg-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 rounded bg-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-6 rounded bg-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleRegister}
          className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded font-semibold transition-colors"
        >
          Registrar
        </button>

        {message && <p className="mt-4 text-center text-red-400">{message}</p>}
      </div>
    </div>
  );
}
