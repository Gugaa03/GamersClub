"use client";

import { useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import React from "react";

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
          <p className="text-lg"><strong>Usuário:</strong> {user.email}</p>
          <p className="text-lg"><strong>Saldo:</strong> €{user.balance.toFixed(2)}</p>
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

        <FormSection
          title="Alterar Senha"
          buttonText="Atualizar Senha"
          onSubmit={handlePasswordUpdate}
          loading={loadingPassword}
          colorClass="bg-green-600"
        >
          <InputField type="password" placeholder="Senha antiga" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
          <InputField type="password" placeholder="Nova senha" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          <InputField type="password" placeholder="Confirmar nova senha" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </FormSection>

        <button
          onClick={logout}
          className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl w-full font-bold transition-all shadow-md hover:shadow-lg"
        >
          Sair da Conta
        </button>
      </div>
    </div>
  );
}
