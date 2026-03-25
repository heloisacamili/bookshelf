# Guia de Setup do Firebase

## 1. Criar Projeto Firebase

1. Acesse [Firebase Console](https://console.firebase.google.com)
2. Clique em "Criar Projeto"
3. Digite um nome para seu projeto (ex: "bookshelf-app")
4. Clique em "Continuar"
5. Configure Google Analytics (opcional)
6. Clique em "Criar Projeto"

## 2. Configurar Autenticação

1. No Firebase Console, vá para "Authentication"
2. Clique em "Começar"
3. Selecione "Email/Password"
4. Clique em "Ativar"
5. Salve e continue

## 3. Criar Firestore Database

1. Vá para "Cloud Firestore"
2. Clique em "Criar Banco de Dados"
3. Selecione "Modo de Produção"
4. Escolha a localização (deixe padrão)
5. Clique em "Criar"

## 4. Deploy das Regras Firestore

1. Abra um terminal no diretório do projeto
2. Instale o Firebase CLI (se ainda não tiver):
   ```bash
   npm install -g firebase-tools
   ```
3. Faça login:
   ```bash
   firebase login
   ```
4. Implemente as regras:
   ```bash
   firebase deploy --only firestore:rules
   ```

## 5. Obter Credenciais

1. No Firebase Console, vá para "Project Settings"
2. Clique em "Webapp" ou "Adicionar app"
3. Preencha o nome (ex: "BookShelf Web")
4. Copie as credenciais (firebaseConfig)

## 6. Copiar Credenciais para .env.local

```env
VITE_FIREBASE_API_KEY=sua_api_key_aqui
VITE_FIREBASE_AUTH_DOMAIN=seu_projeto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=seu_projeto_id
VITE_FIREBASE_STORAGE_BUCKET=seu_projeto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=seu_sender_id
VITE_FIREBASE_APP_ID=seu_app_id
VITE_FIREBASE_DATABASE_URL=sua_database_url
```

## 7. Habilitar Firebase Hosting (Opcional)

1. No Firebase Console, vá para "Hosting"
2. Clique em "Começar"
3. Siga as instruções

## 8. Configurar GitHub Actions (Para CI/CD)

### Passo 1: Criar Serviços de Conta (Service Accounts)

1. No Firebase Console, vá para "Project Settings"
2. Selecione a aba "Service Accounts"
3. Clique em "Generate a new private key"
4. Copie o JSON gerado

### Passo 2: Adicionar Secrets no GitHub

1. Vá para seu repositório GitHub
2. Settings → Secrets and variables → Actions
3. Adicione os seguintes secrets:

#### Para Desenvolvimento (DEV):
- `DEV_FIREBASE_API_KEY` - API Key do seu projeto dev
- `DEV_FIREBASE_AUTH_DOMAIN` - Auth Domain
- `DEV_FIREBASE_PROJECT_ID` - Project ID
- `DEV_FIREBASE_STORAGE_BUCKET` - Storage Bucket
- `DEV_FIREBASE_MESSAGING_SENDER_ID` - Messaging Sender ID
- `DEV_FIREBASE_APP_ID` - App ID
- `DEV_FIREBASE_DATABASE_URL` - Database URL
- `FIREBASE_DEV_SERVICE_ACCOUNT_JSON` - JSON inteiro da Service Account

#### Para Produção (PROD):
- Repita o processo acima, usando `PROD_` como prefixo

## 9. Estrutura de Projetos Firebase (Recomendado)

### Opção 1: Um Projeto com Diferentes Targeting
```
bookshelf (Projeto Principal)
├── Hosting Development
│   └── URL: bookshelf-dev.web.app
├── Hosting Production
│   └── URL: bookshelf.web.app
├── Firestore (Compartilhado)
├── Auth (Compartilhado)
└── Storage (Compartilhado)
```

### Opção 2: Dois Projetos Separados (Recomendado para Produção)
```
bookshelf-dev (Projeto de Desenvolvimento)
├── Hosting: bookshelf-dev.web.app
├── Firestore
├── Auth
└── Storage

bookshelf-prod (Projeto de Produção)
├── Hosting: bookshelf.web.app
├── Firestore
├── Auth
└── Storage
```

## 10. Primeiro Deploy Manual

```bash
# Build the project
npm run build

# Login to Firebase
firebase login

# Initialize Firebase (primeira vez)
firebase init

# Deploy
firebase deploy
```

## 11. Testar Aplicação

1. Acesse a URL do Firebase Hosting
2. Clique em "Criar Conta"
3. Preencha com seus dados
4. Adicione alguns livros
5. Teste os filtros e ordenações

## Troubleshooting

### "Permission denied" ao fazer deploy
- Verifique se tem acesso ao projeto Firebase
- Execute `firebase login` novamente

### Firestore rules não estão funcionando
- Aguarde alguns segundos após o deploy
- Limpe o cache do navegador
- Tente em uma aba incógnita

### Ambiente dev não recebe mudanças
- Verifique se está fazendo push para branch `dev`
- Verifique os logs do GitHub Actions

## Próximos Passos

1. Testar todas as funcionalidades
2. Configurar domínio customizado (opcional)
3. Configurar CORS se necessário
4. Monitorar analytics do Firebase
5. Fazer backup dos dados periodicamente

---

**Documentação Firebase**: https://firebase.google.com/docs
