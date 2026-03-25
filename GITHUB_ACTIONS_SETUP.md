# Guia de Deploy com GitHub Actions

## Pré-requisitos

- Repositório GitHub
- Conta Firebase
- Node.js 18+

## Passo 1: Configurar Repositório Git

```bash
# Inicializar repositório
git init

# Adicionar remote (substitua pelo seu repositório)
git remote add origin https://github.com/seu-usuario/bookshelf.git

# Criar e fazer push das branches
git checkout -b dev
git add .
git commit -m "Initial commit"
git push -u origin dev

git checkout -b main
git push -u origin main
```

## Passo 2: Criar Service Account Keys

### Para Desenvolvimento

1. Firebase Console → Seu Projeto Dev
2. Project Settings → Service Accounts
3. Node.js → Generate a new private key
4. Copie o JSON completo

### Para Produção

1. Firebase Console → Seu Projeto Prod
2. Repita o processo acima

## Passo 3: Adicionar Secrets no GitHub

1. Vá para seu repositório
2. Settings → Secrets and variables → Actions
3. Clique em "New repository secret"

### Secrets para DEV:

```
Nome: DEV_FIREBASE_API_KEY
Valor: [Cole sua API Key de desenvolvimento]

Nome: DEV_FIREBASE_AUTH_DOMAIN
Valor: [seu-projeto-dev].firebaseapp.com

Nome: DEV_FIREBASE_PROJECT_ID
Valor: [seu-projeto-id-dev]

Nome: DEV_FIREBASE_STORAGE_BUCKET
Valor: [seu-projeto-dev].appspot.com

Nome: DEV_FIREBASE_MESSAGING_SENDER_ID
Valor: [seu-messaging-sender-id-dev]

Nome: DEV_FIREBASE_APP_ID
Valor: [seu-app-id-dev]

Nome: DEV_FIREBASE_DATABASE_URL
Valor: https://[seu-projeto-dev].firebaseio.com

Nome: FIREBASE_DEV_SERVICE_ACCOUNT_JSON
Valor: [Cole todo o JSON da Service Account]
```

### Secrets para PROD:

Repita o processo acima, usando prefixo `PROD_` e valores de produção.

## Passo 4: Estrutura de Branches

```
Main Branch (Produção)
    ↑
Pull Requests (Code Quality Check)
    ↑
Dev Branch (Desenvolvimento)
```

### Fluxo de Trabalho

```bash
# 1. Trabalhar na branch dev
git checkout dev

# 2. Fazer alterações
git add .
git commit -m "feat: nova funcionalidade"
git push origin dev

# 3. Criar Pull Request (dev → main)
# GitHub Actions rodará testes automáticos

# 4. Se tudo OK, fazer merge para main
# GitHub Actions fará deploy automático em produção
```

## Passo 5: Workflows Disponíveis

### deploy-dev.yml
- Dispara: Push na branch `dev`
- Ação: Build + Deploy no Firebase Hosting (Dev)
- URL: `https://seu-projeto-dev.web.app`

### deploy-prod.yml
- Dispara: Push na branch `main`
- Ação: Build + Deploy no Firebase Hosting (Prod)
- URL: `https://seu-projeto.web.app`

### code-quality.yml
- Dispara: Pull Request em `dev` ou `main`
- Ação: Lint + Build
- Bloqueia merge se falhar

## Monitorando Deployments

1. GitHub Repository → Actions
2. Veja todos os workflows em execução
3. Clique em um workflow para ver detalhes
4. Se falhar, clique em "Re-run" após corrigir

## Troubleshooting

### Erro: "Service account not found"
- Verifique se o secret `FIREBASE_*_SERVICE_ACCOUNT_JSON` está correto
- Copie o JSON inteiro (com chaves)

### Erro: "Build failed"
- Verifique se os secrets das variáveis estão configurados
- Verifique a sintaxe nos arquivos de workflow

### Deploy não acontece
- Verifique se fez push para a branch correta
- Verifique se o GitHub Actions está habilitado (Actions tab)
- Verifique os logs no Actions

### Variáveis de ambiente não estão sendo usadas
- No build, é necessário o prefixo `VITE_`
- Firebase SDK não precisa, pode ser qualquer nome

## Checklist de Deploy

- [ ] Todos os secrets adicionados corretamente
- [ ] Regras Firestore deployadas (`firebase deploy --only firestore:rules`)
- [ ] Projeto Firebase criado para dev
- [ ] Projeto Firebase criado para prod
- [ ] Service Accounts criadas para ambos os projetos
- [ ] GitHub Actions habilitado
- [ ] Workflows criados em `.github/workflows/`
- [ ] Primeira execução manual: `firebase deploy`

## Monitoramento

Para monitorar antes de fazer deploy automático:

```bash
# Fazer deploy manual primeiro (opcional)
firebase use [seu-project-dev]
firebase deploy

# Depois configurar automático no GitHub Actions
```

## Rollback

Se algo der errado em produção:

1. Revert do commit problemático
```bash
git revert HEAD
git push origin main
```

2. Ou volta para commit anterior
```bash
git reset --hard <commit-id>
git push -f origin main
```

---

**Nota**: A força de push é necessária em caso de rollback. Use com cuidado!
