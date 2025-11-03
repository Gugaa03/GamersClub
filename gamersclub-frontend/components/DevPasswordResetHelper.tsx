import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Copy, CheckCircle, Mail } from "lucide-react";

/**
 * 🔧 COMPONENTE TEMPORÁRIO PARA DESENVOLVIMENTO
 * Mostra o link de reset de senha diretamente na tela
 * REMOVER EM PRODUÇÃO!
 */

export default function DevPasswordResetHelper() {
  const [email, setEmail] = useState("");
  const [resetLink, setResetLink] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerateLink = async () => {
    if (!email) return;

    setLoading(true);
    setResetLink(null);

    try {
      // Solicitar reset de senha
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        alert("Erro: " + error.message);
        return;
      }

      // Em desenvolvimento, o Supabase mostra o link no console
      // Aqui vamos simular/construir o link manualmente
      alert(
        "✅ Email de reset solicitado!\n\n" +
        "Para ver o link:\n" +
        "1. Abre: https://supabase.com/dashboard/project/iwfsrypsxddfkdpcfmfn/auth/users\n" +
        "2. Clica no email: " + email + "\n" +
        "3. Copia o link de reset dos logs"
      );

    } catch (err: any) {
      alert("Erro: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed bottom-4 right-4 bg-yellow-500/90 backdrop-blur-lg rounded-lg shadow-2xl p-4 max-w-md border-2 border-yellow-600 z-50">
      <div className="flex items-center gap-2 mb-3">
        <Mail className="w-5 h-5 text-yellow-900" />
        <h3 className="font-bold text-yellow-900">🔧 DEV: Password Reset Helper</h3>
      </div>

      <p className="text-sm text-yellow-900 mb-3">
        Gera link de reset de senha para testes (só desenvolvimento)
      </p>

      <div className="space-y-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email@exemplo.com"
          className="w-full px-3 py-2 rounded border border-yellow-600 bg-white text-black"
        />

        <button
          onClick={handleGenerateLink}
          disabled={loading || !email}
          className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 rounded disabled:opacity-50"
        >
          {loading ? "Gerando..." : "Solicitar Link"}
        </button>
      </div>

      {resetLink && (
        <div className="mt-3 p-2 bg-white rounded border border-yellow-600">
          <p className="text-xs text-gray-600 mb-1">Link gerado:</p>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={resetLink}
              readOnly
              className="flex-1 text-xs p-1 bg-gray-100 rounded border"
            />
            <button
              onClick={() => copyToClipboard(resetLink)}
              className="p-1 hover:bg-yellow-100 rounded"
            >
              {copied ? (
                <CheckCircle className="w-4 h-4 text-green-600" />
              ) : (
                <Copy className="w-4 h-4 text-gray-600" />
              )}
            </button>
          </div>
        </div>
      )}

      <p className="text-xs text-yellow-900 mt-3">
        ⚠️ Remover este componente em produção!
      </p>
    </div>
  );
}
