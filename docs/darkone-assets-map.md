# Darkone Assets Map — Reusable Component Inventory

**Status:** Draft  
**Phase:** Planning Only  
**Execution:** Not Authorized  

---

## Purpose

This document inventories ALL reusable assets in the Darkone admin template. This mapping must exist before any cleanup or deletion occurs.

**Nothing may be deleted before this mapping is reviewed and approved.**

---

## 1. Chart Components

### 1.1 Library

| Package | Version | Purpose |
|---------|---------|---------|
| `apexcharts` | ^4.7.0 | Chart rendering |
| `react-apexcharts` | ^1.9.0 | React wrapper |

### 1.2 Components

| Component | Location | Type |
|-----------|----------|------|
| `Chart.tsx` | `src/components/Chart.tsx` | Generic ApexChart wrapper |
| Chart examples | `src/app/charts/` | Demo implementations |

### 1.3 Chart Types Available

- Area charts
- Bar charts
- Line charts
- Pie/Donut charts
- Radial charts
- Mixed charts
- Candlestick charts

---

## 2. Icon System

### 2.1 Libraries

| Package | Version | Purpose |
|---------|---------|---------|
| `@iconify/react` | ^5.2.1 | Universal icon component |

### 2.2 Icon Sets Used

| Set | Prefix | Usage |
|-----|--------|-------|
| Solar Icons | `solar:` | Primary UI icons |
| Box Icons | `bx:` | Secondary icons |
| Mingcute | `mingcute:` | Menu icons |
| Material Symbols | `material-symbols:` | Utility icons |

### 2.3 Wrapper Component

| Component | Location | Purpose |
|-----------|----------|---------|
| `IconifyIcon.tsx` | `src/components/IconifyIcon.tsx` | Standardized icon rendering |

---

## 3. UI Widgets (Base UI)

### 3.1 Component Inventory

| Component | Location | Reusable |
|-----------|----------|----------|
| Accordion | `src/app/base-ui/accordion/` | ✅ Pattern |
| Alerts | `src/app/base-ui/alerts/` | ✅ Pattern |
| Avatar | `src/app/base-ui/avatar/` | ✅ Pattern |
| Badge | `src/app/base-ui/badge/` | ✅ Pattern |
| Breadcrumb | `src/app/base-ui/breadcrumb/` | ✅ Pattern |
| Buttons | `src/app/base-ui/buttons/` | ✅ Pattern |
| Cards | `src/app/base-ui/cards/` | ✅ Pattern |
| Carousel | `src/app/base-ui/carousel/` | ✅ Pattern |
| Collapse | `src/app/base-ui/collapse/` | ✅ Pattern |
| Dropdown | `src/app/base-ui/dropdown/` | ✅ Pattern |
| List Group | `src/app/base-ui/list-group/` | ✅ Pattern |
| Modals | `src/app/base-ui/modals/` | ✅ Pattern |
| Tabs | `src/app/base-ui/tabs/` | ✅ Pattern |
| Offcanvas | `src/app/base-ui/offcanvas/` | ✅ Pattern |
| Pagination | `src/app/base-ui/pagination/` | ✅ Pattern |
| Placeholders | `src/app/base-ui/placeholders/` | ✅ Pattern |
| Popovers | `src/app/base-ui/popovers/` | ✅ Pattern |
| Progress | `src/app/base-ui/progress/` | ✅ Pattern |
| Spinners | `src/app/base-ui/spinners/` | ✅ Pattern |
| Toasts | `src/app/base-ui/toasts/` | ✅ Pattern |
| Tooltips | `src/app/base-ui/tooltips/` | ✅ Pattern |

### 3.2 React Bootstrap Foundation

| Package | Version |
|---------|---------|
| `react-bootstrap` | ^2.10.10 |
| `bootstrap` | ^5.3.3 |

---

## 4. Layout Components

### 4.1 Core Layouts

