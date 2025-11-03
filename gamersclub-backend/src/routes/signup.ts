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
    console.log("[Signup] Iniciando registro para:", email);

    // 1. CRIAR USUÁRIO NO SUPABASE AUTH (IMPORTANTE!)
    console.log("[Signup] Criando usuário no Supabase Auth...");
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          name: name
        },
        emailRedirectTo: 'http://localhost:3001/login'  // Redireciona para login após confirmar email
      }
    });

    if (authError) {
      console.error("[Signup] Erro ao criar no Supabase Auth:", authError.message);
      return res.status(500).json({ error: authError.message });
    }

    if (!authData.user) {
      console.error("[Signup] Usuário não foi criado no Auth");
      return res.status(500).json({ error: "Erro ao criar usuário no Auth" });
    }

    console.log("[Signup] ✅ Usuário criado no Auth:", authData.user.id);

    // 2. Criptografa a senha para a tabela users
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Insere na tabela users usando o MESMO ID do Auth
    console.log("[Signup] Criando registro na tabela users...");
    const { data, error } = await supabase
      .from("users")
      .insert([{ 
        id: authData.user.id,  // USA O MESMO ID DO AUTH!
        email, 
        password: hashedPassword, 
        name,
        balance: 0 
      }])
      .select();

    if (error) {
      console.error("[Signup] Erro ao inserir na tabela users:", error.message);
      
      // Se falhar, tenta deletar do Auth para manter consistência
      await supabase.auth.admin.deleteUser(authData.user.id);
      
      return res.status(500).json({ error: error.message });
    }

    console.log("[Signup] ✅ Usuário registrado com sucesso!");
    console.log("  Auth ID:", authData.user.id);
    console.log("  Email:", email);
    console.log("  Nome:", name);

    res.json(data[0]);
  } catch (err) {
    console.error("[Signup] Erro ao registrar usuário:", err);
    res.status(500).json({ error: "Erro ao registrar usuário" });
  }
});

export default router;
