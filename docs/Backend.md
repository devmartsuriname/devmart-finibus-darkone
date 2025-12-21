# Backend Specification — Devmart Platform

**Status:** Draft  
**Phase:** Planning Only  
**Execution:** Not Authorized  

---

## 1. Current State — Demo Backend

### 1.1 Overview

The Darkone admin template includes a demo backend for authentication simulation. This is **not a real backend** and is intended for template demonstration only.

### 1.2 Demo Authentication Components

| Component | File | Purpose |
|-----------|------|---------|
| Mock Adapter | `src/helpers/fake-backend.ts` | Axios interceptor for fake API |
| Auth Context | `src/context/useAuthContext.tsx` | Session state management |
| Auth Hook | `src/hooks/useAuth.ts` | Authentication helpers |

### 1.3 Demo Implementation Details

#### fake-backend.ts

```typescript
// Mock adapter intercepts axios requests
const mock = new MockAdapter(axios)

// Hardcoded demo users
const fakeUsers = [
  { id: '1', email: 'user@demo.com', password: '123456', role: 'User' },
  { id: '2', email: 'admin@demo.com', password: '123456', role: 'Admin' }
]

// Mock login endpoint
mock.onPost('/login').reply(...)
```

#### Session Storage

- **Key:** `_DARKONE_AUTH_KEY_`
- **Storage:** Cookies (via `cookies-next`)
- **Content:** User object JSON

### 1.4 Demo Limitations

| Limitation | Impact |
|------------|--------|
| No persistence | Data lost on refresh |
| No real validation | Any matching credentials work |
| No password hashing | Plain text comparison |
| No token refresh | Static JWT |
| No role enforcement | Client-side only |

---

## 2. Future State — Supabase Backend

> **STATUS: Planned — Not Implemented**

### 2.1 Planned Architecture

```
┌─────────────────┐     ┌─────────────────┐
│  Public App     │     │  Admin App      │
│  (Finibus)      │     │  (Darkone)      │
└────────┬────────┘     └────────┬────────┘
         │                       │
         └───────────┬───────────┘
                     │
              ┌──────▼──────┐
              │  Supabase   │
              │  Cloud      │
              └──────┬──────┘
                     │
    ┌────────────────┼────────────────┐
    │                │                │
┌───▼───┐      ┌─────▼─────┐    ┌─────▼─────┐
│ Auth  │      │ Database  │    │ Storage   │
└───────┘      └───────────┘    └───────────┘
```

### 2.2 Supabase Auth

> **STATUS: Planned — Not Implemented**

| Feature | Description |
|---------|-------------|
| Email/Password | Standard authentication |
| Magic Links | Passwordless option |
| OAuth | Google, GitHub (optional) |
| Session Management | JWT with refresh tokens |
| Role-Based Access | Admin vs User roles |

### 2.3 Supabase Database

> **STATUS: Planned — Not Implemented**

| Table | Purpose |
|-------|---------|
| `profiles` | User profile data |
| `leads` | Contact form submissions |
| `blog_posts` | Blog content (if CMS) |
| `projects` | Portfolio items (if CMS) |

### 2.4 Supabase Storage

> **STATUS: Planned — Not Implemented**

| Bucket | Purpose |
|--------|---------|
| `public` | Public website assets |
| `private` | Admin-only files |
| `uploads` | User uploads |

### 2.5 Edge Functions

> **STATUS: Planned — Not Implemented**

| Function | Purpose |
|----------|---------|
| `send-email` | Contact form notifications |
| `webhook-handler` | Third-party integrations |

---

## 3. Migration Plan

> **STATUS: Planned — Not Implemented**

### 3.1 Phase 1 — Preparation

- [ ] Enable Lovable Cloud / Supabase
- [ ] Design database schema
- [ ] Define RLS policies
- [ ] Create migration scripts

### 3.2 Phase 2 — Authentication

- [ ] Replace `fake-backend.ts` with Supabase client
- [ ] Update `useAuthContext.tsx` for Supabase auth
- [ ] Implement login/logout flows
- [ ] Add session persistence
- [ ] Test auth flows

### 3.3 Phase 3 — Data Layer

- [ ] Create database tables
- [ ] Implement CRUD operations
- [ ] Add data validation
- [ ] Configure RLS policies

### 3.4 Phase 4 — Storage

- [ ] Configure storage buckets
- [ ] Implement file upload
- [ ] Add access controls

---

## 4. API Design

> **STATUS: Planned — Not Implemented**

### 4.1 Authentication Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/auth/login` | POST | User login |
| `/auth/logout` | POST | User logout |
| `/auth/register` | POST | User registration |
| `/auth/reset-password` | POST | Password reset |
| `/auth/refresh` | POST | Token refresh |

### 4.2 Data Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/leads` | GET/POST | Lead management |
| `/api/content` | GET/POST/PUT/DELETE | Content management |
| `/api/uploads` | POST | File uploads |

---

## 5. Security Requirements

> **STATUS: Planned — Not Implemented**

| Requirement | Implementation |
|-------------|----------------|
| Authentication | Supabase Auth |
| Authorization | Row Level Security |
| Data validation | Server-side + Client-side |
| Rate limiting | Edge function middleware |
| CORS | Configured per environment |
| HTTPS | Enforced in production |

---

## 6. Environment Configuration

> **STATUS: Planned — Not Implemented**

### 6.1 Required Variables

```env
# Supabase Connection
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbG...

# Optional
VITE_API_BASE_URL=
VITE_ENVIRONMENT=development|staging|production
```

### 6.2 Secret Management

- API keys stored in Lovable Secrets
- Never committed to repository
- Environment-specific values

---

## 7. Explicit Non-Implementation Notice

The following items are **explicitly NOT IMPLEMENTED** and require separate authorization:

| Item | Status |
|------|--------|
| Supabase project creation | ❌ Not Implemented |
| Database tables | ❌ Not Implemented |
| RLS policies | ❌ Not Implemented |
| Auth provider configuration | ❌ Not Implemented |
| Edge functions | ❌ Not Implemented |
| Storage buckets | ❌ Not Implemented |
| API integrations | ❌ Not Implemented |

---

## Document Control

| Version | Date | Author | Notes |
|---------|------|--------|-------|
| 0.1 | 2025-01-XX | Planning Agent | Initial draft |

**Next Review:** After Phase 3 execution approval
