# Backend Specification — Devmart Platform

```
Status: AUTHORITATIVE
Phase: Phase 3 Alignment Complete
Execution: Documentation Only — Build Not Authorized
Last Updated: 2025-12-21
```

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

### 1.5 Phase 3 Status

- Demo auth remains **ACTIVE**
- No modifications to demo backend
- No Supabase integration
- Auth migration is later phase scope

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

| Table | Purpose | Phase 3 Status |
|-------|---------|----------------|
| `profiles` | User profile data | Not created |
| `leads` | Contact form submissions | Not created |
| `blog_posts` | Blog content | Not created |
| `projects` | Portfolio items | Not created |
| `pages` | Static page content | Not created |
| `media` | Media library entries | Not created |
| `testimonials` | Testimonial content | Not created |
| `settings` | System settings | Not created |

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

## 3. Devmart Admin Modules — Data Requirements

### 3.1 Phase 3 (Placeholder Only)

| Module | Data Requirement | Phase 3 Status |
|--------|------------------|----------------|
| Dashboard | No data | Placeholder only |
| Blog | No data | Empty table |
| Projects | No data | Empty table |
| Pages | No data | Empty table |
| Media | No data | Empty grid |
| Testimonials | No data | Empty table |
| Leads | No data | Empty table |
| Analytics | No data | Placeholder only |
| Settings | No data | Placeholder only |

### 3.2 Later Phase (Data Layer)

| Module | Table(s) | CRUD Operations |
|--------|----------|-----------------|
| Blog | `blog_posts` | Create, Read, Update, Delete |
| Projects | `projects` | Create, Read, Update, Delete |
| Pages | `pages`, `sections` | Create, Read, Update, Delete |
| Media | `media` | Create, Read, Delete |
| Testimonials | `testimonials` | Create, Read, Update, Delete |
| Leads | `leads` | Read, Update, Export |
| Settings | `settings` | Read, Update |

---

## 4. Migration Plan

> **STATUS: Planned — Not Implemented**

### 4.1 Phase 1 — Preparation

- [ ] Enable Lovable Cloud / Supabase
- [ ] Design database schema
- [ ] Define RLS policies
- [ ] Create migration scripts

### 4.2 Phase 2 — Authentication

- [ ] Replace `fake-backend.ts` with Supabase client
- [ ] Update `useAuthContext.tsx` for Supabase auth
- [ ] Implement login/logout flows
- [ ] Add session persistence
- [ ] Test auth flows

### 4.3 Phase 3 — Data Layer

- [ ] Create database tables
- [ ] Implement CRUD operations
- [ ] Add data validation
- [ ] Configure RLS policies

### 4.4 Phase 4 — Storage

- [ ] Configure storage buckets
- [ ] Implement file upload
- [ ] Add access controls

---

## 5. API Design

> **STATUS: Optional / Conceptual — Not Implemented**
>
> **Supabase-first is assumed; custom API is not assumed.**

### 5.1 Authentication Endpoints (Conceptual)

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/auth/login` | POST | User login |
| `/auth/logout` | POST | User logout |
| `/auth/register` | POST | User registration |
| `/auth/reset-password` | POST | Password reset |
| `/auth/refresh` | POST | Token refresh |

### 5.2 Data Endpoints (Conceptual)

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/leads` | GET/POST | Lead management |
| `/api/content` | GET/POST/PUT/DELETE | Content management |
| `/api/uploads` | POST | File uploads |

> These endpoints are conceptual only. Supabase client SDK will be used directly where possible.

---

## 6. Security Requirements

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

## 7. Environment Configuration

> **STATUS: Planned — Not Implemented**

### 7.1 Required Variables

```env
# Supabase Connection
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbG...

# Optional
VITE_API_BASE_URL=
VITE_ENVIRONMENT=development|staging|production
```

### 7.2 Secret Management

- API keys stored in Lovable Secrets
- Never committed to repository
- Environment-specific values

---

## 8. Explicit Exclusions

### 8.1 Permanently Excluded

| Item | Reason |
|------|--------|
| Client Portal Backend | Not in project scope |
| Public User Authentication | Not in project scope |
| Team Management Backend | Not in project scope |

### 8.2 Phase 3 Excluded

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
| 1.0 | 2025-12-21 | Planning Agent | Phase 3 alignment complete |

**Next Review:** After Phase 3 build authorization
