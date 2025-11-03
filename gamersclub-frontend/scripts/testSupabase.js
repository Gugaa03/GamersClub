// scripts/testSupabase.js
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config({ path: ".env.local" });

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
    const { data, error, count } = await supabase
      .from("games")
      .select("*", { count: "exact" });

    if (error) {
      console.error("\n❌ Erro ao buscar jogos:", error.message);
      console.error("Detalhes:", error);
      
      if (error.message.includes("permission") || error.message.includes("denied")) {
        console.log("\n💡 SOLUÇÃO: Configure as políticas RLS no Supabase:");
        console.log("\n   No Supabase Dashboard:");
        console.log("   1. Vá para 'Table Editor' > tabela 'games'");
        console.log("   2. Clique em 'RLS' (Row Level Security)");
        console.log("   3. Clique em 'New Policy'");
        console.log("   4. Escolha 'Enable read access for all users'");
        console.log("   5. Ou desative RLS temporariamente para testar");
        console.log("\n   SQL para criar política:");
        console.log("   CREATE POLICY \"Enable read access for all users\"");
        console.log("   ON games FOR SELECT USING (true);");
      }
      
      return;
    }

    console.log(`\n✅ Conexão bem-sucedida!`);
    console.log(`📊 Total de jogos: ${count || data?.length || 0}`);

    if (!data || data.length === 0) {
      console.log("\n⚠️  A tabela 'games' está VAZIA!");
      console.log("\n💡 Você precisa adicionar jogos. Opções:");
      console.log("   1. Adicionar manualmente no Supabase Dashboard");
      console.log("   2. Importar dados via SQL");
      console.log("   3. Criar um script de seed");
    } else {
      console.log("\n✅ Jogos encontrados! Primeiros 3:");
      data.slice(0, 3).forEach((game, index) => {
        console.log(`\n   ${index + 1}. ${game.title || game.name || "Sem título"}`);
        console.log(`      Preço: €${game.price || 0}`);
        console.log(`      Categoria: ${game.category || "N/A"}`);
      });
    }

  } catch (err) {
    console.error("\n❌ Erro inesperado:", err);
  }
}

testConnection();
