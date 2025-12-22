# Architecture — Devmart Platform

```
Status: AUTHORITATIVE
Phase: Phase 4A.2 Complete
Execution: Media Library Admin UI Implemented
Last Updated: 2025-12-22
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
| Status | Phase 4A.2 — Media Library UI Complete |
| Phase | Phase 4A.2 Complete |
| Build | ✅ Auth + Media Library Implemented |

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

### 5.2 Admin App Routes (Phase 4A)

**Devmart Business Routes:**

| Route | Module | Current State |
|-------|--------|---------------|
| `/admin/dashboard` | Dashboard | Coming Soon |
| `/admin/content/blog` | Blog | Empty table |
| `/admin/content/projects` | Projects | Empty table |
| `/admin/content/pages` | Pages | Empty table |
| `/admin/content/media` | Media | ✅ Phase 4A.2 Complete |
| `/admin/content/testimonials` | Testimonials | Empty table |
| `/admin/crm/leads` | Leads | Empty table |
| `/admin/analytics` | Analytics | Coming Soon |
| `/admin/settings` | Settings | Coming Soon |

**Auth Routes (Implemented):**

| Route | Purpose | Status |
|-------|---------|--------|
| `/admin/auth/sign-in` | Login | ✅ Supabase Auth |
| `/admin/auth/sign-up` | Registration | ❌ Removed from MVP |
| `/admin/auth/reset-password` | Password reset | ❌ Removed from MVP |
| `/admin/auth/lock-screen` | Lock screen | Preserved (demo) |

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

### 6.1 Current State (Supabase Auth - Implemented)

**Admin App Authentication:**

| Component | Location | Purpose |
|-----------|----------|---------|
| Supabase Client | `src/integrations/supabase/client.ts` | Auth SDK |
| Auth Context | `src/context/useAuthContext.tsx` | Session management |
| Route Guard | `src/routes/router.tsx` | Auth + Role check |
| Access Denied | `src/components/AccessDenied.tsx` | Non-admin block |

**Authentication Flow:**

```
┌─────────────────┐
│  User Request   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐     No      ┌─────────────────┐
│ isAuthenticated?├────────────►│ /auth/sign-in   │
└────────┬────────┘             └─────────────────┘
         │ Yes
         ▼
┌─────────────────┐     No      ┌─────────────────┐
│    isAdmin?     ├────────────►│  AccessDenied   │
└────────┬────────┘             └─────────────────┘
         │ Yes
         ▼
┌─────────────────┐
│  Admin Content  │
└─────────────────┘
```

**Role Enforcement:**

| Role | Access | Check Method |
|------|--------|--------------|
| `admin` | Full admin | `user_roles` table via `has_role()` |
| Others | Blocked | Shows AccessDenied component |

**Public App:**
- No authentication
- No protected routes
- All pages publicly accessible

### 6.2 Supabase Integration

| Component | Purpose | Status |
|-----------|---------|--------|
| Supabase Auth | User authentication | ✅ Implemented |
| Supabase Database | Data persistence | ✅ Tables created |
| Supabase Storage | File storage | ✅ Bucket created |
| Edge Functions | Server-side logic | Not implemented |

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

### 9.1 Current (Active)

```
# Supabase (via Lovable integration)
VITE_SUPABASE_URL=https://hwrlkrrdqbtgyjpsrijh.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbG...
```

### 9.2 Secrets Configured

| Secret | Purpose | Status |
|--------|---------|--------|
| SUPABASE_URL | Database URL | ✅ Set |
| SUPABASE_PUBLISHABLE_KEY | Anon key | ✅ Set |
| SUPABASE_SERVICE_ROLE_KEY | Admin key | ✅ Set |
| SUPABASE_DB_URL | Direct DB | ✅ Set |

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

**Status:** Required in later phase — NOT Phase 4A

A Finibus-based Frontend Style Guide is required to ensure consistency between public frontend and admin content creation.

**Phase 4A Action:** Document the requirement only.

---

## Document Control

| Version | Date | Author | Notes |
|---------|------|--------|-------|
| 0.1 | 2025-01-XX | Planning Agent | Initial draft |
| 1.0 | 2025-12-21 | Planning Agent | Phase 3 alignment complete |
| 2.0 | 2025-12-22 | Implementation Agent | Phase 4A.1.5 - Auth boundary implemented |
| 2.1 | 2025-12-22 | Implementation Agent | Phase 4A.2 - Media Library UI implemented |

**Next Review:** After Phase 4A.3 authorization
