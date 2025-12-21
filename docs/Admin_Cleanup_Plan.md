# Admin Cleanup Plan — Darkone Template

**Status:** Draft  
**Phase:** Planning Only  
**Execution:** Not Authorized  

---

## 1. Purpose

This document identifies demo components in the Darkone admin template that will be replaced with placeholders in a future cleanup phase.

**This is a PLAN ONLY. No deletions or changes are authorized.**

---

## 2. Goal

Prepare Darkone admin for production use by:

1. Removing demo data
2. Replacing demo authentication with real auth
3. Converting demo modules to placeholders
4. Preserving dashboard and navigation structure

---

## 3. Demo Authentication — Identified for Replacement

### 3.1 Files

| File | Location | Action |
|------|----------|--------|
| `fake-backend.ts` | `src/helpers/` | Replace with Supabase client |
| `useAuthContext.tsx` | `src/context/` | Update for Supabase auth |

### 3.2 Demo Users

```typescript
// To be removed from fake-backend.ts
const fakeUsers = [
  { id: '1', email: 'user@demo.com', ... },
  { id: '2', email: 'admin@demo.com', ... }
]
```

### 3.3 Session Key

| Key | Purpose | Action |
|-----|---------|--------|
| `_DARKONE_AUTH_KEY_` | Cookie storage | Replace with Supabase session |

### 3.4 Auth Pages

| Page | Route | Action |
|------|-------|--------|
| Sign In | `/auth/sign-in` | Update for real auth |
| Sign Up | `/auth/sign-up` | Update for real auth |
| Reset Password | `/auth/reset-password` | Update for real auth |
| Lock Screen | `/auth/lock-screen` | Update for real auth |

---

## 4. Demo Data — Identified for Removal

### 4.1 Dashboard Data

| File | Location | Content |
|------|----------|---------|
| `data.ts` | `src/app/dashboards/` | Chart data, stats |

### 4.2 Notification Data

| File | Location | Content |
|------|----------|---------|
| Notification context | `src/context/` | Demo notifications |

### 4.3 Topbar Data

| File | Location | Content |
|------|----------|---------|
| `topbar.ts` | `src/assets/data/` | Language, apps, notifications |

### 4.4 Menu Data

| File | Location | Content |
|------|----------|---------|
| `menu-items.ts` | `src/assets/data/` | Demo navigation items |

---

## 5. Demo Modules — Identified for Placeholder Conversion

### 5.1 Base UI Modules (21 total)

| Module | Route | Status |
|--------|-------|--------|
| Accordion | `/base-ui/accordion` | Convert to placeholder |
| Alerts | `/base-ui/alerts` | Convert to placeholder |
| Avatar | `/base-ui/avatar` | Convert to placeholder |
| Badge | `/base-ui/badge` | Convert to placeholder |
| Breadcrumb | `/base-ui/breadcrumb` | Convert to placeholder |
| Buttons | `/base-ui/buttons` | Convert to placeholder |
| Cards | `/base-ui/cards` | Convert to placeholder |
| Carousel | `/base-ui/carousel` | Convert to placeholder |
| Collapse | `/base-ui/collapse` | Convert to placeholder |
| Dropdown | `/base-ui/dropdown` | Convert to placeholder |
| List Group | `/base-ui/list-group` | Convert to placeholder |
| Modals | `/base-ui/modals` | Convert to placeholder |
| Tabs | `/base-ui/tabs` | Convert to placeholder |
| Offcanvas | `/base-ui/offcanvas` | Convert to placeholder |
| Pagination | `/base-ui/pagination` | Convert to placeholder |
| Placeholders | `/base-ui/placeholders` | Convert to placeholder |
| Popovers | `/base-ui/popovers` | Convert to placeholder |
| Progress | `/base-ui/progress` | Convert to placeholder |
| Spinners | `/base-ui/spinners` | Convert to placeholder |
| Toasts | `/base-ui/toasts` | Convert to placeholder |
| Tooltips | `/base-ui/tooltips` | Convert to placeholder |

### 5.2 Form Modules (5 total)

| Module | Route | Status |
|--------|-------|--------|
| Basic Elements | `/forms/basic-elements` | Convert to placeholder |
| Flatpickr | `/forms/flatpickr` | Convert to placeholder |
| Validation | `/forms/validation` | Convert to placeholder |
| File Uploads | `/forms/file-uploads` | Convert to placeholder |
| Editors | `/forms/editors` | Convert to placeholder |

### 5.3 Table Modules (2 total)

| Module | Route | Status |
|--------|-------|--------|
| Basic Tables | `/tables/basic-tables` | Convert to placeholder |
| Grid JS | `/tables/grid-js` | Convert to placeholder |

### 5.4 Chart Module

