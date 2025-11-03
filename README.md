# 🎮 GamersClub

Uma loja de jogos online moderna construída com **Next.js**, **Supabase** e **Tailwind CSS**, permitindo que usuários explorem jogos, adicionem ao carrinho e realizem compras diretamente.

> ⚠️ Este projeto ainda está em desenvolvimento. Algumas funcionalidades estão sendo implementadas ou sujeitas a melhorias.

---

## 📝 Funcionalidades

### ✅ Implementadas
- 📦 Listagem de jogos com detalhes, descrição, preço e imagens
- 🎭 Exibição de gêneros, características e requisitos de sistema
- ⭐ Seção de avaliações de cada jogo
- 🛒 Carrinho de compras global com Context API
- 💳 Checkout integrado com validação de saldo
- 🔒 Autenticação de usuários (login e registro via Supabase Auth)
- 💰 Sistema de saldo e gerenciamento de fundos
- 📚 Biblioteca de jogos do usuário
- 🌙 Tema escuro com design moderno usando Tailwind CSS


### 🚧 Em Desenvolvimento
- Correção de bugs
- 🔐 Middleware de segurança com Helmet.js
- 📧 Sistema de envio de emails para recibos
---

## 🛠 Tecnologias

### Frontend
- **[Next.js 15](https://nextjs.org/)** – Framework React com SSR e SSG
- **[React 19](https://react.dev/)** – Biblioteca para UI
- **[Tailwind CSS 4](https://tailwindcss.com/)** – Framework CSS utilitário
- **[Framer Motion](https://www.framer.com/motion/)** – Animações fluidas
- **[Supabase](https://supabase.com/)** – Backend como serviço (Auth & Database)
- **TypeScript** – Type safety e melhor DX

### Backend
- **[Node.js](https://nodejs.org/)** – Runtime JavaScript
- **[Express.js](https://expressjs.com/)** – Framework web minimalista
- **[Supabase](https://supabase.com/)** – PostgreSQL Database e Auth
- **[Swagger](https://swagger.io/)** – Documentação automática da API
- **[Helmet.js](https://helmetjs.github.io/)** – Segurança HTTP headers
- **[Express Rate Limit](https://www.npmjs.com/package/express-rate-limit)** – Proteção contra abuso
- **TypeScript** – Type safety e melhor DX

---

## 🚀 Como Rodar

### Pré-requisitos
- Node.js 18+ instalado
- Conta no Supabase
- Git

### 1. Clone o repositório

```bash
git clone https://github.com/Gugaa03/GamersClub/
cd GamersClub
```

### 2. Configuração do Backend

```bash
cd gamersclub-backend

# Instalar dependências
npm install

# Copiar arquivo de ambiente
cp .env.example .env

# Editar .env com suas credenciais do Supabase
# SUPABASE_URL=sua_url_aqui
# SUPABASE_ANON_KEY=sua_chave_aqui
# etc.
```

#### Instalar dependências adicionais:
```bash
npm install helmet express-rate-limit tsx
```

### 3. Configuração do Frontend

```bash
cd ../gamersclub-frontend

# Instalar dependências
npm install

# Copiar arquivo de ambiente
cp .env.example .env.local

# Editar .env.local com suas credenciais
# NEXT_PUBLIC_SUPABASE_URL=sua_url_aqui
# NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_aqui
# NEXT_PUBLIC_API_URL=http://localhost:4000
```

### 4. Iniciar os servidores

#### Backend (Terminal 1):
```bash
cd gamersclub-backend
npm run dev
```
O servidor estará disponível em: `http://localhost:4000`  
Documentação Swagger: `http://localhost:4000/api/docs`

#### Frontend (Terminal 2):
```bash
cd gamersclub-frontend
npm run dev
```
O site estará disponível em: `http://localhost:3000`

---

## 📊 Estrutura do Projeto

```
GamersClub/
├── gamersclub-backend/
│   ├── src/
│   │   ├── index.ts              # Servidor principal
│   │   ├── types/                # Tipos TypeScript
│   │   ├── middleware/           # Middlewares (validação, errors, rate limit)
│   │   └── routes/               # Rotas da API
│   ├── .env.example              # Template de variáveis de ambiente
│   └── package.json
│
├── gamersclub-frontend/
│   ├── pages/                    # Páginas Next.js
│   ├── components/               # Componentes React
│   ├── lib/                      # Utilitários (Auth, API, Supabase)
│   ├── types/                    # Tipos TypeScript
│   ├── styles/                   # Estilos globais
│   ├── .env.example              # Template de variáveis de ambiente
│   └── package.json
│
└── README.md
```

---

## 🔒 Segurança

- ✅ Autenticação obrigatória para compras
- ✅ Validação de saldo antes de processar compras
- ✅ Senhas hashadas com bcrypt
- ✅ Rate limiting em rotas críticas (login, checkout)
- ✅ Headers de segurança com Helmet.js
- ✅ Validação de dados de entrada
- ✅ Proteção CORS configurável
- ✅ Tratamento de erros centralizado

---

## 📝 Scripts Disponíveis

### Backend
```bash
npm run dev          # Inicia servidor em modo desenvolvimento
npm run build        # Compila TypeScript para JavaScript
npm start            # Inicia servidor de produção
npm run lint         # Verifica erros de linting
npm run lint:fix     # Corrige erros de linting automaticamente
npm run format       # Formata código com Prettier
npm run type-check   # Verifica tipos TypeScript
```

### Frontend
```bash
npm run dev          # Inicia Next.js em modo desenvolvimento
npm run build        # Build de produção
npm start            # Inicia servidor de produção
npm run lint         # Verifica erros de linting
```

---

## 🐛 Troubleshooting

### Erro de conexão com Supabase
- Verifique se as variáveis de ambiente estão corretas
- Confirme que o projeto Supabase está ativo
- Verifique as regras de RLS (Row Level Security) no Supabase

### Erro ao instalar dependências
```bash
# Limpar cache e reinstalar
rm -rf node_modules package-lock.json
npm install
```

### Problemas com TypeScript
```bash
# Verificar erros sem compilar
npm run type-check
```

---

## 📸 Screenshots

<img width="2507" height="1251" alt="image" src="https://github.com/user-attachments/assets/23a73357-458c-478a-b51d-eda6376e7682" />

<img width="2490" height="1122" alt="image" src="https://github.com/user-attachments/assets/5719afb6-1bfa-4bfb-b54f-e9fc28826307" />
<img width="2496" height="1274" alt="image" src="https://github.com/user-attachments/assets/c9264500-ceff-4ea3-9c05-b74b7f6c9ac4" />

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NovaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/NovaFeature`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

---

## 👤 Autor

**Gugaa03**
- GitHub: [@Gugaa03](https://github.com/Gugaa03)
- Projeto: [GamersClub](https://github.com/Gugaa03/GamersClub/)

---

## ⭐ Status do Projeto

🚧 **Em desenvolvimento ativo** - Novas funcionalidades e melhorias sendo implementadas regularmente!



