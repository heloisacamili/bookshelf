# Setup de Ambientes Firebase + GitHub Actions

Este projeto esta preparado para usar:

- branch `dev` -> ambiente de desenvolvimento/homologacao
- branch `main` -> ambiente de producao

## 1. Criar os dois projetos Firebase

Garanta que voce tenha dois projetos separados:

- um projeto Firebase para `dev`
- um projeto Firebase para `prod`

Cada projeto deve ter, no minimo:

- Authentication habilitado
- Firestore criado
- Hosting habilitado

## 2. Criar a Web App em cada projeto

Dentro de cada projeto Firebase:

1. Acesse `Project settings`
2. Clique em `Add app` > `Web`
3. Copie as credenciais do app

Esses valores serao usados como secrets no GitHub.

## 3. Criar Service Account para deploy

Em cada projeto Firebase:

1. Acesse `Project settings`
2. Abra a aba `Service accounts`
3. Clique em `Generate new private key`
4. Guarde o JSON completo

Voce vai adicionar um JSON para `dev` e outro para `prod`.

## 4. Configurar GitHub Secrets

No GitHub, abra:

`Settings` -> `Secrets and variables` -> `Actions`

Cadastre estes secrets para desenvolvimento:

- `DEV_FIREBASE_API_KEY`
- `DEV_FIREBASE_AUTH_DOMAIN`
- `DEV_FIREBASE_PROJECT_ID`
- `DEV_FIREBASE_STORAGE_BUCKET`
- `DEV_FIREBASE_MESSAGING_SENDER_ID`
- `DEV_FIREBASE_APP_ID`
- `DEV_FIREBASE_DATABASE_URL`
- `FIREBASE_DEV_SERVICE_ACCOUNT_JSON`

Cadastre estes secrets para producao:

- `PROD_FIREBASE_API_KEY`
- `PROD_FIREBASE_AUTH_DOMAIN`
- `PROD_FIREBASE_PROJECT_ID`
- `PROD_FIREBASE_STORAGE_BUCKET`
- `PROD_FIREBASE_MESSAGING_SENDER_ID`
- `PROD_FIREBASE_APP_ID`
- `PROD_FIREBASE_DATABASE_URL`
- `FIREBASE_PROD_SERVICE_ACCOUNT_JSON`

## 5. Fluxo automatico configurado

Os workflows ficaram assim:

- push na branch `dev` -> build e deploy no Firebase de desenvolvimento
- push na branch `main` -> build e deploy no Firebase de producao
- pull request para `dev` ou `main` -> lint e build de validacao

Tambem foi habilitado `workflow_dispatch`, entao voce pode rodar manualmente pelo GitHub Actions quando precisar.

## 6. Ambiente local

Use um arquivo local baseado em [.env.example](C:\Users\Rosane\Documents\projeto receitas\.env.example).

Sugestao:

- `.env.local` para trabalhar localmente apontando para `dev`
- nao versionar credenciais reais no repositorio

## 7. Checklist final

Antes de testar o pipeline:

1. Confirme que a branch `dev` ja existe no GitHub
2. Confirme que a branch `main` continua como producao
3. Cadastre todos os secrets
4. Faça um push simples na `dev`
5. Verifique o workflow `Deploy to Firebase Hosting (Development)`
6. Depois faça merge para `main`
7. Verifique o workflow `Deploy to Firebase Hosting (Production)`

## 8. Observacao importante

Hoje o repositorio tinha arquivos de ambiente locais apontando para `dev`. O ideal daqui para frente e manter credenciais reais apenas em:

- GitHub Secrets
- arquivos locais ignorados pelo Git

Assim o pipeline fica seguro e reproduzivel.
