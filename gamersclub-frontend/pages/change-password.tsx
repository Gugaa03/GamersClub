import { useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff, CheckCircle, XCircle, Shield, ArrowLeft } from "lucide-react";
import { supabase } from "../lib/supabaseClient";
import Link from "next/link";

export default function ChangePassword() {
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Validação de força da senha
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

  const handleChangePassword = async (e: React.FormEvent) => {
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
      // 1. Atualizar senha no Supabase Auth
      const { error: authError } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (authError) throw authError;

      console.log("✅ Senha atualizada no Supabase Auth");

      // 2. Obter o ID do usuário atual
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

      setMessage({ type: "success", text: "Senha alterada com sucesso!" });
      
      // Limpar formulário
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      // Redirecionar após 2 segundos
      setTimeout(() => {
        router.push("/profile");
      }, 2000);
    } catch (error: any) {
      setMessage({ type: "error", text: error.message || "Erro ao alterar a senha" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white flex items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl"
      >
        {/* Cabeçalho */}
        <div className="mb-8">
          <Link
            href="/profile"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao Perfil
          </Link>

          <div className="flex items-center gap-4 mb-4">
            <div className="p-4 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-2xl ring-2 ring-blue-500/50">
              <Shield className="w-8 h-8 text-blue-400" />
            </div>
            <div>
              <h1 className="text-4xl font-black bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Alterar Senha
              </h1>
              <p className="text-gray-400 mt-1">Mantenha sua conta segura com uma senha forte</p>
            </div>
          </div>
        </div>

        {/* Card principal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 shadow-2xl overflow-hidden"
        >
          <div className="p-8">
            {/* Mensagem de feedback */}
            {message && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${
                  message.type === "success"
                    ? "bg-green-500/10 border border-green-500/50 text-green-400"
                    : "bg-red-500/10 border border-red-500/50 text-red-400"
                }`}
              >
                {message.type === "success" ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <XCircle className="w-5 h-5" />
                )}
                <span className="font-medium">{message.text}</span>
              </motion.div>
            )}

            <form onSubmit={handleChangePassword} className="space-y-6">
              {/* Senha Atual */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Senha Atual
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full pl-12 pr-12 py-4 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-white placeholder-gray-500"
                    placeholder="Digite sua senha atual"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition"
                  >
                    {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Nova Senha */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Nova Senha
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full pl-12 pr-12 py-4 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-white placeholder-gray-500"
                    placeholder="Digite sua nova senha"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition"
                  >
                    {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                {/* Indicadores de força da senha */}
                {newPassword && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-4 space-y-2"
                  >
                    <div className="text-xs font-semibold text-gray-400 mb-2">
                      Requisitos de Segurança:
                    </div>
                    <PasswordRequirement
                      met={passwordStrength.minLength}
                      text="Mínimo de 8 caracteres"
                    />
                    <PasswordRequirement
                      met={passwordStrength.hasUpperCase}
                      text="Pelo menos uma letra maiúscula"
                    />
                    <PasswordRequirement
                      met={passwordStrength.hasLowerCase}
                      text="Pelo menos uma letra minúscula"
                    />
                    <PasswordRequirement met={passwordStrength.hasNumber} text="Pelo menos um número" />
                    <PasswordRequirement
                      met={passwordStrength.hasSpecialChar}
                      text="Pelo menos um caractere especial (!@#$%...)"
                    />
                  </motion.div>
                )}
              </div>

              {/* Confirmar Nova Senha */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Confirmar Nova Senha
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`w-full pl-12 pr-12 py-4 bg-gray-900/50 border rounded-xl focus:outline-none focus:ring-2 transition text-white placeholder-gray-500 ${
                      confirmPassword && passwordsMatch
                        ? "border-green-500 focus:ring-green-500"
                        : confirmPassword && !passwordsMatch
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-700 focus:ring-blue-500"
                    }`}
                    placeholder="Confirme sua nova senha"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {confirmPassword && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-2"
                  >
                    {passwordsMatch ? (
                      <div className="flex items-center gap-2 text-green-400 text-sm">
                        <CheckCircle className="w-4 h-4" />
                        <span>As senhas coincidem</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-red-400 text-sm">
                        <XCircle className="w-4 h-4" />
                        <span>As senhas não coincidem</span>
                      </div>
                    )}
                  </motion.div>
                )}
              </div>

              {/* Botão de submissão */}
              <motion.button
                type="submit"
                disabled={loading || !passwordStrength.isValid || !passwordsMatch}
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
                className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 ${
                  loading || !passwordStrength.isValid || !passwordsMatch
                    ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-lg hover:shadow-blue-500/50"
                }`}
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Alterando...
                  </>
                ) : (
                  <>
                    <Shield className="w-5 h-5" />
                    Alterar Senha
                  </>
                )}
              </motion.button>
            </form>
          </div>

          {/* Footer do card */}
          <div className="bg-gray-900/50 px-8 py-4 border-t border-gray-700/50">
            <div className="flex items-start gap-3 text-sm text-gray-400">
              <Lock className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <p>
                <strong className="text-gray-300">Dica de Segurança:</strong> Use uma senha única que você não utilize
                em outros sites. Considere usar um gerenciador de senhas.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

// Componente auxiliar para requisitos de senha
interface PasswordRequirementProps {
  met: boolean;
  text: string;
}

const PasswordRequirement = ({ met, text }: PasswordRequirementProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className={`flex items-center gap-2 text-sm ${met ? "text-green-400" : "text-gray-500"}`}
    >
      {met ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
      <span>{text}</span>
    </motion.div>
  );
};
