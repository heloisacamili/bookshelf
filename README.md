# BookShelf

Aplicacao web em React com Firebase para autenticacao, persistencia no Firestore e deploy automatizado com GitHub Actions.

## URLs do projeto

- Deploy dev: `https://projeto-receitas-dev.web.app`
- Deploy prod: `https://projeto-receitas-2ae39.web.app`
- Repositorio Git: `https://github.com/heloisacamili/bookshelf`

## Visao geral

Hoje o projeto esta organizado com dois ambientes Firebase:

- `dev` -> projeto Firebase `projeto-receitas-dev`
- `main` -> projeto Firebase `projeto-receitas-2ae39`

Fluxo de deploy:

- push em `dev` -> deploy automatico no Firebase de desenvolvimento
- push em `main` -> deploy automatico no Firebase de producao
- pull request para `dev` ou `main` -> validacao de lint e build

## Stack

- React
- Vite
- Firebase Auth
- Cloud Firestore
- Firebase Hosting
- Zustand
- Tailwind CSS
- GitHub Actions

## Setup local

1. Instale as dependencias:

```bash
npm install
```

2. Crie um arquivo `.env.local` com base em [.env.example](.env.example).

3. Preencha as variaveis do Firebase:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_DATABASE_URL=https://your-project-default-rtdb.firebaseio.com/
```

4. Rode o projeto:

```bash
npm run dev
```

## Scripts

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

## Ambientes

### Desenvolvimento

- Branch: `dev`
- Firebase project id: `projeto-receitas-dev`
- Workflow: [.github/workflows/deploy-dev.yml](.github/workflows/deploy-dev.yml)

### Producao

- Branch: `main`
- Firebase project id: `projeto-receitas-2ae39`
- Workflow: [.github/workflows/deploy-prod.yml](.github/workflows/deploy-prod.yml)

### Qualidade

- Pull requests para `dev` e `main`
- Workflow: [.github/workflows/code-quality.yml](.github/workflows/code-quality.yml)

## GitHub Secrets necessarios

### DEV

- `DEV_FIREBASE_API_KEY`
- `DEV_FIREBASE_AUTH_DOMAIN`
- `DEV_FIREBASE_PROJECT_ID`
- `DEV_FIREBASE_STORAGE_BUCKET`
- `DEV_FIREBASE_MESSAGING_SENDER_ID`
- `DEV_FIREBASE_APP_ID`
- `DEV_FIREBASE_DATABASE_URL`
- `FIREBASE_DEV_SERVICE_ACCOUNT_JSON`

### PROD

- `PROD_FIREBASE_API_KEY`
- `PROD_FIREBASE_AUTH_DOMAIN`
- `PROD_FIREBASE_PROJECT_ID`
- `PROD_FIREBASE_STORAGE_BUCKET`
- `PROD_FIREBASE_MESSAGING_SENDER_ID`
- `PROD_FIREBASE_APP_ID`
- `PROD_FIREBASE_DATABASE_URL`
- `FIREBASE_PROD_SERVICE_ACCOUNT_JSON`

O detalhamento do setup esta em [GITHUB_ACTIONS_ENV_SETUP.md](GITHUB_ACTIONS_ENV_SETUP.md).

## Estrutura principal

```text
src/
  components/
  context/
  hooks/
  pages/
  services/
  utils/
.github/workflows/
firestore.rules
firebase.json
```

## Banco de dados

O app usa:

- Firebase Authentication para login e cadastro
- Cloud Firestore para os dados principais
- Realtime Database apenas para a URL de ambiente configurada no pipeline

Colecao principal atual:

- `books`

## Proximos passos recomendados

- testar um push na branch `dev`
- validar o deploy no Firebase `projeto-receitas-dev`
- fazer merge para `main`
- validar o deploy no Firebase `projeto-receitas-2ae39`
- adaptar a base de "livros" para "receitas", se esse continuar sendo o objetivo do produto
