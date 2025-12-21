# Architecture — Devmart Platform

**Status:** Draft  
**Phase:** Planning Only  
**Execution:** Not Authorized  

---

## 1. Monorepo Structure

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
├── docs/                # Documentation (this directory)
├── package.json         # Root workspace config
└── README.md
```

---

## 2. Application Isolation

### 2.1 Build Isolation

| Aspect | Public App | Admin App |
|--------|------------|-----------|
| Entry point | `apps/public/src/main.tsx` | `apps/admin/src/main.tsx` |
| Build output | `apps/public/dist/` | `apps/admin/dist/` |
| Dev port | 3000 | 8080 |
| Base path | `/` | `/admin` |

### 2.2 Dependency Isolation

- Each app maintains its own `package.json`
- No shared runtime dependencies
- No cross-app imports
- Shared tooling only at root level (if needed)

---

## 3. SCSS Isolation Rules

### 3.1 Strict Separation

```
apps/public/src/assets/scss/    # Finibus styles ONLY
apps/admin/src/assets/scss/     # Darkone styles ONLY
```

### 3.2 Prohibited Actions

- ❌ No cross-importing SCSS between apps
- ❌ No shared SCSS tokens or variables
- ❌ No Bootstrap version mixing
- ❌ No custom theme modifications

### 3.3 Rationale

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
/admin              # Dashboard (redirects to /admin/dashboards)
/admin/dashboards   # Main dashboard
/admin/auth/*       # Authentication pages
/admin/*            # Other admin modules
```

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

## 7. Asset Isolation

### 7.1 Images

```
apps/public/src/assets/images/   # Public website images
apps/admin/src/assets/images/    # Admin portal images
```

### 7.2 Fonts

- Each app bundles its own fonts
- No shared font loading

### 7.3 Icons

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
