# Admin Module Skeletons

```
Status: Draft
Phase: Planning Only
Execution: Not Authorized
```

---

## 1. Purpose

This document defines the skeleton structure for each Admin module category. Skeletons provide a consistent placeholder appearance across all modules while preserving the template structure.

**Note:** All skeleton definitions are conceptual. Implementation requires explicit authorization.

---

## 2. Skeleton Design Principles

| Principle | Description |
|-----------|-------------|
| Consistency | All modules use same placeholder patterns |
| Preservation | Original component files remain intact |
| Clarity | Obvious that module is "inactive" vs "broken" |
| Reusability | Demo content to be neutralized, structure preserved |
| Professionalism | Clean, intentional appearance |

---

## 3. Base UI Skeletons

### 3.1 Module List

| Module | Route | File Path |
|--------|-------|-----------|
| Accordions | `/admin/base-ui/accordions` | `app/admin/base-ui/accordions/page.tsx` |
| Alerts | `/admin/base-ui/alerts` | `app/admin/base-ui/alerts/page.tsx` |
| Avatars | `/admin/base-ui/avatars` | `app/admin/base-ui/avatars/page.tsx` |
| Badges | `/admin/base-ui/badges` | `app/admin/base-ui/badges/page.tsx` |
| Breadcrumb | `/admin/base-ui/breadcrumb` | `app/admin/base-ui/breadcrumb/page.tsx` |
| Buttons | `/admin/base-ui/buttons` | `app/admin/base-ui/buttons/page.tsx` |
| Cards | `/admin/base-ui/cards` | `app/admin/base-ui/cards/page.tsx` |
| Collapse | `/admin/base-ui/collapse` | `app/admin/base-ui/collapse/page.tsx` |
| Dropdown | `/admin/base-ui/dropdown` | `app/admin/base-ui/dropdown/page.tsx` |
| List Group | `/admin/base-ui/list-group` | `app/admin/base-ui/list-group/page.tsx` |
| Modals | `/admin/base-ui/modals` | `app/admin/base-ui/modals/page.tsx` |
| Offcanvas | `/admin/base-ui/offcanvas` | `app/admin/base-ui/offcanvas/page.tsx` |
| Pagination | `/admin/base-ui/pagination` | `app/admin/base-ui/pagination/page.tsx` |
| Placeholders | `/admin/base-ui/placeholders` | `app/admin/base-ui/placeholders/page.tsx` |
| Popovers | `/admin/base-ui/popovers` | `app/admin/base-ui/popovers/page.tsx` |
| Progress | `/admin/base-ui/progress` | `app/admin/base-ui/progress/page.tsx` |
| Spinners | `/admin/base-ui/spinners` | `app/admin/base-ui/spinners/page.tsx` |
| Tabs | `/admin/base-ui/tabs` | `app/admin/base-ui/tabs/page.tsx` |
| Tooltips | `/admin/base-ui/tooltips` | `app/admin/base-ui/tooltips/page.tsx` |
| Typography | `/admin/base-ui/typography` | `app/admin/base-ui/typography/page.tsx` |
| Utilities | `/admin/base-ui/utilities` | `app/admin/base-ui/utilities/page.tsx` |

### 3.2 Skeleton Approach

**Strategy:** Preserve as reference library

| Element | Treatment |
|---------|-----------|
| Component demos | Preserved (reference implementations) |
| Demo text content | May remain (documentation purpose) |
| Interactive examples | Preserved (component reference) |
| Page structure | Preserved |

**Rationale:** Base UI modules serve as component reference library. Demo content is acceptable as it documents component usage patterns.

### 3.3 Skeleton Content (Conceptual)

For modules where demo neutralization is desired:

```
Page Title: [Module Name]
Status Badge: "Reference Module"
Content: Component examples with minimal demo data
Footer: "Component library reference"
```

---

## 4. Forms Skeletons

### 4.1 Module List