| Component | Location | Purpose |
|-----------|----------|---------|
| `AdminLayout.tsx` | `src/layouts/AdminLayout.tsx` | Main admin wrapper |
| `AuthLayout.tsx` | `src/layouts/AuthLayout.tsx` | Auth pages wrapper |

### 4.2 Navigation Components

| Component | Location | Purpose |
|-----------|----------|---------|
| `TopNavigationBar/` | `src/components/TopNavigationBar/` | Top header bar |
| `VerticalNavigationBar/` | `src/components/VerticalNavigationBar/` | Sidebar navigation |
| `AppMenu.tsx` | `src/components/VerticalNavigationBar/AppMenu.tsx` | Menu rendering |
| `Footer.tsx` | `src/components/Footer.tsx` | Page footer |

### 4.3 TopNavigationBar Sub-components

| Component | Purpose |
|-----------|---------|
| `SearchBar` | Global search |
| `LanguageDropdown` | Language selector |
| `NotificationDropdown` | Notifications |
| `AppsDropdown` | Quick app access |
| `ThemeToggle` | Dark/light mode |
| `UserProfileDropdown` | User menu |

---

## 5. Wrapper Components

| Component | Location | Purpose |
|-----------|----------|---------|
| `IconifyIcon.tsx` | `src/components/` | Icon rendering |
| `LogoBox.tsx` | `src/components/` | Logo display |
| `SimplebarReactClient.tsx` | `src/components/` | Custom scrollbar |
| `AppProvidersWrapper.tsx` | `src/components/` | Context providers |
| `ComponentContainerCard.tsx` | `src/components/` | Demo container |

---

## 6. Utility Components

| Component | Location | Purpose |
|-----------|----------|---------|
| `PageTitle.tsx` | `src/components/` | Page titles + breadcrumb |
| `Preloader.tsx` | `src/components/` | Loading screen |
| `Spinner.tsx` | `src/components/` | Loading indicator |
| `FallbackLoading.tsx` | `src/components/` | Suspense fallback |
| `AnimationStar.tsx` | `src/components/` | Star animation |
| `ThemeCustomizer.tsx` | `src/components/` | Theme settings panel |

---

## 7. Map Components

### 7.1 Vector Maps

| Component | Location |
|-----------|----------|
| `BaseVectorMap.tsx` | `src/components/VectorMap/` |
| `WorldMap.tsx` | `src/components/VectorMap/` |
| `CanadaMap.tsx` | `src/components/VectorMap/` |
| `SpainMap.tsx` | `src/components/VectorMap/` |
| `RussiaMap.tsx` | `src/components/VectorMap/` |
| `IraqVectorMap.tsx` | `src/components/VectorMap/` |

### 7.2 Library

| Package | Version |
|---------|---------|
| `jsvectormap` | ^1.3.2 |

---

## 8. Form Components

### 8.1 Form Patterns

| Pattern | Location | Purpose |
|---------|----------|---------|
| Basic inputs | `src/app/forms/basic-elements/` | Input examples |
| Date picker | `src/app/forms/flatpickr/` | Date selection |
| Validation | `src/app/forms/validation/` | Form validation |
| File upload | `src/app/forms/file-uploads/` | Dropzone upload |
| Rich editor | `src/app/forms/editors/` | Quill editor |

### 8.2 Libraries

| Package | Version | Purpose |
|---------|---------|---------|
| `react-hook-form` | ^7.61.1 | Form state |
| `yup` | ^1.7.1 | Validation |
| `zod` | ^3.25.76 | Validation |
| `react-flatpickr` | ^3.10.13 | Date picker |
| `react-dropzone` | ^14.3.8 | File upload |
| `react-quill` | ^2.0.0 | Rich text |
| `choices.js` | ^11.1.0 | Select enhancement |
| `react-select` | ^5.10.2 | Select component |

---

## 9. Table Components

### 9.1 Table Patterns

