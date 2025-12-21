# Architecture — Devmart Platform

```
Status: AUTHORITATIVE
Phase: Phase 3 Alignment Complete
Execution: Documentation Only — Build Not Authorized
Last Updated: 2025-12-21
```

---

## 1. Current Repository Structure (As-Is)

```
/
├── apps/
│   ├── public/              # Finibus-based public website (LOCKED)
│   │   ├── src/
│   │   ├── public/
│   │   └── ...
│   │
│   └── admin/               # Darkone-based admin portal
│       ├── src/
│       ├── public/
│       └── ...
│
├── Darkone-React_v1.0/      # Admin template (reference, read-only)
│
├── docs/                    # Documentation (this directory)
└── README.md
```

> **No restructuring is approved in any phase unless explicitly authorized.**

---

## 2. Application Status

### 2.1 Public Website (apps/public)

| Attribute | Value |
|-----------|-------|
| Template | Finibus React |
| Status | **LOCKED** — Phase 2 Complete |
| Phase | Phase 2 Complete |
| Modifications | ❌ Not Authorized |

### 2.2 Admin Portal (apps/admin)

| Attribute | Value |
|-----------|-------|
| Template | Darkone React |
| Status | Phase 3 — Placeholder Cleanup |
| Phase | Phase 3 (Documentation Complete) |
| Build | ❌ Not Authorized |

---

## 3. Application Isolation

### 3.1 Build Isolation

| Aspect | Public App | Admin App |
|--------|------------|-----------|
| Location | `/apps/public/` | `/apps/admin/` |
| Entry point | `src/main.tsx` | `src/main.tsx` |
| Dev port | 3000 | 8080 |
| Base path | `/` | `/admin` (TBD) |

### 3.2 Dependency Isolation

- Each app maintains its own `package.json`
- No shared runtime dependencies
- No cross-app imports
- Shared tooling only at root level (if needed)

---

## 4. SCSS Isolation Rules

### 4.1 Strict Separation

```
apps/public/src/assets/scss/    # Finibus styles ONLY
apps/admin/src/assets/scss/     # Darkone styles ONLY
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

## 5. Routing Architecture

### 5.1 Public App Routes (Locked)

```
/                   # Homepage
/about              # About page
/services           # Services page
/projects           # Projects page
/blog               # Blog listing
/blog/:slug         # Blog detail
/contact            # Contact page
```

### 5.2 Admin App Routes (Phase 3)

**Devmart Business Routes:**

| Route | Module | Phase 3 State |
|-------|--------|---------------|
| `/admin/dashboard` | Dashboard | Coming Soon |
| `/admin/content/blog` | Blog | Empty table |
| `/admin/content/projects` | Projects | Empty table |
| `/admin/content/pages` | Pages | Empty table |
| `/admin/content/media` | Media | Empty grid |
| `/admin/content/testimonials` | Testimonials | Empty table |
| `/admin/crm/leads` | Leads | Empty table |
| `/admin/analytics` | Analytics | Coming Soon |
| `/admin/settings` | Settings | Coming Soon |

**Auth Routes (Preserved):**

| Route | Purpose |
|-------|---------|
| `/admin/auth/sign-in` | Login (demo) |
| `/admin/auth/sign-up` | Registration (demo) |
| `/admin/auth/reset-password` | Password reset (demo) |
| `/admin/auth/lock-screen` | Lock screen (demo) |

**Darkone Demo Routes (Hidden from Navigation):**

| Route Pattern | Status |
|---------------|--------|
| `/admin/base-ui/*` | Hidden |
| `/admin/forms/*` | Hidden |
| `/admin/tables/*` | Hidden |
| `/admin/charts/*` | Hidden |
| `/admin/maps/*` | Hidden |
| `/admin/icons/*` | Hidden |
| `/admin/layouts/*` | Hidden |

### 5.3 No Cross-Navigation

- Public app never links to admin routes
- Admin app never links to public routes
- Separate session management

---

## 6. Authentication Boundary

### 6.1 Current State (Demo)

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

### 6.2 Future State (Supabase)

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

## 7. Deployment Architecture

### 7.1 Current (Development)

| App | Command | URL |
|-----|---------|-----|
| Admin | `npm run dev` | `http://localhost:8080` |
| Public | `npm run dev` | `http://localhost:3000` |

### 7.2 Future (Production)

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

## 8. Asset Isolation

### 8.1 Images

```
apps/public/src/assets/images/    # Public website images
apps/admin/src/assets/images/     # Admin portal images
```

### 8.2 Fonts

- Each app bundles its own fonts
- No shared font loading

### 8.3 Icons

- Public: Finibus icon set
- Admin: Iconify + Solar/Box icons

---

## 9. Environment Variables

### 9.1 Current

No environment variables in use (demo mode).

### 9.2 Future

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

## 10. Devmart Admin Module Architecture

### 10.1 Approved Modules

| Section | Modules |
|---------|---------|
| MAIN | Dashboard |
| CONTENT | Blog, Projects, Pages, Media, Testimonials |
| CRM | Leads |
| ANALYTICS | Analytics Dashboard |
| SYSTEM | Settings |

### 10.2 Excluded Modules

| Module | Reason |
|--------|--------|
| Team Management | Not in scope |
| Client Portal | Not in scope |
| User/Profile | Phase 3 excluded |

### 10.3 Hidden Modules (Darkone Demo)

| Category | Status |
|----------|--------|
| Base UI | Hidden from navigation |
| Forms | Hidden from navigation |
| Tables | Hidden from navigation |
| Charts | Hidden from navigation |
| Maps | Hidden from navigation |
| Icons | Hidden from navigation |
| Layouts | Hidden from navigation |

---

## 11. Frontend Style Guide Requirement

**Status:** Required in later phase — NOT Phase 3

A Finibus-based Frontend Style Guide is required to ensure consistency between public frontend and admin content creation.

**Phase 3 Action:** Document the requirement only.

---

## Document Control

| Version | Date | Author | Notes |
|---------|------|--------|-------|
| 0.1 | 2025-01-XX | Planning Agent | Initial draft |
| 1.0 | 2025-12-21 | Planning Agent | Phase 3 alignment complete |

**Next Review:** After Phase 3 build authorization
