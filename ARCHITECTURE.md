# Arquitetura e Estrutura Técnica

## Visão Geral

BookShelf é uma Single Page Application (SPA) construída com React e Vite, usando Firebase como backend e Zustand + Context API para gerenciamento de estado.

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (React/Vite)                     │
│  ┌──────────────────────────────────────────────────────┐   │
│  │          Pages (Login, Dashboard, etc)               │   │
│  ├──────────────────────────────────────────────────────┤   │
│  │          Components (Reutilizáveis)                  │   │
│  ├──────────────────────────────────────────────────────┤   │
│  │  Context API (Auth) + Zustand (Books)                │   │
│  ├──────────────────────────────────────────────────────┤   │
│  │  Services (Firebase) + Hooks + Utils                 │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                      Firebase Backend                        │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Authentication (Email/Password)                     │   │
│  ├──────────────────────────────────────────────────────┤   │
│  │  Firestore Database (Collection: books)              │   │
│  ├──────────────────────────────────────────────────────┤   │
│  │  Hosting (Web App)                                   │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## Stack Tecnológico

### Frontend
- **React 18** - UI Library
- **Vite** - Build tooling (rápido e moderno)
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Styling utilitário
- **Zustand** - State management (books)
- **Context API** - State management (auth)

### Backend
- **Firebase Authentication** - Autenticação
- **Cloud Firestore** - Banco de dados NoSQL
- **Firebase Hosting** - Hospedagem web

### CI/CD
- **GitHub Actions** - Automação de deploy
- **Firebase CLI** - Deploy para Firebase

## Fluxo de Dados

### Autenticação
```
LoginForm
   ↓
authService.loginUser()
   ↓
Firebase Auth
   ↓
AuthContext (useAuth hook)
   ↓
ProtectedRoute → DashboardPage
```

### Livros (CRUD)
```
BookForm → bookService.addBook() / updateBook()
   ↓
Firestore (collection: books)
   ↓
bookStore (Zustand) → useBookStore()
   ↓
DashboardPage (renderiza BookCard)
```

## Estrutura em Camadas

### Presentation Layer (Componentes)
- Pages (telas completas)
- Components (elementos reutilizáveis)
- Hooks customizados

### Business Logic Layer
- Services (Firebase calls)
- Store (Zustand)
- Context (Auth)

### Data/Infrastructure Layer
- Firebase Configuration
- Validators e Utils

## Padrões Utilizados

### 1. Componentes Funcionais + Hooks
```javascript
// Bom ✓
export const BookCard = ({ book, onEdit }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return <div>...</div>;
};

// Evitar ✗
class BookCard extends Component { }
```

### 2. Custom Hooks
```javascript
// Bom ✓
export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};

// Uso
const { user } = useAuth();
```

### 3. Controlled Components
```javascript
// Bom ✓
const [formData, setFormData] = useState({ name: '' });
<input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />

// Evitar ✗
<input defaultValue="..." /> // Uncontrolled
```

### 4. Zustand Store
```javascript
// Bom ✓
const store = useBookStore((state) => ({
  books: state.books,
  addBook: state.addBook
}));

// Ou com destructuring
const { books, addBook } = useBookStore();
```

### 5. Error Handling
```javascript
// Bom ✓
try {
  await bookService.addBook(data);
} catch (error) {
  const message = getErrorMessage(error);
  setError(message);
}
```

## Performance

### Code Splitting
- Cada página é um componente separado (lazy loading automático no Vite)

### Image Optimization
- SVG para ícones
- No images para não aumentar bundle

### CSS
- Tailwind purga CSS não utilizado
- Tipicamente < 50KB gzipped

### Bundle Size
```
npm run build
# Espera-se:
# dist/index.html                    XX KB
# dist/assets/main.XXXXX.js          XXX KB
# dist/assets/main.XXXXX.css         XX KB
```

## Segurança

### Frontend
- Validação de formulários
- Sanitização de inputs
- HTTPS em produção
- Sem armazenamento de senhas

