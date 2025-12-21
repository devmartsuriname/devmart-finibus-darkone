# Admin Placeholder Map

```
Status: Draft
Phase: Planning Only
Execution: Not Authorized
```

---

## 1. Purpose

This document defines the placeholder strategy for each Admin module. Each placeholder specifies:

- Visual intent
- Data state
- Reusability intent
- Placeholder content

**Note:** All placeholders described herein are conceptual. Implementation requires explicit authorization.

---

## 2. Placeholder Types

| Type | Visual Intent | Use Case |
|------|---------------|----------|
| `Empty State` | Clean, intentionally blank | Modules awaiting data connection |
| `Coming Soon` | Informative placeholder | Features planned for future phases |
| `Inactive Module` | Greyed/muted appearance | Modules not in current scope |

---

## 3. Dashboard Placeholders

| Component | Current State | Placeholder Type | Data State | Reusability Intent |
|-----------|---------------|------------------|------------|-------------------|
| Cards (4x) | `cardsData` demo array | Empty State | No mock data | Card components preserved |
| Chart | Demo series data | Empty State | No mock data | ApexCharts wrapper preserved |
| SaleChart | Demo sales data | Empty State | No mock data | Chart config preserved |
| CountryMap | Interactive demo | Empty State | Static map only | VectorMap component preserved |
| User Widget | Demo user list | Empty State | No mock data | Widget structure preserved |

**Placeholder Text (Dashboard):**
- Cards: "—" or "0" with muted styling
- Charts: "No data available"
- Map: Static render, no tooltips
- User: "No users to display"

---

## 4. Base UI Module Placeholders

| Module | Route | Placeholder Type | Placeholder Content |
|--------|-------|------------------|---------------------|
| Accordions | `/admin/base-ui/accordions` | Inactive Module | "Component reference available" |
| Alerts | `/admin/base-ui/alerts` | Inactive Module | "Component reference available" |
| Avatars | `/admin/base-ui/avatars` | Inactive Module | "Component reference available" |
| Badges | `/admin/base-ui/badges` | Inactive Module | "Component reference available" |
| Breadcrumb | `/admin/base-ui/breadcrumb` | Inactive Module | "Component reference available" |
| Buttons | `/admin/base-ui/buttons` | Inactive Module | "Component reference available" |
| Cards | `/admin/base-ui/cards` | Inactive Module | "Component reference available" |
| Collapse | `/admin/base-ui/collapse` | Inactive Module | "Component reference available" |
| Dropdown | `/admin/base-ui/dropdown` | Inactive Module | "Component reference available" |
| List Group | `/admin/base-ui/list-group` | Inactive Module | "Component reference available" |
| Modals | `/admin/base-ui/modals` | Inactive Module | "Component reference available" |
| Offcanvas | `/admin/base-ui/offcanvas` | Inactive Module | "Component reference available" |
| Pagination | `/admin/base-ui/pagination` | Inactive Module | "Component reference available" |
| Placeholders | `/admin/base-ui/placeholders` | Inactive Module | "Component reference available" |
| Popovers | `/admin/base-ui/popovers` | Inactive Module | "Component reference available" |
| Progress | `/admin/base-ui/progress` | Inactive Module | "Component reference available" |
| Spinners | `/admin/base-ui/spinners` | Inactive Module | "Component reference available" |
| Tabs | `/admin/base-ui/tabs` | Inactive Module | "Component reference available" |
| Tooltips | `/admin/base-ui/tooltips` | Inactive Module | "Component reference available" |
| Typography | `/admin/base-ui/typography` | Inactive Module | "Component reference available" |
| Utilities | `/admin/base-ui/utilities` | Inactive Module | "Component reference available" |

**Reusability Intent:** All Base UI components to be preserved as reference implementations.

---

## 5. Forms Module Placeholders

