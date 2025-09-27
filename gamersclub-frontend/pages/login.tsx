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
        login({
          id: data.id,
          name: data.name,
          email: data.email,
          balance: data.balance || 0,
        });
        console.log("✅ Login bem-sucedido:", data);
        router.push("/"); // Redireciona para home
      }
    } catch (err) {
      console.error("❌ Erro na conexão:", err);
      setMessage("Erro na conexão com o servidor");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 text-white px-4">
      <div className="w-full max-w-md bg-gray-800/70 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-gray-700">
        {/* Header */}
        <h1 className="text-4xl font-extrabold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
          Login GamersClub
        </h1>

        {/* Inputs */}
        <input
          type="email"
          placeholder="📧 Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 rounded-xl bg-gray-900/60 border border-gray-700 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
        />

        <input
          type="password"
          placeholder="🔑 Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-6 rounded-xl bg-gray-900/60 border border-gray-700 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
        />

        {/* Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 active:scale-[0.98] p-3 rounded-xl font-bold shadow-lg transition-all duration-300"
        >
          Entrar
        </button>

        {/* Feedback */}
        {message && (
          <p
            className={`mt-4 text-center font-medium ${
              message.toLowerCase().includes("bem-vindo")
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