| Module | Route | File Path |
|--------|-------|-----------|
| Basic Elements | `/admin/forms/basic-elements` | `app/admin/forms/basic-elements/page.tsx` |
| Advance | `/admin/forms/advance` | `app/admin/forms/advance/page.tsx` |
| Validation | `/admin/forms/validation` | `app/admin/forms/validation/page.tsx` |
| Wizard | `/admin/forms/wizard` | `app/admin/forms/wizard/page.tsx` |
| Editors | `/admin/forms/editors` | `app/admin/forms/editors/page.tsx` |

### 4.2 Skeleton Approach

**Strategy:** Preserve as form pattern library

| Element | Treatment |
|---------|-----------|
| Form layouts | Preserved |
| Input examples | Preserved (pattern reference) |
| Validation demos | Preserved (reference) |
| Demo form data | To be cleared during execution |

### 4.3 Components to Preserve

- Dropzone integration
- Flatpickr date picker
- Quill editor
- React Select
- Form validation patterns

### 4.4 Demo Data to Neutralize (During Future Execution)

- Pre-filled form values
- Sample validation error messages
- Demo submission handlers

---

## 5. Tables Skeletons

### 5.1 Module List

| Module | Route | File Path |
|--------|-------|-----------|
| Basic Tables | `/admin/tables/basic-tables` | `app/admin/tables/basic-tables/page.tsx` |
| Grid.js | `/admin/tables/gridjs` | `app/admin/tables/gridjs/page.tsx` |

### 5.2 Skeleton Approach

**Strategy:** Empty tables with structure visible

| Element | Treatment |
|---------|-----------|
| Table structure | Preserved |
| Column headers | Preserved |
| Demo rows | To be cleared |
| Pagination | Preserved (shows 0 results) |

### 5.3 Skeleton Content (Conceptual)

```
Table Headers: Preserved
Table Body: Empty or single "No data" row
Pagination: "Showing 0 of 0 results"
```

### 5.4 Components to Preserve

- Grid.js integration
- Basic table patterns
- Responsive table styling

---

## 6. Charts Skeleton

### 6.1 Module List

| Module | Route | File Path |
|--------|-------|-----------|
| ApexCharts | `/admin/charts/apex-charts` | `app/admin/charts/apex-charts/page.tsx` |

### 6.2 Skeleton Approach

**Strategy:** Charts with empty data state

| Element | Treatment |
|---------|-----------|
| Chart containers | Preserved |
| Chart configurations | Preserved |
| Demo series data | To be emptied |
| Chart types | All preserved |

### 6.3 Skeleton Content (Conceptual)

Each chart type shows:
```
Chart Title: [Chart Type Name]
Chart Area: "No data available"
Chart Options: Configuration preserved
```

### 6.4 ApexCharts Configurations to Preserve

- Line chart config
- Bar chart config
- Area chart config
- Pie/Donut chart config
- Radar chart config
- All other chart type configs

---

## 7. Maps Skeletons

### 7.1 Module List

| Module | Route | File Path |
|--------|-------|-----------|
| Google Maps | `/admin/maps/google-maps` | `app/admin/maps/google-maps/page.tsx` |
| Vector Maps | `/admin/maps/vector-maps` | `app/admin/maps/vector-maps/page.tsx` |

### 7.2 Skeleton Approach

**Strategy:** Static map renders without data overlays

| Element | Treatment |
|---------|-----------|
| Map containers | Preserved |
| Map renders | Static display |
| Data overlays | To be removed |
| Interactive markers | To be removed |

### 7.3 Components to Preserve

- jsvectormap integration
- All map variants (World, USA, Canada, etc.)
- Google Maps wrapper (if API key available)

### 7.4 Skeleton Content (Conceptual)

```
Map Title: [Map Type]
Map Display: Static render
Overlay: None
Interactivity: Minimal (pan/zoom only)
```

---

## 8. Icons Skeletons

### 8.1 Module List

| Module | Route | File Path |
|--------|-------|-----------|
| Iconify | `/admin/icons/iconify` | `app/admin/icons/iconify/page.tsx` |
| Lucide Icons | `/admin/icons/lucide` | `app/admin/icons/lucide/page.tsx` |

