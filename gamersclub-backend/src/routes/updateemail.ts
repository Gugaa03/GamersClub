import { Router } from "express";
import { createClient } from "@supabase/supabase-js";

const router = Router();
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // ⚠️ backend seguro
);

router.post("/email", async (req, res) => {
  const { userId, newEmail } = req.body;
  if (!userId || !newEmail) return res.status(400).json({ error: "Dados inválidos" });

  const { error } = await supabase.auth.admin.updateUserById(userId, { email: newEmail });
  if (error) return res.status(400).json({ error: error.message });

  res.json({ message: "Email atualizado com sucesso!" });
});

export default router;
