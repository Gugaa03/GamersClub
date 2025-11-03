import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Eye, EyeOff, CheckCircle, XCircle, Shield, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export default function ResetPassword() {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Verificar se há uma sessão ativa (usuário clicou no link do email)
  useEffect(() => {
    // Supabase automaticamente detecta o hash fragment (#access_token=...)
    // e cria uma sessão quando o usuário clica no link do email
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY') {
        console.log('✅ Sessão de recuperação de senha detectada');
      }
    });
  }, []);

  // Validação de senha em tempo real
  const validatePassword = (password: string) => {
    const minLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return {
      minLength,
      hasUpperCase,
      hasLowerCase,
      hasNumber,
      hasSpecialChar,
      isValid: minLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar,
    };
  };

  const passwordStrength = validatePassword(newPassword);
  const passwordsMatch = newPassword === confirmPassword && newPassword.length > 0;

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!passwordStrength.isValid) {
      setMessage({ type: "error", text: "A senha não cumpre os requisitos de segurança!" });
      return;
    }

    if (!passwordsMatch) {
      setMessage({ type: "error", text: "As senhas não coincidem!" });
      return;
    }

    setLoading(true);

    try {
      // 1. Usar o método nativo do Supabase para atualizar a senha
      const { data: authData, error: authError } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (authError) {
        throw authError;
      }

      console.log('✅ Senha atualizada no Supabase Auth');

      // 2. Obter o ID do usuário
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        // 3. Atualizar também no backend (tabela users)
        try {
          const backendRes = await fetch("http://localhost:4000/api/updatepassword", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userId: user.id,
              newPassword: newPassword,
            }),
          });

          if (backendRes.ok) {
            console.log("✅ Senha atualizada também no backend");
          } else {
            console.warn("⚠️ Falha ao atualizar senha no backend, mas Auth foi atualizado");
          }
        } catch (backendErr) {
          console.warn("⚠️ Erro ao atualizar backend:", backendErr);
          // Não bloqueamos porque o Auth já foi atualizado
        }
      }

      setMessage({ type: "success", text: "Senha redefinida com sucesso!" });

      // Redirecionar para login após 2 segundos
      setTimeout(() => {
        router.push("/login");
      }, 2000);

    } catch (error: any) {
      console.error("❌ Erro ao redefinir senha:", error);
      setMessage({ 
        type: "error", 
        text: error.message || "Erro ao redefinir senha. Tente novamente." 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Card Principal */}
        <div className="bg-gray-800/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-gray-700">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4"
            >
              <Shield className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-3xl font-bold text-white mb-2">Redefinir Senha</h1>
            <p className="text-gray-400">Crie uma nova senha segura para sua conta</p>
          </div>

          {/* Mensagens */}
          <AnimatePresence>
            {message && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`mb-6 p-4 rounded-lg ${
                  message.type === "success"
                    ? "bg-green-500/20 border border-green-500 text-green-300"
                    : "bg-red-500/20 border border-red-500 text-red-300"
                }`}
              >
                <div className="flex items-center gap-2">
                  {message.type === "success" ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <XCircle className="w-5 h-5" />
                  )}
                  <span>{message.text}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Formulário */}
          <form onSubmit={handleResetPassword} className="space-y-6">
            {/* Nova Senha */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Nova Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Digite sua nova senha"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
                >
                  {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Confirmar Senha */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Confirmar Nova Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Confirme sua nova senha"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Validação de Senha */}
            {newPassword && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="bg-gray-700/30 rounded-lg p-4 space-y-2"
              >
                <p className="text-sm font-medium text-gray-300 mb-3">Requisitos da senha:</p>
                <div className="space-y-2">
                  {[
                    { label: "Mínimo de 8 caracteres", valid: passwordStrength.minLength },
                    { label: "Letra maiúscula (A-Z)", valid: passwordStrength.hasUpperCase },
                    { label: "Letra minúscula (a-z)", valid: passwordStrength.hasLowerCase },
                    { label: "Número (0-9)", valid: passwordStrength.hasNumber },
                    { label: "Caractere especial (!@#$%)", valid: passwordStrength.hasSpecialChar },
                  ].map((req, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      {req.valid ? (
                        <CheckCircle className="w-4 h-4 text-green-400" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-400" />
                      )}
                      <span className={`text-sm ${req.valid ? "text-green-300" : "text-gray-400"}`}>
                        {req.label}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Senhas Coincidem */}
            {confirmPassword && (
              <div className="flex items-center gap-2">
                {passwordsMatch ? (
                  <>
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-sm text-green-300">As senhas coincidem ✓</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-red-400" />
                    <span className="text-sm text-red-300">As senhas não coincidem</span>
                  </>
                )}
              </div>
            )}

            {/* Botão de Enviar */}
            <button
              type="submit"
              disabled={loading || !passwordStrength.isValid || !passwordsMatch}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Processando...
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5" />
                  Redefinir Senha
                </>
              )}
            </button>
          </form>

          {/* Link para Login */}
          <div className="mt-6 text-center">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar para Login
            </Link>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-6">
          GamersClub © 2025 - Sua segurança é nossa prioridade
        </p>
      </motion.div>
    </div>
  );
}
