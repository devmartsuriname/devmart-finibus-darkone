# Darkone Reusability Registry

```
Status: Draft
Phase: Planning Only
Execution: Not Authorized
```

---

## 1. Purpose

This document provides a comprehensive inventory of all reusable components in the Darkone Admin template. Each component is catalogued with metadata to ensure safe preservation during cleanup phases.

**Critical Rule:** No component may be removed or modified until verified against this registry.

---

## 2. Registry Format

Each entry includes:

| Field | Description |
|-------|-------------|
| Component Name | Exact component name |
| File Path | Path from `Darkone-React_v1.0/src/` |
| Category | Functional category |
| Current Usage | Where currently used |
| Future Reuse Potential | High / Medium / Low |
| Removal Risk | Impact if removed |
| Dependencies | Required by / Requires |
| Demo Data Coupling | None / Low / High |
| Preservation Status | Must Preserve / Review / Safe to Modify |

---

## 3. Layout Components

### 3.1 AdminLayout

| Field | Value |
|-------|-------|
| Component Name | `AdminLayout` |
| File Path | `layouts/AdminLayout.tsx` |
| Category | Layout |
| Current Usage | Wraps all admin pages |
| Future Reuse Potential | High |
| Removal Risk | Critical — breaks entire admin |
| Dependencies | TopNav, VerticalNav, Footer |
| Demo Data Coupling | None |
| Preservation Status | Must Preserve |

### 3.2 AuthLayout

| Field | Value |
|-------|-------|
| Component Name | `AuthLayout` |
| File Path | `layouts/AuthLayout.tsx` |
| Category | Layout |
| Current Usage | Wraps auth pages |
| Future Reuse Potential | High |
| Removal Risk | Critical — breaks auth flow |
| Dependencies | None |
| Demo Data Coupling | None |
| Preservation Status | Must Preserve |

### 3.3 Footer

| Field | Value |
|-------|-------|
| Component Name | `Footer` |
| File Path | `layouts/Footer.tsx` |
| Category | Layout |
| Current Usage | Admin footer |
| Future Reuse Potential | High |
| Removal Risk | Medium — visual only |
| Dependencies | None |
| Demo Data Coupling | None |
| Preservation Status | Must Preserve |

---

## 4. Navigation Components

### 4.1 TopNav

| Field | Value |
|-------|-------|
| Component Name | `TopNav` |
| File Path | `layouts/TopNav/index.tsx` |
| Category | Navigation |
| Current Usage | Admin header navigation |
| Future Reuse Potential | High |
| Removal Risk | Critical — breaks navigation |
| Dependencies | LeftSideBarToggle, ThemeModeToggle, Notifications, ProfileDropdown |
| Demo Data Coupling | Low (notifications data) |
| Preservation Status | Must Preserve |

### 4.2 VerticalNav

| Field | Value |
|-------|-------|
| Component Name | `VerticalNav` |
| File Path | `layouts/VerticalNav/index.tsx` |
| Category | Navigation |
| Current Usage | Sidebar navigation |
| Future Reuse Potential | High |
| Removal Risk | Critical — breaks menu |
| Dependencies | LogoBox, AppMenu, SimplebarReactClient |
| Demo Data Coupling | None |
| Preservation Status | Must Preserve |

### 4.3 AppMenu

| Field | Value |
|-------|-------|
| Component Name | `AppMenu` |
| File Path | `layouts/VerticalNav/AppMenu.tsx` |
| Category | Navigation |
| Current Usage | Sidebar menu items |
| Future Reuse Potential | High |
| Removal Risk | Critical — breaks navigation |
| Dependencies | MENU_ITEMS constant |
| Demo Data Coupling | Low (menu structure) |
| Preservation Status | Must Preserve |

---

## 5. TopNav Sub-Components

### 5.1 Notifications

| Field | Value |
|-------|-------|
| Component Name | `Notifications` |
| File Path | `layouts/TopNav/Notifications.tsx` |
| Category | Navigation |
| Current Usage | Notification dropdown |
| Future Reuse Potential | High |
| Removal Risk | Low — feature component |
| Dependencies | notificationsData |
| Demo Data Coupling | High |
| Preservation Status | Must Preserve (neutralize data) |

### 5.2 ProfileDropdown

| Field | Value |
|-------|-------|
| Component Name | `ProfileDropdown` |
| File Path | `layouts/TopNav/ProfileDropdown.tsx` |
| Category | Navigation |
| Current Usage | User profile menu |
| Future Reuse Potential | High |
| Removal Risk | Medium — breaks logout |
| Dependencies | AuthContext |
| Demo Data Coupling | Medium |
| Preservation Status | Must Preserve |

