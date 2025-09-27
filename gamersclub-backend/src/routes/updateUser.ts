// src/routes/updateUser.ts
import { Router } from "express";
import { supabase } from "./supabaseClient.ts";
import bcrypt from "bcrypt";

const router = Router();

// =======================
// Middleware de logs
// =======================
router.use((req, res, next) => {
  console.log(`📝 [${req.method}] ${req.originalUrl} - Body:`, req.body);
  next();
});

// =======================
// Atualizar email
// =======================
router.post("/email", async (req, res) => {
  const { userId, newEmail } = req.body;

  if (!userId || !newEmail) {
    console.warn("⚠️ /email: Dados inválidos", { userId, newEmail });
    return res.status(400).json({ error: "userId e newEmail são obrigatórios" });
  }

  try {
    console.log("📧 /email: Atualizando email do usuário:", userId);

    const { data, error } = await supabase
      .from("users")
      .update({ email: newEmail })
      .eq("id", userId);

    if (error) {
      console.error("❌ /email: Erro ao atualizar email:", error);
      return res.status(400).json({ error: error.message });
    }

    console.log("✅ /email: Email atualizado na tabela users:", data);
    res.json({ message: "Email atualizado com sucesso!", data });
  } catch (err) {
    console.error("❌ /email: Exceção ao atualizar email:", err);
    res.status(500).json({ error: "Erro interno ao atualizar email" });
  }
});

// =======================
// Atualizar senha
// =======================
router.post("/password", async (req, res) => {
  const { userId, oldPassword, newPassword, confirmPassword } = req.body;

  if (!userId || !oldPassword || !newPassword || !confirmPassword) {
    return res
      .status(400)
      .json({ error: "Todos os campos são obrigatórios" });
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ error: "As senhas não coincidem" });
  }

  try {
    // Buscar usuário
    const { data: user, error: fetchError } = await supabase
      .from("users")
      .select("password")
      .eq("id", userId)
      .single();

    if (fetchError || !user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    // Validar senha antiga
    const isValidPassword = await bcrypt.compare(oldPassword, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ error: "Senha antiga incorreta" });
    }

    // Gerar hash da nova senha
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Atualizar no banco
    const { error: updateError } = await supabase
      .from("users")
      .update({ password: hashedPassword })
      .eq("id", userId);

    if (updateError) {
      return res.status(400).json({ error: updateError.message });
    }

    res.json({ message: "Senha atualizada com sucesso!" });
  } catch (err) {
    res.status(500).json({ error: "Erro interno ao atualizar senha" });
  }
});

export default router;

// =======================
// Swagger JSDoc
// =======================

/**
 * @swagger
 * /api/updateUser/email:
 *   post:
 *     summary: Atualiza o email de um usuário
 *     tags:
 *       - Usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 example: "b3c4dc10-66fc-4c6f-92ff-80f1fccd4105"
 *               newEmail:
 *                 type: string
 *                 example: "novo@email.com"
 *     responses:
 *       200:
 *         description: Email atualizado com sucesso
 *       400:
 *         description: Dados inválidos ou erro ao atualizar
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /api/updateUser/password:
 *   post:
 *     summary: Atualiza a senha de um usuário
 *     tags:
 *       - Usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 example: "b3c4dc10-66fc-4c6f-92ff-80f1fccd4105"
 *               oldPassword:
 *                 type: string
 *                 example: "senhaAntiga123"
 *               newPassword:
 *                 type: string
 *                 example: "novaSenha123"
 *               confirmPassword:
 *                 type: string
 *                 example: "novaSenha123"
 *     responses:
 *       200:
 *         description: Senha atualizada com sucesso
 *       400:
 *         description: Dados inválidos ou senha incorreta
 *       500:
 *         description: Erro interno do servidor
 */
