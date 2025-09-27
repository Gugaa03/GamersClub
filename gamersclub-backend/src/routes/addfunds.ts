import { Router } from "express";
import { supabase } from "./supabaseClient.ts";

const router = Router();

router.post("/", async (req, res) => {
  const { userId, amount } = req.body;

  if (!userId || !amount) return res.status(400).json({ error: "Dados inválidos" });

  // Busca saldo atual
  const { data: user, error } = await supabase
    .from("users")
    .select("balance")
    .eq("id", userId)
    .single();

  if (error) return res.status(400).json({ error: error.message });

  const newBalance = (user.balance || 0) + amount;

  const { error: updateError } = await supabase
    .from("users")
    .update({ balance: newBalance })
    .eq("id", userId);

  if (updateError) return res.status(400).json({ error: updateError.message });

  res.json({ newBalance });
});

export default router;