| Pattern | Location | Purpose |
|---------|----------|---------|
| Basic tables | `src/app/tables/basic-tables/` | Static tables |
| Grid.js | `src/app/tables/grid-js/` | Advanced tables |

### 9.2 Libraries

| Package | Version | Purpose |
|---------|---------|---------|
| `gridjs` | ^6.2.0 | Table library |
| `gridjs-react` | ^6.1.1 | React wrapper |

---

## 10. Custom Hooks

| Hook | Location | Purpose |
|------|----------|---------|
| `useFileUploader.ts` | `src/hooks/` | File upload logic |
| `useLocalStorage.ts` | `src/hooks/` | LocalStorage wrapper |
| `useModal.ts` | `src/hooks/` | Modal state |
| `useQueryParams.ts` | `src/hooks/` | URL params |
| `useToggle.ts` | `src/hooks/` | Boolean toggle |
| `useViewPort.ts` | `src/hooks/` | Viewport detection |

---

## 11. Context Providers

| Context | Location | Purpose |
|---------|----------|---------|
| `useLayoutContext.tsx` | `src/context/` | Layout settings |
| `useNotificationContext.tsx` | `src/context/` | Notifications |
| `useAuthContext.tsx` | `src/context/` | Authentication (demo) |

---

## 12. SCSS Structure

### 12.1 Directory Structure

```
src/assets/scss/
├── _variables.scss          # Theme variables
├── _custom.scss             # Custom overrides
├── app.scss                 # Main entry
├── config/                  # Configuration
│   └── dark-mode.scss
├── components/              # Component styles (24 files)
│   ├── _accordion.scss
│   ├── _alerts.scss
│   ├── _avatar.scss
│   ├── _badge.scss
│   ├── _breadcrumb.scss
│   ├── _buttons.scss
│   ├── _card.scss
│   ├── _dropdown.scss
│   ├── _forms.scss
│   ├── _modal.scss
│   ├── _nav.scss
│   ├── _offcanvas.scss
│   ├── _pagination.scss
│   ├── _popover.scss
│   ├── _progress.scss
│   ├── _reboot.scss
│   ├── _scrollspy.scss
│   ├── _tables.scss
│   ├── _toast.scss
│   ├── _tooltip.scss
│   ├── _type.scss
│   └── _utilities.scss
├── structure/               # Layout styles (5 files)
│   ├── _topbar.scss
│   ├── _sidebar.scss
│   ├── _footer.scss
│   ├── _page-title.scss
│   └── _general.scss
└── plugins/                 # Plugin styles (8 files)
    ├── _apex-chart.scss
    ├── _choices.scss
    ├── _flatpickr.scss
    ├── _gridjs.scss
    ├── _jsvectormap.scss
    ├── _quill.scss
    ├── _simplebar.scss
    └── _dropzone.scss
```

### 12.2 Theme Variables

Key customizable variables:

- Color palette
- Typography scale
- Spacing scale
- Border radius
- Shadow definitions
- Transition timings

---

## 13. Image Assets

### 13.1 Logos

| Asset | Location | Variants |
|-------|----------|----------|
| Logo | `src/assets/images/logo/` | Dark, light, small |

### 13.2 Users

| Asset | Location | Count |
|-------|----------|-------|
| Avatars | `src/assets/images/users/` | Multiple |

### 13.3 Brands

| Asset | Location | Purpose |
|-------|----------|---------|
| Brand logos | `src/assets/images/brands/` | Partner logos |

### 13.4 Illustrations

| Asset | Location | Purpose |
|-------|----------|---------|
| Error pages | `src/assets/images/` | 404, 500 SVGs |
| Maintenance | `src/assets/images/` | Maintenance SVG |

### 13.5 Backgrounds

| Asset | Location | Purpose |
|-------|----------|---------|
| Auth backgrounds | `src/assets/images/` | Login page |

---

## 14. Third-Party Integrations

| Integration | Package | Status |
|-------------|---------|--------|
| FullCalendar | `@fullcalendar/*` | Available |
| Google Maps | `google-maps-react` | Available |
| Recharts | `recharts` | Available |

