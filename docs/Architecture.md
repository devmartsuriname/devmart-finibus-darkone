# Architecture — Devmart Platform

**Status:** Draft  
**Phase:** Planning Only  
**Execution:** Not Authorized  

---

## 1. Current Repository Structure (As-Is)

```
/
├── Darkone-React_v1.0/      # Admin template (running, demo state)
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.ts
│
├── finibus/                  # Public template (baseline imported)
│   ├── src/
│   ├── public/
│   └── package.json
│
├── src/                      # Lovable wrapper (entry point)
│
├── docs/                     # Documentation (this directory)
└── README.md
```

> **No restructuring is approved in any phase unless explicitly authorized.**

---

## 2. Future Target Structure (Optional — Not Authorized)

The following structure is a conceptual target only. It is **NOT AUTHORIZED** for implementation.

```
devmart/
├── apps/
│   ├── public/          # Finibus-based public website
│   │   ├── src/
│   │   ├── public/
│   │   ├── package.json
│   │   └── vite.config.ts
│   │
│   └── admin/           # Darkone-based admin portal
│       ├── src/
│       ├── public/
│       ├── package.json
│       └── vite.config.ts
│
├── docs/                # Documentation
├── package.json         # Root workspace config
└── README.md
```

> **STATUS: This structure is conceptual only. No migration or restructuring is authorized.**

---

## 3. Application Isolation

### 3.1 Build Isolation (Current State)

| Aspect | Public App (Finibus) | Admin App (Darkone) |
|--------|----------------------|---------------------|
| Location | `/finibus/` | `/Darkone-React_v1.0/` |
| Entry point | `finibus/src/main.tsx` | `Darkone-React_v1.0/src/main.tsx` |
| Dev port | TBD | 8080 |
| Base path | `/` | `/admin` (TBD) |

### 3.2 Dependency Isolation

- Each app maintains its own `package.json`
- No shared runtime dependencies
- No cross-app imports
- Shared tooling only at root level (if needed)

---

## 4. SCSS Isolation Rules

### 4.1 Strict Separation (Current Paths)

```
finibus/src/assets/scss/              # Finibus styles ONLY
Darkone-React_v1.0/src/assets/scss/   # Darkone styles ONLY
```

### 4.2 Prohibited Actions

- ❌ No cross-importing SCSS between apps
- ❌ No shared SCSS tokens or variables
- ❌ No Bootstrap version mixing
- ❌ No custom theme modifications

### 4.3 Rationale

- Finibus uses its own Bootstrap customization
- Darkone uses its own Bootstrap customization
- Mixing creates specificity conflicts
- Template updates become impossible

---

## 4. Routing Isolation

### 4.1 Public App Routes

```
/                   # Homepage
/about              # About page
/services           # Services page
/projects           # Projects page
/blog               # Blog listing
/blog/:slug         # Blog detail
/contact            # Contact page
```

### 4.2 Admin App Routes

```
/admin              # Dashboard (redirects to /admin/dashboards) — TBD
/admin/dashboards   # Main dashboard — TBD
/admin/auth/*       # Authentication pages — TBD
/admin/*            # Other admin modules — TBD
```

> **Note:** Admin base path (`/admin`) and `/admin/auth/*` routing are TBD.
> 
> **No routing/basepath changes authorized in Phase 2.**

### 4.3 No Cross-Navigation

- Public app never links to admin routes
- Admin app never links to public routes
- Separate session management

---

## 5. Authentication Boundary

### 5.1 Current State (Demo)

**Darkone Admin Only:**

| Component | Location | Purpose |
|-----------|----------|---------|
| `fake-backend.ts` | `src/helpers/` | Axios mock adapter |
| `useAuthContext.tsx` | `src/context/` | Session management |
| Cookie key | `_DARKONE_AUTH_KEY_` | Session storage |
| Demo users | `fakeUsers` array | Hardcoded credentials |

**Public App:**
- No authentication
- No protected routes
- All pages publicly accessible

### 5.2 Future State (Supabase)

**Planned Architecture:**

| Component | Purpose | Status |
|-----------|---------|--------|
| Supabase Auth | User authentication | NOT IMPLEMENTED |
| Supabase Database | Data persistence | NOT IMPLEMENTED |
| Supabase Storage | File storage | NOT IMPLEMENTED |
| Edge Functions | Server-side logic | NOT IMPLEMENTED |

**Migration Path:**

1. Replace `fake-backend.ts` with Supabase client
2. Replace `useAuthContext.tsx` with Supabase auth hooks
3. Add RLS policies for data access
4. Implement session management

**STATUS: Future authentication is NOT IMPLEMENTED**

---

## 6. Deployment Architecture

### 6.1 Current (Development)

| App | Command | URL |
|-----|---------|-----|
| Admin | `npm run dev` | `http://localhost:8080` |
| Public | TBD | `http://localhost:3000` |

### 6.2 Future (Production)

| App | Domain | Path |
|-----|--------|------|
| Public | `devmart.com` | `/` |
| Admin | `devmart.com` | `/admin` |

OR

| App | Domain |
|-----|--------|
| Public | `devmart.com` |
| Admin | `admin.devmart.com` |

**Deployment strategy to be determined.**

---

## 8. Asset Isolation (Current Paths)

### 8.1 Images

```
finibus/src/assets/images/              # Public website images
Darkone-React_v1.0/src/assets/images/   # Admin portal images
```

### 8.2 Fonts

- Each app bundles its own fonts
- No shared font loading

### 8.3 Icons

- Public: Finibus icon set
- Admin: Iconify + Solar/Box icons

---

## 8. Environment Variables

### 8.1 Current

No environment variables in use (demo mode).

### 8.2 Future

```
# Public App
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=

# Admin App
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_ADMIN_API_URL=
```

**STATUS: Environment configuration NOT IMPLEMENTED**

---

## Document Control

| Version | Date | Author | Notes |
|---------|------|--------|-------|
| 0.1 | 2025-01-XX | Planning Agent | Initial draft |

**Next Review:** After Phase 2 execution approval