| Module | Route | Status |
|--------|-------|--------|
| Apex Chart | `/charts/apex-chart` | Convert to placeholder |

### 5.5 Map Modules (2 total)

| Module | Route | Status |
|--------|-------|--------|
| Google Maps | `/maps/google-maps` | Convert to placeholder |
| Vector Maps | `/maps/vector-maps` | Convert to placeholder |

### 5.6 Icon Modules (2 total)

| Module | Route | Status |
|--------|-------|--------|
| Boxicons | `/icons/boxicons` | Convert to placeholder |
| Solar Icons | `/icons/solar-icons` | Convert to placeholder |

### 5.7 Layout Variant Modules (5 total)

| Module | Route | Status |
|--------|-------|--------|
| Dark Mode | `/layouts/dark-mode` | Convert to placeholder |
| Dark Sidenav | `/layouts/dark-sidenav` | Convert to placeholder |
| Small Sidenav | `/layouts/small-sidenav` | Convert to placeholder |
| Hidden Sidenav | `/layouts/hidden-sidenav` | Convert to placeholder |
| Scrollable | `/layouts/scrollable` | Convert to placeholder |

---

## 6. Structure to Preserve

### 6.1 Dashboard

| Component | Location | Preserve |
|-----------|----------|----------|
| Dashboard layout | `src/app/dashboards/` | ✅ Yes |
| Widget structure | Dashboard components | ✅ Yes |
| Chart containers | Dashboard components | ✅ Yes |

### 6.2 Navigation

| Component | Location | Preserve |
|-----------|----------|----------|
| Sidebar | `src/components/VerticalNavigationBar/` | ✅ Yes |
| Topbar | `src/components/TopNavigationBar/` | ✅ Yes |
| AppMenu | `src/components/VerticalNavigationBar/AppMenu.tsx` | ✅ Yes |
| Menu structure | Menu logic | ✅ Yes |

### 6.3 Layout

| Component | Location | Preserve |
|-----------|----------|----------|
| AdminLayout | `src/layouts/AdminLayout.tsx` | ✅ Yes |
| AuthLayout | `src/layouts/AuthLayout.tsx` | ✅ Yes |
| Footer | `src/components/Footer.tsx` | ✅ Yes |

### 6.4 Context

| Context | Location | Preserve |
|---------|----------|----------|
| Layout Context | `src/context/useLayoutContext.tsx` | ✅ Yes |
| Theme Context | Theme management | ✅ Yes |

---

## 7. Placeholder Strategy

### 7.1 Standard Placeholder Component

```tsx
// Future: Standard placeholder for removed demo modules
const ModulePlaceholder = ({ moduleName }: { moduleName: string }) => (
  <Card>
    <CardBody className="text-center py-5">
      <h4>{moduleName}</h4>
      <p className="text-muted">
        This module is available for custom implementation.
      </p>
    </CardBody>
  </Card>
)
```

### 7.2 Menu Item Handling

- Demo module routes → Placeholder pages
- Menu items → Update labels to indicate "Coming Soon" or remove
- Preserve menu structure for future additions

---

## 8. Phased Execution Plan

### Phase 3 — Placeholders + Demo Neutralization

> **STATUS: Planned — Not Authorized for Execution**

When Phase 3 is authorized, execute in this order:

1. Create placeholder component
2. Replace demo modules with placeholders
3. Update menu items (labels only)
4. Neutralize demo data files (replace with static placeholders)
5. Test all navigation paths
6. Verify dashboard renders

### Phase 4 — Supabase Auth Migration

> **STATUS: Planned — Not Authorized for Execution**

When Phase 4 is authorized, execute in this order:

1. Enable Lovable Cloud / Supabase
2. Update auth context for Supabase
3. Replace fake-backend.ts with Supabase client
4. Implement real session management
5. Test auth flows end-to-end
6. Remove demo auth artifacts

---

## 9. Verification Checklist

Before cleanup is marked complete:

- [ ] Dashboard renders correctly
- [ ] Sidebar navigation works
- [ ] Topbar functions correctly
- [ ] Theme switching works
- [ ] All placeholder pages render
- [ ] Auth flow works (with new auth)
- [ ] No console errors
- [ ] No broken routes

---

## 10. Explicit Non-Execution Notice

**The following actions are NOT authorized:**

| Action | Status |
|--------|--------|
| Delete any files | ❌ Not Authorized |
| Modify any components | ❌ Not Authorized |
| Update authentication | ❌ Not Authorized |
| Replace demo data | ❌ Not Authorized |
| Create placeholders | ❌ Not Authorized |

This document is for **PLANNING PURPOSES ONLY**.

---

## Document Control

| Version | Date | Author | Notes |
|---------|------|--------|-------|
| 0.1 | 2025-01-XX | Planning Agent | Initial draft |

**Next Review:** Before Phase 3 execution approval