---

## 15. Reuse Guidelines

### 15.1 Safe to Reuse

- All chart components
- All icon wrappers
- All layout components
- All navigation components
- All utility hooks
- All wrapper components
- SCSS structure and variables

### 15.2 Requires Modification

- Auth context (replace demo with Supabase)
- Demo data files
- Fake backend

### 15.3 Demo Only (Replace with Real)

- `fake-backend.ts`
- `fakeUsers` array
- Demo notification data
- Demo topbar data

---

## 16. Reusable Registry

| Category | Recommended Components | Path | Notes/Constraints |
|----------|------------------------|------|-------------------|
| Charts | `Chart.tsx` | `src/components/Chart.tsx` | Generic ApexChart wrapper; safe to reuse |
| Icons | `IconifyIcon.tsx` | `src/components/IconifyIcon.tsx` | Universal icon wrapper; safe to reuse |
| Layout | `AdminLayout.tsx` | `src/layouts/AdminLayout.tsx` | Core admin wrapper; preserve structure |
| Layout | `AuthLayout.tsx` | `src/layouts/AuthLayout.tsx` | Auth pages wrapper; requires auth migration |
| Navigation | `TopNavigationBar/` | `src/components/TopNavigationBar/` | Top header; demo data must be neutralized |
| Navigation | `VerticalNavigationBar/` | `src/components/VerticalNavigationBar/` | Sidebar; menu items can be updated |
| Navigation | `AppMenu.tsx` | `src/components/VerticalNavigationBar/AppMenu.tsx` | Menu rendering; safe to reuse |
| Navigation | `Footer.tsx` | `src/components/Footer.tsx` | Footer; safe to reuse |
| Wrappers | `LogoBox.tsx` | `src/components/LogoBox.tsx` | Logo display; safe to reuse |
| Wrappers | `SimplebarReactClient.tsx` | `src/components/SimplebarReactClient.tsx` | Scrollbar; safe to reuse |
| Wrappers | `AppProvidersWrapper.tsx` | `src/components/AppProvidersWrapper.tsx` | Context providers; safe to reuse |
| Utility | `PageTitle.tsx` | `src/components/PageTitle.tsx` | Page titles; safe to reuse |
| Utility | `Preloader.tsx` | `src/components/Preloader.tsx` | Loading screen; safe to reuse |
| Utility | `Spinner.tsx` | `src/components/Spinner.tsx` | Loading indicator; safe to reuse |
| Hooks | `useToggle.ts` | `src/hooks/useToggle.ts` | Boolean toggle; safe to reuse |
| Hooks | `useViewPort.ts` | `src/hooks/useViewPort.ts` | Viewport detection; safe to reuse |
| Hooks | `useModal.ts` | `src/hooks/useModal.ts` | Modal state; safe to reuse |
| Hooks | `useLocalStorage.ts` | `src/hooks/useLocalStorage.ts` | Storage wrapper; safe to reuse |
| Context | `useLayoutContext.tsx` | `src/context/useLayoutContext.tsx` | Layout settings; safe to reuse |
| Context | `useNotificationContext.tsx` | `src/context/useNotificationContext.tsx` | Notifications; demo data must be neutralized |
| Context | `useAuthContext.tsx` | `src/context/useAuthContext.tsx` | Auth; requires Supabase migration (Phase 4) |
| Maps | `BaseVectorMap.tsx` | `src/components/VectorMap/BaseVectorMap.tsx` | Vector maps; safe to reuse |
| Tables | Grid.js integration | `src/app/tables/grid-js/` | Pattern only; demo data must be neutralized |
| Forms | react-hook-form + yup/zod | Various | Pattern only; safe to reuse |

---

## Document Control

| Version | Date | Author | Notes |
|---------|------|--------|-------|
| 0.1 | 2025-01-XX | Planning Agent | Initial inventory |

**Next Review:** Before any cleanup execution
