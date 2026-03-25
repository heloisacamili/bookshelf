# BookShelf - Aplicação Web de Gerenciamento de Livros

Uma aplicação moderna e responsiva para gerenciar sua biblioteca pessoal, construída com React, Firebase e Tailwind CSS.

## 🚀 Características

- ✨ **Interface Moderna e Intuitiva** - Design limpo e responsivo
- 🔐 **Autenticação Segura** - Login/Cadastro com Firebase Auth
- 📚 **CRUD Completo** - Criar, ler, atualizar e deletar livros
- 🔍 **Busca e Filtro** - Pesquise e organize seus livros por categoria
- 📱 **Responsivo** - Funciona perfeitamente em desktop, tablet e mobile
- ☁️ **Cloud Firestore** - Dados sincronizados em tempo real
- 🚀 **Deploy Automático** - CI/CD com GitHub Actions

## 📋 Pré-requisitos

- Node.js >= 18.0.0
- npm ou yarn
- Conta Firebase (gratuita em https://firebase.google.com)
- Git

## 🛠️ Setup Local

### 1. Clonar o repositório

```bash
git clone <seu-repositorio>
cd projeto-receitas
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Configurar Firebase

1. Crie um projeto no [Firebase Console](https://console.firebase.google.com)
2. Configure autenticação com Email/Senha
3. Crie um Firestore Database (modo produção)
4. Copie as credenciais do seu projeto

### 4. Criar arquivo .env.local

```bash
cp .env.example .env.local
```

Preencha as variáveis com as credenciais do Firebase:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_DATABASE_URL=your_database_url
```

### 5. Executar em desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

## 📦 Estrutura do Projeto

```
projeto-receitas/
├── src/
│   ├── components/          # Componentes reutilizáveis
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   ├── BookForm.jsx
│   │   ├── BookCard.jsx
│   │   ├── LoginForm.jsx
│   │   ├── RegisterForm.jsx
│   │   ├── Modal.jsx
│   │   ├── Alert.jsx
│   │   ├── Loading.jsx
│   │   ├── Header.jsx
│   │   └── ProtectedRoute.jsx
│   ├── pages/               # Páginas principais
│   │   ├── HomePage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── DashboardPage.jsx
│   │   └── NotFoundPage.jsx
│   ├── services/            # Lógica Firebase
│   │   ├── firebaseConfig.js
│   │   ├── authService.js
│   │   └── bookService.js
│   ├── context/             # State Management
│   │   ├── AuthContext.jsx
│   │   └── bookStore.js
│   ├── hooks/               # Custom Hooks
│   │   └── useAuth.js
│   ├── utils/               # Utilitários
│   │   ├── validators.js
│   │   └── helpers.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .github/
│   └── workflows/           # CI/CD Pipelines
│       ├── deploy-dev.yml
│       ├── deploy-prod.yml
│       └── code-quality.yml
├── public/
│   └── favicon.svg
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── index.html
└── README.md
```

## 🗄️ Estrutura do Banco de Dados (Firestore)

### Collection: books

```json
{
  "id": "unique_id",
  "userId": "user_uid",
  "name": "Nome do Livro",
  "quantity": 1,
  "category": "Ficção",
  "description": "Descrição opcional do livro",
  "createdAt": "2024-03-24T10:00:00Z",
  "updatedAt": "2024-03-24T10:00:00Z"
}
```

### Regras Firestore (firestore.rules)

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /books/{document=**} {
      allow read, write: if request.auth.uid == resource.data.userId;
      allow create: if request.auth.uid == request.resource.data.userId;
    }
  }
}
```

## 🔐 Segurança

### Autenticação
- Implementa Firebase Authentication com Email/Senha
- Senhas hash (gerenciadas automaticamente pelo Firebase)
- Proteção de rotas com verificação de autenticação

### Autorização
- Cada livro é associado ao usuário autenticado
- Regras Firestore garantem que cada usuário acesse apenas seus dados
- Sem acesso cruzado entre usuários

### Boas Práticas
- Variáveis de ambiente para credenciais
- Validação de formulários no frontend
- Sanitização de dados de entrada
- HTTPS obrigatório em produção

## 🚀 Deploy com GitHub Actions

### Configuração

1. Adicione os GitHub Secrets necessários:

#### Para Desenvolvimento (DEV):
```
DEV_FIREBASE_API_KEY
DEV_FIREBASE_AUTH_DOMAIN
DEV_FIREBASE_PROJECT_ID
DEV_FIREBASE_STORAGE_BUCKET
DEV_FIREBASE_MESSAGING_SENDER_ID
DEV_FIREBASE_APP_ID
DEV_FIREBASE_DATABASE_URL
FIREBASE_DEV_SERVICE_ACCOUNT_JSON
```

#### Para Produção (PROD):
```
PROD_FIREBASE_API_KEY
PROD_FIREBASE_AUTH_DOMAIN
PROD_FIREBASE_PROJECT_ID
PROD_FIREBASE_STORAGE_BUCKET
PROD_FIREBASE_MESSAGING_SENDER_ID
PROD_FIREBASE_APP_ID
PROD_FIREBASE_DATABASE_URL
FIREBASE_PROD_SERVICE_ACCOUNT_JSON
```

### Fluxo de Deploy

```
Branch dev → Firebase Dev Hosting (URL: <project>-dev.web.app)
                ↓
        Pull Request (Code Quality Check)
                ↓