| Module | Route | Placeholder Type | Placeholder Content |
|--------|-------|------------------|---------------------|
| Basic Elements | `/admin/forms/basic-elements` | Inactive Module | "Form patterns available" |
| Advance | `/admin/forms/advance` | Inactive Module | "Advanced form patterns available" |
| Validation | `/admin/forms/validation` | Inactive Module | "Validation patterns available" |
| Wizard | `/admin/forms/wizard` | Inactive Module | "Wizard pattern available" |
| Editors | `/admin/forms/editors` | Inactive Module | "Editor integration available" |

**Reusability Intent:** Form patterns preserved for future form implementations.

---

## 6. Tables Module Placeholders

| Module | Route | Placeholder Type | Placeholder Content |
|--------|-------|------------------|---------------------|
| Basic Tables | `/admin/tables/basic-tables` | Inactive Module | "Table patterns available" |
| Grid.js | `/admin/tables/gridjs` | Inactive Module | "Grid.js integration available" |

**Reusability Intent:** Table components preserved for data display.

---

## 7. Charts Module Placeholders

| Module | Route | Placeholder Type | Placeholder Content |
|--------|-------|------------------|---------------------|
| ApexCharts | `/admin/charts/apex-charts` | Inactive Module | "Chart library available" |

**Reusability Intent:** ApexCharts wrapper and configurations preserved.

---

## 8. Maps Module Placeholders

| Module | Route | Placeholder Type | Placeholder Content |
|--------|-------|------------------|---------------------|
| Google Maps | `/admin/maps/google-maps` | Inactive Module | "Google Maps integration available" |
| Vector Maps | `/admin/maps/vector-maps` | Inactive Module | "Vector maps available" |

**Reusability Intent:** Map components preserved for geographic data display.

---

## 9. Icons Module Placeholders

| Module | Route | Placeholder Type | Placeholder Content |
|--------|-------|------------------|---------------------|
| Iconify | `/admin/icons/iconify` | Inactive Module | "Icon library reference" |
| Lucide Icons | `/admin/icons/lucide` | Inactive Module | "Lucide icons available" |

**Reusability Intent:** Icon systems preserved for UI consistency.

---

## 10. Layouts Module Placeholders

| Variant | Route | Placeholder Type | Placeholder Content |
|---------|-------|------------------|---------------------|
| Horizontal | `/admin/layouts/horizontal` | Inactive Module | "Layout variant available" |
| Detached | `/admin/layouts/detached` | Inactive Module | "Layout variant available" |
| Full | `/admin/layouts/full` | Inactive Module | "Layout variant available" |
| Fullscreen | `/admin/layouts/fullscreen` | Inactive Module | "Layout variant available" |
| Hover Menu | `/admin/layouts/hover-menu` | Inactive Module | "Layout variant available" |

**Reusability Intent:** Layout variants preserved for future configuration options.

---

## 11. Auth Pages (No Placeholder — Preserved)

| Page | Route | Status |
|------|-------|--------|
| Sign In | `/admin/auth/sign-in` | Demo preserved (Phase 4 migration) |
| Sign Up | `/admin/auth/sign-up` | Demo preserved (Phase 4 migration) |
| Reset Password | `/admin/auth/reset-password` | Demo preserved (Phase 4 migration) |
| Lock Screen | `/admin/auth/lock-screen` | Demo preserved (Phase 4 migration) |

**Note:** Auth pages remain functional with demo backend until Phase 4 Supabase migration.

---

## 12. Data State Requirements

All placeholders must adhere to:

| Requirement | Enforcement |
|-------------|-------------|
| No mock data | Demo arrays to be emptied or replaced |
| No fake metrics | Numbers to show "—" or "0" |
| No demo users | User lists to show empty state |
| No sample content | Text to be generic placeholders |

---

## 13. Visual Consistency Requirements

Placeholders must maintain:

- Darkone styling (colors, typography, spacing)
- Bootstrap grid structure
- Card/panel containers
- Consistent placeholder messaging

---

*Document Version: 1.0*
*Last Updated: Phase 3 Planning*