### 5.3 ThemeModeToggle

| Field | Value |
|-------|-------|
| Component Name | `ThemeModeToggle` |
| File Path | `layouts/TopNav/ThemeModeToggle.tsx` |
| Category | Navigation |
| Current Usage | Dark/light mode toggle |
| Future Reuse Potential | High |
| Removal Risk | Low — feature component |
| Dependencies | ThemeContext |
| Demo Data Coupling | None |
| Preservation Status | Must Preserve |

### 5.4 LeftSideBarToggle

| Field | Value |
|-------|-------|
| Component Name | `LeftSideBarToggle` |
| File Path | `layouts/TopNav/LeftSideBarToggle.tsx` |
| Category | Navigation |
| Current Usage | Sidebar toggle button |
| Future Reuse Potential | High |
| Removal Risk | Medium — breaks responsive |
| Dependencies | LayoutContext |
| Demo Data Coupling | None |
| Preservation Status | Must Preserve |

---

## 6. Dashboard Components

### 6.1 Cards

| Field | Value |
|-------|-------|
| Component Name | `Cards` |
| File Path | `app/admin/dashboard/components/Cards.tsx` |
| Category | Dashboard |
| Current Usage | Dashboard metric cards |
| Future Reuse Potential | High |
| Removal Risk | Medium — dashboard feature |
| Dependencies | cardsData |
| Demo Data Coupling | High |
| Preservation Status | Must Preserve (neutralize data) |

### 6.2 Chart

| Field | Value |
|-------|-------|
| Component Name | `Chart` |
| File Path | `app/admin/dashboard/components/Chart.tsx` |
| Category | Dashboard |
| Current Usage | Dashboard main chart |
| Future Reuse Potential | High |
| Removal Risk | Medium — dashboard feature |
| Dependencies | ApexCharts |
| Demo Data Coupling | High |
| Preservation Status | Must Preserve (neutralize data) |

### 6.3 SaleChart

| Field | Value |
|-------|-------|
| Component Name | `SaleChart` |
| File Path | `app/admin/dashboard/components/SaleChart.tsx` |
| Category | Dashboard |
| Current Usage | Sales chart widget |
| Future Reuse Potential | High |
| Removal Risk | Medium — dashboard feature |
| Dependencies | ApexCharts |
| Demo Data Coupling | High |
| Preservation Status | Must Preserve (neutralize data) |

### 6.4 CountryMap

| Field | Value |
|-------|-------|
| Component Name | `CountryMap` |
| File Path | `app/admin/dashboard/components/CountryMap.tsx` |
| Category | Dashboard |
| Current Usage | Geographic data display |
| Future Reuse Potential | High |
| Removal Risk | Medium — dashboard feature |
| Dependencies | jsvectormap |
| Demo Data Coupling | High |
| Preservation Status | Must Preserve (neutralize data) |

### 6.5 User

| Field | Value |
|-------|-------|
| Component Name | `User` |
| File Path | `app/admin/dashboard/components/User.tsx` |
| Category | Dashboard |
| Current Usage | User list widget |
| Future Reuse Potential | High |
| Removal Risk | Low — optional widget |
| Dependencies | None |
| Demo Data Coupling | High |
| Preservation Status | Must Preserve (neutralize data) |

---

## 7. Chart Components (ApexCharts)

### 7.1 ReactApexChart (Wrapper)

| Field | Value |
|-------|-------|
| Component Name | `ReactApexChart` |
| File Path | External (react-apexcharts) |
| Category | Charts |
| Current Usage | All chart rendering |
| Future Reuse Potential | High |
| Removal Risk | Critical — breaks all charts |
| Dependencies | apexcharts |
| Demo Data Coupling | None (wrapper only) |
| Preservation Status | Must Preserve |

---

## 8. Map Components (Vector Maps)

### 8.1 WorldMap

| Field | Value |
|-------|-------|
| Component Name | `WorldMap` |
| File Path | `components/VectorMap/WorldMap.tsx` |
| Category | Maps |
| Current Usage | World map display |
| Future Reuse Potential | High |
| Removal Risk | Low — feature component |
| Dependencies | jsvectormap |
| Demo Data Coupling | None |
| Preservation Status | Must Preserve |

### 8.2 Additional Map Variants