Branch main → Firebase Prod Hosting (URL: <project>.web.app)
```

### Para obter Firebase Service Account JSON:

1. No Firebase Console → Project Settings → Service Accounts
2. Clique em "Generate a new private key"
3. Copie o JSON completo e adicione como GitHub Secret

## 📝 Scripts Disponíveis

```bash
# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview

# Lint (se configurado)
npm run lint
```

## 🆚 Diferenças entre Dev e Prod

### Desenvolvimento
- Analytics desabilitado (conserva quota free tier)
- Regras Firestore mais permissivas para testes
- URL: `https://<project>-dev.web.app`

### Produção
- Analytics habilitado
- Regras Firestore restritas (apenas dados do usuário)
- URL: `https://<project>.web.app`

## 📚 Categorias de Livros

Categorias pré-configuradas:
- Ficção
- Não-ficção
- Mistério
- Romance
- Fantasia
- Técnico
- Infantil
- Educativo
- Outro

## 🎯 Funcionalidades Implementadas

### ✅ Autenticação
- [x] Cadastro de usuários
- [x] Login com email e senha
- [x] Logout
- [x] Proteção de rotas
- [x] Persistência de sessão

### ✅ CRUD de Livros
- [x] Criar novo livro
- [x] Listar livros do usuário
- [x] Editar livro existente
- [x] Deletar livro
- [x] Persistência em Firestore

### ✅ Filtros e Busca
- [x] Busca por nome/descrição
- [x] Filtro por categoria
- [x] Ordenação (data, nome, categoria, quantidade)
- [x] Estatísticas (total livros, exemplares, categorias)

### ✅ Interface
- [x] Design responsivo
- [x] Componentes reutilizáveis
- [x] Feedback visual (loading, erros, sucesso)
- [x] Modal para formulários
- [x] Validação de formulários

### ✅ Deploy
- [x] GitHub Actions CI/CD
- [x] Deploy automático dev/main
- [x] Verificação de qualidade do código

## 🔄 Arquitetura de State Management

### Context API (Autenticação)
```jsx
<AuthContext>
  - user
  - loading
</AuthContext>
```

### Zustand (Livros)
```javascript
useBookStore
  - books: []
  - loading: boolean
  - error: string
  - fetchBooks()
  - addBook()
  - updateBook()
  - deleteBook()
  - fetchBooksByCategory()
```

## 🧪 Testando Localmente

1. Crie um usuário de teste no Firebase Console
2. Use os mesmos dados para fazer login
3. Adicione alguns livros manualmente
4. Teste os filtros e ordenações

## 📱 Responsividade

- **Desktop**: Layout grid com 3 colunas
- **Tablet**: Layout grid com 2 colunas
- **Mobile**: Layout stack com 1 coluna

## 🐛 Troubleshooting

### "Firebase configuration missing"
- Verifique o arquivo `.env.local` com as credenciais corretas

### "Permission denied" ao manipular livros
- Verifique se as regras Firestore estão ativas
- Verifique se o usuário está autenticado

### Build fail no GitHub Actions
- Verifique se todos os secrets estão configurados
- Verifique a sintaxe do arquivo YAML

## 🤝 Contribuindo

1. Faça fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request para `dev`

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para detalhes.

## 📞 Suporte

Para suporte, abra uma issue no GitHub repositório.

## 🙏 Agradecimentos

- React.js
- Firebase
- Tailwind CSS
- Zustand
- Vite

---

**Desenvolvido com ❤️ para gerenciar sua biblioteca pessoal**

Última atualização: 24 de Março de 2026