### Firebase
- Auth gerencia criptografia
- Firestore rules restringem acesso
- Ambiente dev isolado de prod

## Escalabilidade

### Melhorias Futuras
1. **Paginação** - Para lista grande de livros
2. **Busca Full-text** - Elasticsearch ou Algolia
3. **Cloud Functions** - Para lógica serverless
4. **Storage** - Para upload de capas/imagens
5. **Notifications** - FCM para notificações
6. **Offline Support** - Service Workers + IndexedDB
7. **Dark Mode** - Toggle com Tailwind
8. **Exportação** - PDF, CSV dos livros
9. **Backup** - Export/Import dados
10. **Integração** - API do Google Books

## Estrutura de Pastas Detalhada

```
src/
├── App.jsx                 # Root component com Routes
├── main.jsx               # Entry point (Vite)
├── index.css              # Tailwind + estilos globais
│
├── pages/
│   ├── HomePage.jsx       # Landing page
│   ├── LoginPage.jsx      # Login (público)
│   ├── RegisterPage.jsx   # Registro (público)
│   ├── DashboardPage.jsx  # Biblioteca (protegido)
│   └── NotFoundPage.jsx   # 404
│
├── components/
│   ├── Layout/
│   │   ├── Header.jsx     # Navbar
│   │   └── Container.jsx  # Max-width wrapper
│   ├── Forms/
│   │   ├── LoginForm.jsx
│   │   ├── RegisterForm.jsx
│   │   └── BookForm.jsx
│   ├── UI/
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   ├── Textarea.jsx
│   │   ├── Select.jsx
│   │   ├── Modal.jsx
│   │   ├── Alert.jsx
│   │   └── Loading.jsx
│   ├── Books/
│   │   └── BookCard.jsx
│   ├── Auth/
│   │   └── ProtectedRoute.jsx
│   └── index.js           # Barrel exports (opcional)
│
├── context/
│   ├── AuthContext.jsx    # Context provider
│   └── bookStore.js       # Zustand store
│
├── services/
│   ├── firebaseConfig.js  # Firebase init
│   ├── authService.js     # Auth functions
│   └── bookService.js     # Firestore functions
│
├── hooks/
│   ├── useAuth.js         # Auth context hook
│   └── useBooks.js        # (opcional) Books hook
│
└── utils/
    ├── validators.js      # Form validation
    └── helpers.js         # Utility functions
```

## Convenções de Código

### Naming
```javascript
// Components
const UserButton = () => { }        // PascalCase

// Variables/Functions
const isOpen = true;                // camelCase
const getUserBooks = () => { }      // camelCase

// Constants
const BOOK_CATEGORIES = [ ]         // UPPER_SNAKE_CASE

// Private functions
const _helper = () => { }           // Underscore prefix (opcional)
```

### Imports
```javascript
// Ordem:
// 1. React
// 2. Libraries
// 3. Components
// 4. Services
// 5. Hooks
// 6. Utils
// 7. Types/Constants

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookCard } from '@/components/BookCard';
import { addBook } from '@/services/bookService';
import { useAuth } from '@/hooks/useAuth';
import { validateBook } from '@/utils/validators';
```

### Exports
```javascript
// Preferir named exports
export const Button = (props) => { };
export const useAuth = () => { };

// Default export apenas para Pages
export default HomePage;
```

## Testing (Plano Futuro)

```bash
npm install --save-dev vitest @testing-library/react

# Estrutura
tests/
├── __mocks__/               # Mock data
├── __fixtures__/            # Test fixtures
├── unit/                    # Testes unitários
├── integration/             # Testes integração
└── e2e/                     # Testes E2E (Cypress/Playwright)
```

## Debugging

### No Editor
```javascript
debugger; // Breakpoint
console.log(var); // Logging
```

### DevTools
- Chrome DevTools (F12)
- React DevTools extension
- Redux DevTools (via Zustand)

### Firebase
```bash
firebase emulators:start     # Local testing
firebase use development     # Switch project
```

---

**Última atualização**: Março 2026
