import { Router } from "express";
import { supabase } from "./supabaseClient.ts";
import { asyncHandler, AppError } from "../middleware/errorHandler.ts";
import { validateCheckoutData } from "../middleware/validation.ts";
import { checkoutLimiter } from "../middleware/rateLimiter.ts";
import type { CheckoutRequest } from "../types/index.ts";

const router = Router();

router.post("/", checkoutLimiter, validateCheckoutData, asyncHandler(async (req, res) => {
  const { userId, games }: CheckoutRequest = req.body;

  console.log(`🛒 Processando checkout para usuário ${userId} com ${games.length} jogos`);

  // Busca saldo atual e email do usuário
  const { data: user, error } = await supabase
    .from("users")
    .select("balance, email, name")
    .eq("id", userId)
    .single();

  if (error || !user) {
    throw new AppError("Usuário não encontrado", 404);
  }

  const totalPrice = games.reduce((acc, g) => acc + g.price, 0);

  if ((user.balance || 0) < totalPrice) {
    throw new AppError("Saldo insuficiente para completar a compra", 400);
  }

  // Subtrai saldo
  const newBalance = (user.balance || 0) - totalPrice;

  const { error: updateError } = await supabase
    .from("users")
    .update({ balance: newBalance })
    .eq("id", userId);

  if (updateError) {
    console.error("❌ Erro ao atualizar saldo:", updateError);
    throw new AppError("Erro ao processar pagamento", 500);
  }

  // Adiciona jogos à biblioteca
  const entries = games.map((g) => ({ user_id: userId, game_id: g.id }));
  const { error: insertError } = await supabase.from("library").insert(entries);

  if (insertError) {
    console.error("❌ Erro ao adicionar jogos à biblioteca:", insertError);
    // Reverte o saldo
    await supabase.from("users").update({ balance: user.balance }).eq("id", userId);
    throw new AppError("Erro ao adicionar jogos à biblioteca", 500);
  }

  console.log(`✅ Compra concluída para ${user.email}. Novo saldo: €${newBalance.toFixed(2)}`);

  // 🔹 Envia email com recibo (opcional - não falhar se email não enviar)
  try {
    const gameListHtml = games.map(g => `<li>${g.name} - €${g.price.toFixed(2)}</li>`).join("");
    const { error: emailError } = await supabase.functions.invoke("send-email", {
      body: {
        to: user.email,
        subject: "🎮 Recibo de Compra - GamersClub",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #4F46E5;">Olá ${user.name}! 🎉</h2>
            <p>Obrigado pela sua compra na GamersClub! Aqui está o seu recibo:</p>
            <ul style="list-style: none; padding: 0;">
              ${gameListHtml}
            </ul>
            <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;">
            <p><strong>Total pago:</strong> €${totalPrice.toFixed(2)}</p>
            <p><strong>Saldo restante:</strong> €${newBalance.toFixed(2)}</p>
            <p style="color: #666; font-size: 12px; margin-top: 30px;">
              GamersClub - Sua loja de jogos online
            </p>
          </div>
        `,
      },
    });

    if (emailError) {
      console.error("⚠️ Erro ao enviar email (não crítico):", emailError);
    } else {
      console.log("📧 Email de recibo enviado para:", user.email);
    }
  } catch (err) {
    console.error("⚠️ Erro ao enviar email (não crítico):", err);
  }

  res.json({ 
    newBalance, 
    message: "Compra realizada com sucesso!",
    totalPaid: totalPrice,
    gamesCount: games.length,
  });
}));

export default router;