| Component | File Path | Preservation Status |
|-----------|-----------|---------------------|
| CanadaMap | `components/VectorMap/CanadaMap.tsx` | Must Preserve |
| IraqMap | `components/VectorMap/IraqMap.tsx` | Must Preserve |
| RussiaMap | `components/VectorMap/RussiaMap.tsx` | Must Preserve |
| SpainMap | `components/VectorMap/SpainMap.tsx` | Must Preserve |
| UsaMap | `components/VectorMap/UsaMap.tsx` | Must Preserve |

---

## 9. Utility Components

### 9.1 IconifyIcon

| Field | Value |
|-------|-------|
| Component Name | `IconifyIcon` |
| File Path | `components/wrappers/IconifyIcon.tsx` |
| Category | Utility |
| Current Usage | All icon rendering |
| Future Reuse Potential | High |
| Removal Risk | Critical — breaks icons |
| Dependencies | @iconify/react |
| Demo Data Coupling | None |
| Preservation Status | Must Preserve |

### 9.2 LogoBox

| Field | Value |
|-------|-------|
| Component Name | `LogoBox` |
| File Path | `components/LogoBox.tsx` |
| Category | Utility |
| Current Usage | Logo display |
| Future Reuse Potential | High |
| Removal Risk | Medium — branding |
| Dependencies | None |
| Demo Data Coupling | None |
| Preservation Status | Must Preserve |

### 9.3 PageTitle

| Field | Value |
|-------|-------|
| Component Name | `PageTitle` |
| File Path | `components/PageTitle.tsx` |
| Category | Utility |
| Current Usage | Page headers |
| Future Reuse Potential | High |
| Removal Risk | Low — visual only |
| Dependencies | react-helmet-async |
| Demo Data Coupling | None |
| Preservation Status | Must Preserve |

### 9.4 Preloader

| Field | Value |
|-------|-------|
| Component Name | `Preloader` |
| File Path | `components/Preloader.tsx` |
| Category | Utility |
| Current Usage | Loading states |
| Future Reuse Potential | High |
| Removal Risk | Low — UX component |
| Dependencies | None |
| Demo Data Coupling | None |
| Preservation Status | Must Preserve |

---

## 10. Context Providers

| Context | File Path | Purpose | Preservation Status |
|---------|-----------|---------|---------------------|
| AuthContext | `context/useAuthContext.tsx` | Authentication state | Must Preserve |
| LayoutContext | `context/useLayoutContext.tsx` | Layout configuration | Must Preserve |
| ThemeContext | `context/useThemeContext.tsx` | Theme management | Must Preserve |
| LayoutMenuContext | `context/useLayoutMenuContext.tsx` | Menu state | Must Preserve |
| NotificationContext | `context/useNotificationContext.tsx` | Notification state | Must Preserve |

---

## 11. Custom Hooks

| Hook | File Path | Purpose | Preservation Status |
|------|-----------|---------|---------------------|
| useToggle | `hooks/useToggle.ts` | Boolean toggle state | Must Preserve |
| useViewPort | `hooks/useViewPort.ts` | Viewport detection | Must Preserve |
| Additional hooks | `hooks/` | Various utilities | Must Preserve |

---

## 12. Demo Data Elements (To Be Neutralized)

| Element | Location | Coupling Level | Action Required |
|---------|----------|----------------|-----------------|
| fakeUsers | `helpers/fakeUsers.ts` | High | To be emptied during Phase 3 execution |
| cardsData | Dashboard components | High | To be replaced with placeholders |
| notificationsData | TopNav/Notifications | High | To be replaced with empty array |
| MENU_ITEMS | VerticalNav constants | Low | To be preserved (structure only) |
| Chart series data | Dashboard charts | High | To be replaced with empty state |

---

## 13. Summary Statistics

| Category | Count | Must Preserve | Review Required |
|----------|-------|---------------|-----------------|
| Layout Components | 3 | 3 | 0 |
| Navigation Components | 3 | 3 | 0 |
| TopNav Sub-Components | 4 | 4 | 0 |
| Dashboard Components | 5 | 5 | 0 |
| Chart Components | 1 | 1 | 0 |
| Map Components | 6 | 6 | 0 |
| Utility Components | 4 | 4 | 0 |
| Context Providers | 5 | 5 | 0 |
| Custom Hooks | 2+ | All | 0 |
| **Total** | **33+** | **33+** | **0** |

---

*Document Version: 1.0*
*Last Updated: Phase 3 Planning*
