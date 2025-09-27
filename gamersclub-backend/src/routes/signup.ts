import { Router } from "express";
import bcrypt from "bcrypt";
import { supabase } from "./supabaseClient.ts";

const router = Router();

router.post("/", async (req, res) => {
  const { email, password, name } = req.body;

  // Validação básica
  if (!email || !password || !name) {
    console.log("[Signup] Falta algum campo:", { email, password, name });
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  try {
    // Criptografa a senha
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("[Signup] Senha original:", password);
    console.log("[Signup] Senha criptografada:", hashedPassword);

    // Insere no Supabase
    const { data, error } = await supabase
      .from("users")
      .insert([{ email, password: hashedPassword, name }])
      .select();

    if (error) {
      console.error("[Signup] Erro ao inserir no Supabase:", error.message);
      return res.status(500).json({ error: error.message });
    }

    console.log("[Signup] Usuário registrado com sucesso:", data[0]);

    res.json(data[0]);
  } catch (err) {
    console.error("[Signup] Erro ao registrar usuário:", err);
    res.status(500).json({ error: "Erro ao registrar usuário" });
  }
});

export default router;
