// scripts/testSupabase.ts
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log("🔍 Verificando configuração do Supabase...\n");
console.log("URL:", supabaseUrl);
console.log("Key:", supabaseKey ? "✅ Configurada" : "❌ Não encontrada");

if (!supabaseUrl || !supabaseKey) {
  console.error("\n❌ Erro: Variáveis de ambiente não configuradas!");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  console.log("\n🔌 Testando conexão com Supabase...");

  try {
    // Testa conexão
    const { data, error, count } = await supabase
      .from("games")
      .select("*", { count: "exact" });

    if (error) {
      console.error("\n❌ Erro ao buscar jogos:", error.message);
      console.error("Detalhes:", error);
      
      if (error.message.includes("JWT")) {
        console.log("\n💡 Solução: Verifique se a ANON_KEY está correta no .env.local");
      }
      
      if (error.message.includes("permission")) {
        console.log("\n💡 Solução: Configure as políticas RLS no Supabase:");
        console.log("   1. Vá para: https://supabase.com/dashboard");
        console.log("   2. Selecione seu projeto");
        console.log("   3. Vá em 'Authentication' > 'Policies'");
        console.log("   4. Na tabela 'games', adicione uma política para SELECT público");
      }
      
      return;
    }

    console.log(`\n✅ Conexão bem-sucedida!`);
    console.log(`📊 Total de jogos na base: ${count || 0}`);

    if (!data || data.length === 0) {
      console.log("\n⚠️  A tabela 'games' está vazia!");
      console.log("\n💡 Você precisa adicionar jogos ao banco de dados.");
      console.log("   Execute o script de seed ou adicione jogos manualmente no Supabase.");
    } else {
      console.log("\n📦 Primeiros 3 jogos encontrados:");
      data.slice(0, 3).forEach((game: any, index: number) => {
        console.log(`\n${index + 1}. ${game.title || game.name || "Sem título"}`);
        console.log(`   ID: ${game.id}`);
        console.log(`   Preço: €${game.price || 0}`);
        console.log(`   Categoria: ${game.category || "N/A"}`);
      });
    }

    // Testa outras tabelas
    console.log("\n\n🔍 Verificando outras tabelas...");
    
    const { data: users, error: usersError } = await supabase
      .from("users")
      .select("id", { count: "exact", head: true });
    
    if (usersError) {
      console.log("❌ Tabela 'users':", usersError.message);
    } else {
      console.log("✅ Tabela 'users': OK");
    }

    const { data: library, error: libraryError } = await supabase
      .from("library")
      .select("id", { count: "exact", head: true });
    
    if (libraryError) {
      console.log("❌ Tabela 'library':", libraryError.message);
    } else {
      console.log("✅ Tabela 'library': OK");
    }

  } catch (err) {
    console.error("\n❌ Erro inesperado:", err);
  }
}

testConnection();
