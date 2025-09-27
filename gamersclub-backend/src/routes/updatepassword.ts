// src/routes/resetPassword.ts
import { Router } from "express";
import { supabase } from "./supabaseClient.ts";
import bcrypt from "bcrypt";

const router = Router();

// Middleware de logs
router.use((req, res, next) => {
  console.log(`📝 [${req.method}] ${req.originalUrl} - Body:`, req.body);
  next();
});

// POST /api/resetPassword
router.post("/", async (req, res) => {
  const { userId, newPassword } = req.body;

  if (!userId || !newPassword) {
    console.warn("⚠️ /resetPassword: Dados obrigatórios ausentes", { userId, newPassword });
    return res.status(400).json({ error: "userId e newPassword são obrigatórios" });
  }

  try {
    console.log("🔑 /resetPassword: Iniciando reset de senha para usuário:", userId);

    // Hash da nova senha
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    console.log("🔒 /resetPassword: Nova senha hasheada");

    // Atualiza a tabela 'users'
    const { data, error } = await supabase
      .from("users")
      .update({ password: hashedPassword })
      .eq("id", userId);

    if (error) {
      console.error("❌ /resetPassword: Erro ao atualizar senha:", error);
      return res.status(400).json({ error: error.message });
    }

    console.log("✅ /resetPassword: Senha atualizada com sucesso na tabela users:", data);
    res.json({ message: "Senha resetada com sucesso!", data });
  } catch (err) {
    console.error("❌ /resetPassword: Exceção ao resetar senha:", err);
    res.status(500).json({ error: "Erro interno ao resetar senha" });
  }
});

export default router;

// =======================
// Swagger JSDoc
// =======================
/**
 * @swagger
 * /api/updatepassword:
 *   post:
 *     summary: Reseta a senha de um usuário (ignora senha antiga)
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
 *               newPassword:
 *                 type: string
 *                 example: "novaSenha123"
 *     responses:
 *       200:
 *         description: Senha resetada com sucesso
 *         content:
 *           application/json:
 *             example:
 *               message: "Senha resetada com sucesso!"
 *       400:
 *         description: Dados inválidos ou erro ao atualizar
 *       500:
 *         description: Erro interno do servidor
 */
