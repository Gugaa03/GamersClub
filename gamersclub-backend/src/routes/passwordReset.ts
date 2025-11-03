import { Router, Request, Response } from "express";
import { supabase } from "./supabaseClient.js";

const router = Router();

/**
 * 🔐 Sistema de Recuperação de Senha usando Supabase Auth
 * Usa os métodos nativos do Supabase em vez de tabela customizada
 */

// 1️⃣ Solicitar recuperação de senha (envia email via Supabase Auth)
router.post("/forgot-password", async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    console.log(`📝 [${new Date().toISOString()}] [POST] /api/forgot-password`);
    console.log("   Body:", { email });

    if (!email) {
      return res.status(400).json({ error: "Email é obrigatório" });
    }

    // Usar o método nativo do Supabase Auth
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.FRONTEND_URL || 'http://localhost:3001'}/reset-password`,
    });

    if (error) {
      console.error("❌ Erro ao enviar email:", error);
      // Por segurança, não revelar se o email existe ou não
      return res.json({ 
        message: "Se o email existir, você receberá um link de recuperação" 
      });
    }

    console.log("✅ Email de recuperação enviado via Supabase Auth para:", email);

    res.json({ 
      message: "Email de recuperação enviado com sucesso. Verifique sua caixa de entrada." 
    });

  } catch (error: any) {
    console.error("❌ Erro em /forgot-password:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

// 2️⃣ Resetar a senha (usando Supabase Auth)
router.post("/reset-password", async (req: Request, res: Response) => {
  try {
    const { newPassword } = req.body;
    const accessToken = req.headers.authorization?.replace('Bearer ', '');
    
    console.log(`📝 [${new Date().toISOString()}] [POST] /api/reset-password`);

    if (!newPassword) {
      return res.status(400).json({ error: "Nova senha é obrigatória" });
    }

    if (!accessToken) {
      return res.status(401).json({ error: "Token de acesso não fornecido" });
    }

    // Validar senha
    if (newPassword.length < 8) {
      return res.status(400).json({ error: "Senha deve ter no mínimo 8 caracteres" });
    }

    // Obter usuário do token
    const { data: { user }, error: userError } = await supabase.auth.getUser(accessToken);

    if (userError || !user) {
      return res.status(401).json({ error: "Token inválido ou expirado" });
    }

    // Atualizar senha usando Supabase Auth Admin
    const { data, error } = await supabase.auth.admin.updateUserById(
      user.id,
      { password: newPassword }
    );

    if (error) {
      console.error("❌ Erro ao atualizar senha:", error);
      return res.status(400).json({ error: error.message });
    }

    console.log("✅ Senha atualizada com sucesso para user:", user.id);

    res.json({ message: "Senha redefinida com sucesso" });

  } catch (error: any) {
    console.error("❌ Erro em /reset-password:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

export default router;
