import { Router } from "express";
import { supabase } from "./supabaseClient.ts";

const router = Router();

router.post("/", async (req, res) => {
  const { userId, games } = req.body;

  if (!userId || !games || !Array.isArray(games)) {
    return res.status(400).json({ error: "Dados inválidos" });
  }

  // Busca saldo atual e email do usuário
  const { data: user, error } = await supabase
    .from("users")
    .select("balance, email, name")
    .eq("id", userId)
    .single();

  if (error) return res.status(400).json({ error: error.message });

  const totalPrice = games.reduce((acc, g: any) => acc + g.price, 0);

  if ((user.balance || 0) < totalPrice) return res.status(400).json({ error: "Saldo insuficiente" });

  // Subtrai saldo
  const newBalance = (user.balance || 0) - totalPrice;

  const { error: updateError } = await supabase
    .from("users")
    .update({ balance: newBalance })
    .eq("id", userId);

  if (updateError) return res.status(400).json({ error: updateError.message });

  // Adiciona jogos à biblioteca
  const entries = games.map((g: any) => ({ user_id: userId, game_id: g.id }));
  const { error: insertError } = await supabase.from("library").insert(entries);

  if (insertError) return res.status(400).json({ error: insertError.message });

  // 🔹 Envia email com recibo usando Supabase SMTP
  try {
    const gameListHtml = games.map(g => `<li>${g.name} - €${g.price.toFixed(2)}</li>`).join("");
    const { data: emailData, error: emailError } = await supabase.functions.invoke("send-email", {
      method: "POST",
      body: {
        to: user.email,
        subject: "Recibo de Compra de Jogos",
        html: `
          <h2>Olá ${user.name},</h2>
          <p>Obrigado pela sua compra! Aqui está o seu recibo:</p>
          <ul>${gameListHtml}</ul>
          <p><strong>Total pago:</strong> €${totalPrice.toFixed(2)}</p>
          <p>Saldo restante: €${newBalance.toFixed(2)}</p>
        `,
      },
    });

    if (emailError) console.error("❌ Erro ao enviar email:", emailError);
  } catch (err) {
    console.error("❌ Erro ao enviar email:", err);
  }

  res.json({ newBalance, message: "Compra realizada com sucesso e email enviado!" });
});

export default router;
