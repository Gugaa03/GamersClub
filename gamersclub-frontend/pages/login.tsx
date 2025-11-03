import { useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:4000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

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

        setTimeout(() => router.push("/"), 1000);
      }
    } catch (err) {
      setMessage("Erro na conexão com o servidor");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!resetEmail) {
      setResetMessage("Por favor, insira seu email");
      return;
    }

    setLoading(true);
    setResetMessage("");

    try {
      console.log('═══════════════════════════════════════');
      console.log('🔍 INICIANDO RESET DE SENHA');
      console.log('═══════════════════════════════════════');
      console.log('📧 Email:', resetEmail);
      console.log('🌐 Origin:', window.location.origin);
      console.log('🔗 Redirect URL:', `${window.location.origin}/reset-password`);
      console.log('');
      
      // Primeiro verifica se o email existe na tabela users
      console.log('📊 PASSO 1: Verificando tabela users...');
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('id, email, name')
        .eq('email', resetEmail)
        .single();

      console.log('Resultado:', { userData, userError });

      if (userError || !userData) {
        console.warn('⚠️ EMAIL NÃO ENCONTRADO NA TABELA USERS');
        console.warn('Erro:', userError);
        setResetMessage("❌ Email não encontrado. Verifica se está registado.");
        setLoading(false);
        return;
      }

      console.log('✅ Email encontrado!');
      console.log('   User ID:', userData.id);
      console.log('   Nome:', userData.name);
      console.log('   Email:', userData.email);
      console.log('');
      
      // Agora tenta enviar o email via Supabase Auth
      console.log('📊 PASSO 2: Enviando reset via Supabase Auth...');
      const { data: resetData, error: resetError } = await supabase.auth.resetPasswordForEmail(resetEmail, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      console.log('Resposta Supabase Auth:');
      console.log('  Data:', resetData);
      console.log('  Error:', resetError);
      console.log('');

      if (resetError) {
        console.error('❌ ERRO DO SUPABASE AUTH');
        console.error('Mensagem:', resetError.message);
        console.error('Status:', resetError.status);
        console.error('Nome:', resetError.name);
        console.error('Detalhes completos:', resetError);
        setResetMessage(`❌ Erro: ${resetError.message}`);
      } else {
        console.log('✅ SUCESSO! Pedido processado pelo Supabase');
        console.log('');
        console.log('� PRÓXIMOS PASSOS:');
        console.log('1. Verifica email:', resetEmail);
        console.log('2. Verifica pasta SPAM/Lixo');
        console.log('3. Abre Supabase Dashboard:');
        console.log('   https://supabase.com/dashboard/project/iwfsrypsxddfkdpcfmfn');
        console.log('4. Vai para: Authentication → Logs');
        console.log('5. Vai para: Authentication → Email Templates');
        console.log('6. Verifica: Project Settings → Auth → SMTP Settings');
        console.log('');
        console.log('⚠️ IMPORTANTE:');
        console.log('- Sem SMTP configurado = emails só aparecem nos logs');
        console.log('- Com SMTP configurado = emails são enviados de verdade');
        console.log('═══════════════════════════════════════');
        
        setResetMessage(
          `✅ Pedido processado!\n\n` +
          `User: ${userData.name}\n` +
          `Email: ${resetEmail}\n\n` +
          `Verifica:\n` +
          `• Caixa de entrada\n` +
          `• Pasta de spam\n` +
          `• Supabase Dashboard → Auth → Logs`
        );
      }
    } catch (err: any) {
      console.error('💥 EXCEÇÃO CRÍTICA');
      console.error('Tipo:', err.name);
      console.error('Mensagem:', err.message);
      console.error('Stack:', err.stack);
      console.error('Objeto completo:', err);
      setResetMessage("❌ Erro ao processar: " + err.message);
    } finally {
      setLoading(false);
      console.log('═══════════════════════════════════════');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 text-white px-4">
      <div className="w-full max-w-md bg-gray-800/70 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-gray-700">
        {!showForgotPassword ? (
          <>
            <h1 className="text-4xl font-extrabold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
              Login GamersClub
            </h1>

            <input
              type="email"
              placeholder="📧 Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleLogin()}
              className="w-full p-3 mb-4 rounded-xl bg-gray-900/60 border border-gray-700 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="password"
              placeholder="🔑 Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleLogin()}
              className="w-full p-3 mb-2 rounded-xl bg-gray-900/60 border border-gray-700 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="text-right mb-4">
              <button
                onClick={() => setShowForgotPassword(true)}
                className="text-sm text-blue-400 hover:text-blue-300"
              >
                Esqueceu a senha?
              </button>
            </div>

            {message && (
              <p
                className={`mb-4 text-center font-medium ${
                  message.toLowerCase().includes("bem-vindo")
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {message}
              </p>
            )}

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 p-3 rounded-xl font-bold disabled:opacity-50 mb-4"
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>

            <p className="text-center text-gray-400">
              Não tens conta?{" "}
              <Link href="/register" className="text-blue-400 hover:text-blue-300">
                Regista-te aqui
              </Link>
            </p>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-bold mb-4 text-center">Recuperar Senha</h2>
            <p className="text-gray-400 mb-6 text-center text-sm">
              Insere o teu email para receber instruções
            </p>

            <input
              type="email"
              placeholder="📧 Email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleForgotPassword()}
              className="w-full p-3 mb-4 rounded-xl bg-gray-900/60 border border-gray-700 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            {resetMessage && (
              <p
                className={`mb-4 text-sm ${
                  resetMessage.includes("Erro") ? "text-red-400" : "text-blue-400"
                }`}
              >
                {resetMessage}
              </p>
            )}

            <button
              onClick={handleForgotPassword}
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 p-3 rounded-xl font-bold disabled:opacity-50 mb-4"
            >
              {loading ? "Enviando..." : "Enviar Link"}
            </button>

            <button
              onClick={() => {
                setShowForgotPassword(false);
                setResetMessage("");
                setResetEmail("");
              }}
              className="w-full text-gray-400 hover:text-white"
            >
              ← Voltar ao login
            </button>
          </>
        )}
      </div>
    </div>
  );
}
