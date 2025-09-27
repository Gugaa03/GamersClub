"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/lib/supabaseClient";

interface User {
  id: string; // UUID do Supabase
  name: string;
  email: string;
  balance: number;
  nickname?: string;
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  addFunds: (amount: number) => Promise<void>;
  refreshBalance: () => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<void>;
  updateEmail: (newEmail: string) => Promise<void>;
  updatePassword: (
    oldPassword: string,
    newPassword: string,
    confirmPassword: string
  ) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  addFunds: async () => {},
  refreshBalance: async () => {},
  updateProfile: async () => {},
  updateEmail: async () => {},
  updatePassword: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const API_BASE = "http://localhost:4000/api/updateUser";

  // 🔹 Restaurar sessão do localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      setUser(parsed);
    }
  }, []);

  // 🔹 Função de login (mantida como tu tens)
  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // 🔹 Função de logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // 🔹 Atualiza o balance do usuário a partir do Supabase
  const refreshBalance = async () => {
    if (!user?.id) return;

    try {
      const { data, error } = await supabase
        .from("users")
        .select("balance")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("❌ Erro ao buscar saldo:", error);
        return;
      }

      if (data && typeof data.balance === "number") {
        const updatedUser = { ...user, balance: data.balance };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }
    } catch (err) {
      console.error("❌ Erro ao atualizar saldo do usuário:", err);
    }
  };

  // 🔹 Função de adicionar fundos
  const addFunds = async (amount: number) => {
    if (!user?.id) return alert("Usuário não definido ou sem ID!");

    const newBalance = (user.balance || 0) + amount;

    try {
      const { error } = await supabase
        .from("users")
        .update({ balance: newBalance })
        .eq("id", user.id);

      if (error) throw error;

      const updatedUser = { ...user, balance: newBalance };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      console.log(
        `💵 Fundos adicionados: €${amount.toFixed(2)}. Novo saldo: €${newBalance.toFixed(2)}`
      );
    } catch (err) {
      console.error("❌ Erro ao adicionar fundos:", err);
      alert("Erro ao atualizar saldo no Supabase.");
    }
  };

  // 🔹 Atualizar perfil
  const updateProfile = async (updates: Partial<User>) => {
    if (!user?.id) return alert("Usuário não definido!");
    try {
      const { error } = await supabase.from("users").update(updates).eq("id", user.id);
      if (error) throw error;

      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      alert("Perfil atualizado com sucesso!");
      console.log("✏️ Perfil atualizado:", updatedUser);
    } catch (err) {
      console.error("❌ Erro ao atualizar perfil:", err);
      alert("Erro ao atualizar perfil: " + err);
    }
  };

  // 🔹 Atualizar email
  const updateEmail = async (newEmail: string) => {
    if (!user?.id) return alert("Usuário não definido");

    try {
      const res = await fetch(`${API_BASE}/email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, newEmail }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erro ao atualizar email");

      const updatedUser = { ...user, email: newEmail };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      alert(data.message);
      console.log("📧 Email atualizado:", updatedUser);
    } catch (err: any) {
      console.error("❌ Erro ao atualizar email:", err);
      alert("Erro ao atualizar email: " + err.message);
    }
  };

  // 🔹 Atualizar senha
  const updatePassword = async (
    oldPassword: string,
    newPassword: string,
    confirmPassword: string
  ) => {
    if (!user?.id) return alert("Usuário não definido");

    try {
      const res = await fetch(`${API_BASE}/password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, oldPassword, newPassword, confirmPassword }),
      });

      const data = await res.json();
      if (!res.ok) return alert("Erro: " + data.error);

      alert(data.message);
      console.log("🔒 Senha atualizada com sucesso");
    } catch (err: any) {
      console.error("❌ Erro ao atualizar senha:", err);
      alert("Erro ao atualizar senha: " + err.message);
    }
  };

  // Sempre que o usuário muda, atualiza saldo
  useEffect(() => {
    if (user?.id) {
      refreshBalance();
    }
  }, [user?.id]);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        addFunds,
        refreshBalance,
        updateProfile,
        updateEmail,
        updatePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
