import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Carregar variáveis de ambiente
dotenv.config({ path: path.join(__dirname, '../../gamersclub-frontend/.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

console.log('🔐 Supabase URL:', supabaseUrl);

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function runMigration() {
  try {
    console.log('📝 Lendo arquivo de migration...');
    
    const migrationPath = path.join(__dirname, '../migrations/create_password_resets.sql');
    const sql = fs.readFileSync(migrationPath, 'utf-8');
    
    // Dividir o SQL em comandos individuais (remover comentários)
    const commands = sql
      .split(';')
      .map(cmd => cmd.trim())
      .filter(cmd => cmd.length > 0 && !cmd.startsWith('--'));

    console.log(`\n🚀 Executando ${commands.length} comandos SQL...\n`);

    // Executar cada comando
    for (let i = 0; i < commands.length; i++) {
      const cmd = commands[i];
      if (!cmd) continue;

      // Mostrar apenas os primeiros 100 caracteres
      const preview = cmd.substring(0, 100).replace(/\n/g, ' ');
      console.log(`[${i + 1}/${commands.length}] ${preview}...`);

      try {
        // Para Supabase, usamos o cliente SQL diretamente
        const { data, error } = await supabase.rpc('exec_sql', { 
          query: cmd + ';' 
        });

        if (error) {
          console.error(`   ❌ Erro:`, error.message);
        } else {
          console.log(`   ✅ Sucesso`);
        }
      } catch (err: any) {
        console.error(`   ⚠️  Aviso:`, err.message);
      }
    }

    // Tentar criar a tabela diretamente usando o método alternativo
    console.log('\n🔧 Método alternativo: Criando tabela via SQL direto...\n');
    
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

    // Verificar se a tabela existe
    const { data: tables, error: tablesError } = await supabase
      .from('password_resets')
      .select('*')
      .limit(1);

    if (tablesError) {
      console.log('❌ Tabela ainda não existe:', tablesError.message);
      console.log('\n📋 INSTRUÇÕES MANUAIS:');
      console.log('1. Acesse: https://supabase.com/dashboard/project/iwfsrypsxddfkdpcfmfn/sql/new');
      console.log('2. Cole o seguinte SQL:\n');
      console.log(createTableSQL);
      console.log('\n3. Clique em "Run" para executar');
    } else {
      console.log('✅ Tabela password_resets já existe!');
      console.log('   Registros:', tables?.length || 0);
    }

  } catch (error: any) {
    console.error('\n❌ Erro fatal:', error.message);
    console.log('\n📋 Execute manualmente no Supabase SQL Editor:');
    console.log('URL: https://supabase.com/dashboard/project/iwfsrypsxddfkdpcfmfn/sql/new');
  }
}

runMigration();
