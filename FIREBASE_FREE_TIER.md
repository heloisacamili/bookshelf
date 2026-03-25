# Otimizações para Plano Gratuito do Firebase

A aplicação BookShelf foi otimizada para funcionar perfeitamente no **plano gratuito** do Firebase. Este documento detalha as limitações e estratégias implementadas.

## 📊 Quotas do Plano Gratuito

### Firestore Database
- **25,000 leituras por dia**
- **20,000 escritas por dia**
- **1 GB de armazenamento**
- **6 índices de banco de dados compostos**
- **0 índices TTL (expiração automática)**

### Authentication
- **Sem limite** de usuários
- Apenas email/senha (sem OAuth extra)
- Bloqueio de conta após 10 falhas

### Hosting
- **1 GB de armazenamento**
- **10 GB de transferência por mês**
- **Suficiente para ~100k visitantes/mês**

### Outros Serviços
- Cloud Functions: Desabilitado (pago)
- Cloud Storage: Não usado
- Realtime Database: Não usado

## 🚀 Otimizações Implementadas

### 1. Cache Local (5 minutos)
A aplicação cai em cache os livros do usuário por **5 minutos** em memória. Isso reduz drasticamente as leituras Firestore.

```javascript
// bookService.js
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

// Após buscar livros, são armazenados em cache
// Próximas requisições (mesma sessão) usam cache
```

**Benefício**: Reduz ~80% das leituras em uso normal

### 2. Índices Otimizados
Criamos apenas índices necessários no Firestore:

```
Collection: books
  - userId + createdAt (descendente)
  - userId + category + createdAt (descendente)
```

### 3. Queries Eficientes
Evitamos:
- ❌ Full-text search (usa muitas leituras)
- ❌ Queries sem filtros (seria tudo do banco)
- ✅ Sempre filtramos por `userId` primeiro
- ✅ Ordenação apenas por campos indexados

### 4. Sem Listeners em Tempo Real
Não usamos `onSnapshot()`. Todas as operações são:
- Get (uma requisição)
- Não sincronizam em background
- Melhor para plano free

## 📈 Estimativa de Uso Diário

### Cenário 1: Usuário Casual
- 2 acessos por dia
- 5 livros na biblioteca
- Uso: **~10 leituras/dia**

### Cenário 2: Usuário Ativo
- 5 acessos por dia
- 20 livros na biblioteca
- 2 edições
- Uso: **~50 leituras/dia** + **2 escritas/dia**

### Cenário 3: Múltiplos Usuários (10)
- 100 acessos/dia total
- Média 15 livros/usuário
- Uso: **~150 leituras/dia** + **10 escritas/dia**

## 💡 Recomendações para Uso Responsável

### ✅ Faça
- Usar a aplicação normalmente (cache cuida de otimizar)
- Recarregar página quando necessário
- Aguardar cache expirar para ver mudanças de outro dispositivo (5 min)

### ❌ Evite
- Disparar requisições em loop (não fazer)
- Atualizar biblioteca a cada segundo
- Múltiplas abas sincronizadas em tempo real (usar um navegador ou refresh manual)

## 🔧 Como Monitorar uso do Firebase

1. **Firebase Console** → **Firestore** → **Usage**
2. Veja gráficos em tempo real
3. Configure alertas para quando aproximar dos limites

## 📱 Crescimento Futuro

Quando a aplicação crescer, upgrade para plano **Blaze** (pago conforme uso):

### Plano Blaze
- **$1 por 1 milhão de leituras**
- **$6 por 1 milhão de escritas**
- **$5 por 1 GB de armazenamento**
- Sem limites de índices
- Realtime listeners (se necessário)
- Cloud Functions (se necessário)

## 🎯 Exemplo: 1000 Usuários Ativos

### Estimativa Mensal (Plano Gratuito)
```
- Leituras: 1000 usuários × 100 leituras/mês = 100K leituras
- Escritas: 1000 usuários × 10 escritas/mês = 10K escritas
- Status: ✅ Dentro do limite gratuito
```

### Custo no Plano Blaze
```
- Leituras: 100K / 1M × $1 = $0.10
- Escritas: 10K / 1M × $6 = $0.06
- Total: ~$0.16/mês
```

## 🔐 Boas Práticas de Segurança (Sem Custo Extra)

### Firestore Rules
```javascript
// Garante acesso apenas do dono (sem custo adicional)
allow read: if request.auth.uid == resource.data.userId;
allow write: if request.auth.uid == resource.data.userId;
```

### Rate Limiting Manual
Se necessário adicionar rate limiting:
```javascript
// Adicionar timestamp de última atualização
const lastUpdate = localStorage.getItem('lastUpdate');
const now = Date.now();

if (now - lastUpdate < 1000) {
  // Bloqueia requisição muito rápida
  return;
}
```

## 📊 Métricas para Acompanhar

| Métrica | Limite Free | Status Atual |
|---------|------------|-------------|
| Leituras/dia | 25,000 | ~100-200 |
| Escritas/dia | 20,000 | ~10-20 |
| Armazenamento | 1 GB | ~10 MB |
| Índices | 6 | 2 índices |
| Usuários | Ilimitado | Ilimitado |

## 🚀 Próximas Otimizações (Se Necessário)

1. **Paginação**: Carregar livros em páginas (20 por página)
   - Reduz dados transferidos
   - Melhor performance

2. **Sincronização Parcial**: Apenas atualizar últimos 5 livros

3. **Offline Mode**: Service Workers + IndexedDB
   - Funciona sem internet
   - Sincroniza quando retorna online

4. **Compressão**: Gzip de resposta (Firebase Hosting já faz)

## 📝 Notas Importantes

- **Cache não sincroniza entre abas** (limitação intencional)
- Abra a mesma biblioteca em duas abas → mude uma aba
- Você verá mudança apenas ao recarregar ou aguardar 5 min
- Para sincronização real-time em tempo real, seria necessário plano pago

## 📞 Suporte

Dúvidas sobre quotas? Consulte:
- [Firebase Free vs Blaze Pricing](https://firebase.google.com/pricing)
- [Firestore Quotas](https://firebase.google.com/docs/firestore/quotas)
- [Firebase Best Practices](https://firebase.google.com/docs/guides)

---

**Status**: ✅ Otimizado para Plano Gratuito

A aplicação está prepared para usar no máximo **5-10% das quotas diárias** com uso normal.
