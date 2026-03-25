# Guia Rápido de Início

## 1️⃣ Instalação

```bash
# Clonar repositório
git clone <seu-repo>
cd projeto-receitas

# Instalar dependências
npm install
```

## 2️⃣ Configurar Firebase

```bash
# Criar arquivo .env.local
cp .env.example .env.local

# Editar .env.local e preencher com suas credenciais
# Veja FIREBASE_SETUP.md para instruções detalhadas
```

## 3️⃣ Rodar Localmente

```bash
# Iniciar servidor de desenvolvimento
npm run dev

# Acessar http://localhost:5173
```

## 4️⃣ Criar Conta e Testar

1. Clique em "Criar Conta"
2. Preencha email e senha
3. Clique em "Criar Conta"
4. Adicione livros clicando em "Adicionar Livro"
5. Teste filtros, busca e ordenação

## 5️⃣ Build para Produção

```bash
# Build
npm run build

# Testar build localmente
npm run preview
```

## 6️⃣ Deploy

### Deploy Manual
```bash
# Instalar Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Deploy
firebase deploy
```

### Deploy Automático (GitHub Actions)
Veja `GITHUB_ACTIONS_SETUP.md`

## 📚 Documentação

- **README.md** - Visão geral do projeto
- **FIREBASE_SETUP.md** - Configuração do Firebase
- **GITHUB_ACTIONS_SETUP.md** - Configuração CI/CD
- **ARCHITECTURE.md** - Arquitetura técnica
- **firestore.rules** - Regras de segurança

## 🎯 Próximas Sugestões

- [ ] Adicionar testes unitários
- [ ] Implementar dark mode
- [ ] Adicionar upload de imagens
- [ ] Integração com Google Books API
- [ ] Exportar/Importar dados
- [ ] Offline support com Service Workers
- [ ] Melhorar acessibilidade (a11y)
- [ ] Adicionar PWA capabilities

---

Pronto para começar? 🚀