### 8.2 Skeleton Approach

**Strategy:** Preserve as icon reference library

| Element | Treatment |
|---------|-----------|
| Icon displays | Preserved |
| Icon names | Preserved |
| Icon categories | Preserved |

**Rationale:** Icon modules are reference libraries. No demo data to neutralize.

---

## 9. Layouts Skeletons

### 9.1 Module List

| Variant | Route | File Path |
|---------|-------|-----------|
| Horizontal | `/admin/layouts/horizontal` | `app/admin/layouts/horizontal/page.tsx` |
| Detached | `/admin/layouts/detached` | `app/admin/layouts/detached/page.tsx` |
| Full | `/admin/layouts/full` | `app/admin/layouts/full/page.tsx` |
| Fullscreen | `/admin/layouts/fullscreen` | `app/admin/layouts/fullscreen/page.tsx` |
| Hover Menu | `/admin/layouts/hover-menu` | `app/admin/layouts/hover-menu/page.tsx` |

### 9.2 Skeleton Approach

**Strategy:** Preserve as layout configuration reference

| Element | Treatment |
|---------|-----------|
| Layout structure | Preserved |
| Layout switching | Preserved |
| Demo content | May be neutralized |

**Rationale:** Layout variants demonstrate template capabilities. Core functionality preserved.

---

## 10. Settings Skeleton

### 10.1 Current State

Settings pages include user preferences, account settings, etc.

### 10.2 Skeleton Approach

**Strategy:** Empty forms awaiting user data

| Element | Treatment |
|---------|-----------|
| Settings layout | Preserved |
| Form structure | Preserved |
| Demo user data | To be cleared |
| Save functionality | Preserved (no-op without data) |

### 10.3 Skeleton Content (Conceptual)

```
Settings Title: "Settings"
User Avatar: Placeholder image
User Fields: Empty or placeholder text
Save Button: Preserved (inactive appearance)
```

---

## 11. Common Skeleton Elements

### 11.1 Page Header Pattern

All skeleton pages should display:

```
PageTitle Component: [Module Name]
Breadcrumb: Home > [Category] > [Module]
```

### 11.2 Empty State Pattern

Standard empty state message:

```
<div class="text-center text-muted py-4">
  <p>No data available</p>
</div>
```

### 11.3 Inactive Module Pattern

For clearly inactive modules:

```
<div class="text-center text-muted py-4">
  <p>Module available for future activation</p>
</div>
```

---

## 12. Routes to Maintain

All existing routes must continue to resolve:

| Route Pattern | Count | Status |
|---------------|-------|--------|
| `/admin/base-ui/*` | 21 | Preserved |
| `/admin/forms/*` | 5 | Preserved |
| `/admin/tables/*` | 2 | Preserved |
| `/admin/charts/*` | 1 | Preserved |
| `/admin/maps/*` | 2 | Preserved |
| `/admin/icons/*` | 2 | Preserved |
| `/admin/layouts/*` | 5 | Preserved |
| `/admin/auth/*` | 4 | Preserved (demo auth) |
| `/admin/dashboard` | 1 | Preserved |

**Total Routes:** 43+

---

## 13. Verification Checklist (For Future Execution)

To be verified after skeleton application:

- [ ] All routes resolve without 404
- [ ] All pages render without console errors
- [ ] No demo data visible on skeleton pages
- [ ] Page structure and layout preserved
- [ ] Theme toggle works on all pages
- [ ] Sidebar navigation works
- [ ] Responsive behavior preserved

---

## 14. Implementation Sequence (Conceptual — Not Authorized)

When execution is authorized, skeletons should be applied in this order:

1. Dashboard (highest visibility)
2. Settings pages
3. Tables modules
4. Charts module
5. Maps modules
6. Forms modules (if needed)
7. Base UI modules (lowest priority — may remain as reference)
8. Icons/Layouts (preserve as-is)

---

*Document Version: 1.0*
*Last Updated: Phase 3 Planning*
