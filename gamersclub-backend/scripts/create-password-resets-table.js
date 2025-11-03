// Script para criar a tabela password_resets via Supabase Client
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '../../gamersclub-frontend/.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('🔐 Conectando ao Supabase...');
console.log('📍 URL:', supabaseUrl);

const supabase = createClient(supabaseUrl, supabaseKey);

async function createTable() {
  try {
    console.log('\n🚀 Criando tabela password_resets...\n');

    // SQL para criar a tabela
    const createTableSQL = `
      CREATE TABLE IF NOT EXISTS password_resets (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL,
        token TEXT NOT NULL UNIQUE,
        expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
        used BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `;

    // Tentar inserir um registro de teste para verificar se a tabela existe
    const { data, error } = await supabase
      .from('password_resets')
      .select('*')
      .limit(1);

    if (error) {
      if (error.message.includes('does not exist') || error.code === 'PGRST204' || error.code === 'PGRST205') {
        console.log('❌ Tabela não existe ainda.');
        console.log('\n📋 EXECUTE O SQL MANUALMENTE:');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('\n1️⃣ Acesse: https://supabase.com/dashboard/project/iwfsrypsxddfkdpcfmfn/sql/new\n');
        console.log('2️⃣ Cole este SQL:\n');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log(createTableSQL);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('\n3️⃣ Clique em RUN\n');
        console.log('4️⃣ Execute este script novamente para verificar\n');
      } else {
        console.error('❌ Erro desconhecido:', error);
      }
    } else {
      console.log('✅ Tabela password_resets JÁ EXISTE!');
      console.log('📊 Registros encontrados:', data?.length || 0);
      
      // Criar os índices
      console.log('\n🔧 Verificando índices...');
      console.log('ℹ️ Índices devem ser criados manualmente no SQL Editor se ainda não existirem:');
      console.log('\nCREATE INDEX IF NOT EXISTS idx_password_resets_token ON password_resets(token);');
      console.log('CREATE INDEX IF NOT EXISTS idx_password_resets_user_id ON password_resets(user_id);');
      console.log('CREATE INDEX IF NOT EXISTS idx_password_resets_expires_at ON password_resets(expires_at);');
      
      console.log('\n✅ Sistema pronto para usar! Teste o forgot password agora.');
    }

  } catch (err) {
    console.error('\n❌ Erro fatal:', err.message);
  }
}

createTable();
