# Restore Point — Phase 11C Wave W4

**Created:** 2025-12-27  
**Phase:** 11C (Branding Surfaces)  
**Wave:** W4 (Final Wave)  
**Status:** IMPLEMENTATION IN PROGRESS

---

## Scope

**Total Selectors Modified:** 3  
**Files Affected:** 2

---

## Selectors Modified

### 1. `_portfolio.scss` — Line 206

**Selector:** `.portfolio-hover a.case-btn` border

**BEFORE:**
```scss
border: 1px solid #D90A2C;
```

**AFTER:**
```scss
border: 1px solid var(--theme-color, $theme-color);
```

**Rollback:** Replace the AFTER with BEFORE at line 206

---

### 2. `_services.scss` — Line 130

**Selector:** `.service-icon i` background-color

**BEFORE:**
```scss
background-color: #D90A2C;
```

**AFTER:**
```scss
background-color: var(--theme-color, $theme-color);
```

**Rollback:** Replace the AFTER with BEFORE at line 130

---

### 3. `_services.scss` — Line 231

**Selector:** `.service-content a` color

**BEFORE:**
```scss
color: #D90A2C;
```

**AFTER:**
```scss
color: var(--theme-color, $theme-color);
```

**Rollback:** Replace the AFTER with BEFORE at line 231

---

## Rollback Instructions

### Per-File Rollback

**File: `apps/public/src/assets/sass/_portfolio.scss`**
```bash
# Line 206: Restore border value
sed -i '206s/var(--theme-color, $theme-color)/#D90A2C/' apps/public/src/assets/sass/_portfolio.scss
```

**File: `apps/public/src/assets/sass/_services.scss`**
```bash
# Line 130: Restore background-color value
sed -i '130s/var(--theme-color, $theme-color)/#D90A2C/' apps/public/src/assets/sass/_services.scss

# Line 231: Restore color value
sed -i '231s/var(--theme-color, $theme-color)/#D90A2C/' apps/public/src/assets/sass/_services.scss
```

---

## Verification Checklist

- [ ] SCSS compiles without errors
- [ ] Console shows 0 errors
- [ ] Visual verification on `/` route
- [ ] Visual verification on `/service` route
- [ ] Visual verification on `/project` route
- [ ] Visual verification on `/project-details/:slug` route

---

## Guardian Rules Compliance

- ✅ No font changes
- ✅ No gradient changes
- ✅ No text-stroke changes
- ✅ No pseudo-element changes
- ✅ No alpha-hex changes
- ✅ No admin SCSS changes
- ✅ No refactors
- ✅ Fallback pattern used: `var(--theme-color, $theme-color)`
