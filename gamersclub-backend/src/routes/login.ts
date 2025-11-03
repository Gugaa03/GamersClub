// src/routes/login.ts
import { Router } from "express";
import bcrypt from "bcrypt";
import { supabase } from "./supabaseClient.ts";
import { asyncHandler, AppError } from "../middleware/errorHandler.ts";
import { validateLoginData } from "../middleware/validation.ts";
import { authLimiter } from "../middleware/rateLimiter.ts";
import type { LoginRequest } from "../types/index.ts";



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

router.post("/", authLimiter, validateLoginData, asyncHandler(async (req, res) => {
  const { email, password }: LoginRequest = req.body;

  console.log("🔹 Tentativa de login:", { email });

  // Buscar usuário no Supabase pelo email
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (error || !data) {
    console.log("⚠️ Usuário não encontrado:", email);
    throw new AppError("Credenciais inválidas", 401);
  }

  console.log("🔹 Usuário encontrado:", data.email, "ID:", data.id);

  // Comparar senha
  const validPassword = await bcrypt.compare(password, data.password);
  if (!validPassword) {
    console.log("⚠️ Senha incorreta para:", email);
    throw new AppError("Credenciais inválidas", 401);
  }

  console.log("✅ Login bem-sucedido para:", email);

  // Retornar dados do usuário (não retornar senha)
  res.json({
    id: data.id,
    name: data.name,
    email: data.email,
    balance: data.balance || 0,
    nickname: data.nickname,
  });
}));

export default router;