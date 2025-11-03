"use client";

import { useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import React from "react";
import Link from "next/link";
import { Shield, Mail, Wallet, LogOut } from "lucide-react";

// ============================
// InputField moderno e memoizado
// ============================
interface InputFieldProps {
  type?: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField = React.memo(({ type = "text", placeholder, value, onChange }: InputFieldProps) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-all"
    />
  );
});

// ============================
// Card/FormSection moderno e memoizado
// ============================
interface FormSectionProps {
  title: string;
  children: React.ReactNode;
  buttonText: string;
  onSubmit: () => void;
  loading?: boolean;
  colorClass?: string;
}

const FormSection = React.memo(({ title, children, buttonText, onSubmit, loading = false, colorClass = "bg-blue-600" }: FormSectionProps) => {
  return (
    <div className="bg-gray-800 p-6 rounded-2xl shadow-lg space-y-4 hover:shadow-2xl transition-shadow">
      <h2 className="text-2xl font-bold">{title}</h2>
      <div className="space-y-3">{children}</div>
      <button
        onClick={onSubmit}
        disabled={loading}
        className={`${colorClass} hover:${colorClass.replace("600", "700")} px-6 py-3 rounded-xl w-full font-bold transition-all shadow-md hover:shadow-lg`}
      >
        {loading ? "Atualizando..." : buttonText}
      </button>
    </div>
  );
});

// ============================
// ProfilePage principal
// ============================
export default function ProfilePage() {
  const { user, logout, updateEmail, updatePassword } = useAuth();

  const [newEmail, setNewEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loadingEmail, setLoadingEmail] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <p className="text-xl font-semibold animate-pulse">
          ⚠️ Faça login para editar o perfil.
        </p>
      </div>
    );
  }

  const handleEmailUpdate = async () => {
    if (!newEmail) return alert("Digite um novo email");
    if (!newEmail.includes("@")) return alert("Email inválido! Certifique-se de incluir '@'");

    setLoadingEmail(true);
    try {
      await updateEmail(newEmail);
      setNewEmail("");
    } catch (err: any) {
      console.error("❌ Erro ao atualizar email:", err);
      alert("Erro ao atualizar email: " + err.message);
    }
    setLoadingEmail(false);
  };

  const handlePasswordUpdate = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) return alert("Preencha todos os campos");
    if (newPassword !== confirmPassword) return alert("A nova senha e a confirmação não coincidem");

    setLoadingPassword(true);
    try {
      await updatePassword(oldPassword, newPassword, confirmPassword);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      console.error("❌ Erro ao atualizar senha:", err);
      alert("Erro ao atualizar senha: " + err.message);
    }
    setLoadingPassword(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-10 flex justify-center">
      <div className="w-full max-w-2xl space-y-8">
        <h1 className="text-4xl font-extrabold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-400 animate-gradient-x">
          Editar Perfil
        </h1>

        <div className="bg-gray-800 p-6 rounded-3xl shadow-xl space-y-6">
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-blue-400" />
            <p className="text-lg"><strong>Usuário:</strong> {user.email}</p>
          </div>
          <div className="flex items-center gap-3">
            <Wallet className="w-5 h-5 text-green-400" />
            <p className="text-lg"><strong>Saldo:</strong> €{user.balance.toFixed(2)}</p>
          </div>
        </div>

        <FormSection
          title="Alterar Email"
          buttonText="Atualizar Email"
          onSubmit={handleEmailUpdate}
          loading={loadingEmail}
          colorClass="bg-blue-600"
        >
          <InputField type="email" placeholder="Novo email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
        </FormSection>

        {/* Link para página de mudança de senha */}
        <Link href="/change-password">
          <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/50 p-6 rounded-2xl shadow-lg hover:shadow-purple-500/30 transition-all cursor-pointer group">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-600/30 rounded-xl group-hover:bg-purple-600/50 transition">
                  <Shield className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold group-hover:text-purple-400 transition">Alterar Senha</h3>
                  <p className="text-gray-400 text-sm">Mantenha sua conta segura</p>
                </div>
              </div>
              <svg 
                className="w-6 h-6 text-purple-400 group-hover:translate-x-2 transition-transform" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </Link>

        <button
          onClick={logout}
          className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl w-full font-bold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
        >
          <LogOut className="w-5 h-5" />
          Sair da Conta
        </button>
      </div>
    </div>
  );
}
