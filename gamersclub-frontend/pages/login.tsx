import { useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log("🔹 Resposta do backend:", data, "Status:", res.status);

      if (!res.ok) {
        setMessage(data.error || "Erro ao fazer login");
      } else {
        setMessage(`Bem-vindo(a) de volta, ${data.name || email}!`);
login({ id: data.id, name: data.name, email: data.email, balance: data.balance || 0 });
        console.log("✅ Login bem-sucedido:", data);
        router.push("/"); // Redireciona para home
      }
    } catch (err) {
      console.error("❌ Erro na conexão:", err);
      setMessage("Erro na conexão com o servidor");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md text-white">
        <h1 className="text-3xl font-bold mb-6 text-center">Login GamersClub</h1>

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
          onClick={handleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded font-semibold transition-colors"
        >
          Entrar
        </button>

        {message && <p className="mt-4 text-center text-red-400">{message}</p>}
      </div>
    </div>
  );
}
