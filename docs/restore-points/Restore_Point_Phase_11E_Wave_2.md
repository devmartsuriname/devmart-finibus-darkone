# Restore Point — Phase 11E Wave 2

**Created:** 2025-12-27  
**Phase:** 11E — Wave 2 (Visual Completion)  
**Status:** ACTIVE

---

## Purpose

Complete the Phase 11E visual migration by updating the base `$theme-color` variable from Finibus red to Devmart green, ensuring all gradient fallbacks compile to green.

---

## Scope

**File Modified:** `apps/public/src/assets/sass/_variables.scss`

### Before State (Line 8)
```scss
$theme-color: #D90A2C;
```

### After State (Line 8)
```scss
$theme-color: #1EB36B;
```

### Effect on Derived Token
- `$theme-color-dark: darken($theme-color, 25%)`
- Before: Computed as dark red
- After: Computed as dark green

---

## Governance Note

- `$theme-color-dark` remains a **Phase 11E-scoped** derived token
- This change does NOT authorize general reuse of the updated `$theme-color`
- Only Phase 11E surfaces (Wave 1 selectors) are affected

---

## Affected Selectors (via Wave 1)

| Selector | File | Line |
|----------|------|------|
| `.project-filter-tab li.active` | `_project_page.scss` | 46 |
| `.project-filter-tab li:hover` | `_project_page.scss` | 50 |
| `.nav-pills .nav-link:hover` | `_service_page.scss` | 183 |
| `.nav-pills .nav-link.active` | `_service_page.scss` | 190 |

---

## Rollback Instructions

To revert Wave 2 changes:

1. Open `apps/public/src/assets/sass/_variables.scss`
2. Locate line 8
3. Replace:
   ```scss
   $theme-color: #1EB36B;
   ```
   With:
   ```scss
   $theme-color: #D90A2C;
   ```
4. Save file
5. Verify SCSS compilation: 0 errors
6. Visual verification: gradients should revert to red

---

## Out of Scope (Preserved)

The following remain untouched and are reserved for future phases:
- `_service_page.scss` line 249 (`.single-price-box h3:before`) — Phase 11G
- `_service_page.scss` line 310 (`.pay-btn a`) — Phase 11F

---

## Related Documents

- `docs/restore-points/Restore_Point_Phase_11E_Wave_1.md`
- `docs/phase-11/Phase_11E_11F_11G_Specifications.md`
