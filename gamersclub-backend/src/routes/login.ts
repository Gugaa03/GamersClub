// src/routes/login.ts
import { Router } from "express";
import bcrypt from "bcrypt";
import { supabase } from "./supabaseClient.ts";



/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Login de usuário
 *     tags:
 *       - Usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "guga090403@gmail.com"
 *               password:
 *                 type: string
 *                 example: "minhaSenha123"
 *     responses:
 *       200:
 *         description: Login bem-sucedido
 *         content:
 *           application/json:
 *             example:
 *               id: "b3c4dc10-66fc-4c6f-92ff-80f1fccd4105"
 *               name: "Guga"
 *               email: "guga090403@gmail.com"
 *               balance: 10.5
 *       400:
 *         description: Erro de validação ou credenciais incorretas
 *         content:
 *           application/json:
 *             example:
 *               error: "Senha incorreta"
 *       500:
 *         description: Erro interno do servidor
 */



const router = Router();

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  console.log("🔹 Recebendo login:", { email });

  if (!email || !password) {
    console.log("⚠️ Campos faltando");
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  try {
    // Buscar usuário no Supabase pelo email
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (error) {
      console.log("❌ Erro ao buscar usuário:", error);
      return res.status(400).json({ error: "Usuário não encontrado" });
    }

    if (!data) {
      console.log("⚠️ Usuário não encontrado");
      return res.status(400).json({ error: "Usuário não encontrado" });
    }

    console.log("🔹 Usuário encontrado:", data.email, "ID:", data.id);

    // Comparar senha
    const validPassword = await bcrypt.compare(password, data.password);
    if (!validPassword) {
      console.log("⚠️ Senha incorreta para:", email);
      return res.status(400).json({ error: "Senha incorreta" });
    }

    console.log("✅ Login bem-sucedido para:", email);

    // Retornar dados do usuário, incluindo ID e balance
    res.json({
      id: data.id,
      name: data.name,
      email: data.email,
      balance: data.balance || 0,
    });
  } catch (err) {
    console.error("❌ Erro no login:", err);
    res.status(500).json({ error: "Erro ao fazer login" });
  }
});

export default router;