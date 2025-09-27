// src/routes/sendemail.ts
import { Router } from "express";
import { supabase } from "./supabaseClient.ts";

const router = Router();

/**
 * @swagger
 * /api/sendemail:
 *   post:
 *     summary: Envia um recibo para o email do usuário
 *     description: Busca o email do usuário pelo userId e envia um recibo via Supabase
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID do usuário no Supabase
 *                 example: "b3c4dc10-66fc-4c6f-92ff-80f1fccd4105"
 *               subject:
 *                 type: string
 *                 description: Assunto do email
 *                 example: "Recibo de Compra"
 *               html:
 *                 type: string
 *                 description: Conteúdo HTML do email
 *                 example: "<h1>Obrigado pela compra!</h1><p>Detalhes do pedido...</p>"
 *     responses:
 *       200:
 *         description: Email enviado com sucesso
 *       400:
 *         description: Parâmetros inválidos
 *       500:
 *         description: Erro interno
 */

router.post("/", async (req, res) => {
  const { userId, subject, html } = req.body;

  if (!userId || !subject || !html) {
    return res.status(400).json({ error: "Parâmetros inválidos" });
  }

  try {
    console.log("🔎 Buscando email do usuário:", userId);

    // Buscar email do usuário
    const { data: user, error: userError } = await supabase
      .from("users")
      .select("email")
      .eq("id", userId)
      .single();

    if (userError || !user?.email) {
      console.error("❌ Erro ao buscar usuário ou email não encontrado:", userError);
      return res.status(400).json({ error: "Email do usuário não encontrado" });
    }

    const recipient = user.email;
    console.log("📧 Email encontrado:", recipient);

    // Inserir na tabela 'mail' para envio
    const { error: mailError } = await supabase.from("mail").insert([
      { recipient, subject, html },
    ]);

    if (mailError) {
      console.error("❌ Erro ao enviar email:", mailError);
      return res.status(500).json({ error: mailError.message });
    }

    console.log("✅ Email enviado com sucesso para", recipient);
    res.json({ message: "Email enviado com sucesso", recipient });
  } catch (err) {
    console.error("❌ Erro interno ao enviar email:", err);
    res.status(500).json({ error: "Erro interno ao enviar email" });
  }
});

export default router;
