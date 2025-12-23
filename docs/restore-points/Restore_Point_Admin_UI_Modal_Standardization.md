# Restore Point — Admin UI Modal Standardization

```
Created: 2025-12-23
Phase: Admin UI Consistency Hotfix
Status: ACTIVE
```

---

## 1. Scope

Standardize all admin content CRUD modals to match the Services modal reference implementation.

### 1.1 Modules In Scope

| Module | Modal File | Change |
|--------|------------|--------|
| Pages | `src/app/(admin)/content/pages/components/PageEditModal.tsx` | `size="lg"` → `size="xl"` |
| Testimonials | `src/app/(admin)/content/testimonials/components/TestimonialModal.tsx` | `size="lg"` → `size="xl"` |
| Leads | `src/app/(admin)/crm/leads/components/LeadDetailModal.tsx` | `size="lg"` → `size="xl"` |

### 1.2 Modules Excluded

| Module | Reason |
|--------|--------|
| Media Library | Explicitly excluded per guardrails |
| Blog | Deferred to Blog wiring phase |
| Settings | Not modal-based (tab page) |

---

## 2. Gold Standard Reference

**File:** `src/app/(admin)/content/services/components/ServiceModal.tsx`

### 2.1 Modal Shell Pattern

```tsx
<Modal show={show} onHide={handleClose} centered size="xl">
  <Modal.Header closeButton className="border-bottom">
    <Modal.Title as="h5">{title}</Modal.Title>
  </Modal.Header>

  <Modal.Body>
    {/* Form content */}
  </Modal.Body>

  <Modal.Footer className="border-top">
    <Button variant="secondary" onClick={handleClose} disabled={isSaving}>
      Cancel
    </Button>
    <Button variant="primary" onClick={handleSubmit} disabled={isSaving}>
      {isSaving ? (
        <>
          <Spinner size="sm" className="me-1" />
          Saving...
        </>
      ) : (
        'Save Changes' // or 'Add [Entity]' for create mode
      )}
    </Button>
  </Modal.Footer>
</Modal>
```

### 2.2 Required Attributes

| Attribute | Required Value |
|-----------|----------------|
| Modal Size | `size="xl"` |
| Header | `closeButton className="border-bottom"` |
| Title | `as="h5"` |
| Footer | `className="border-top"` |
| Cancel Button | `variant="secondary"` (left) |
| Save Button | `variant="primary"` (right) |
| Button Order | Cancel → Save (left to right) |

---

## 3. Changes Applied

### 3.1 PageEditModal.tsx (Line 72)

**Before:**
```tsx
<Modal show={show} onHide={onClose} centered size="lg">
```

**After:**
```tsx
<Modal show={show} onHide={onClose} centered size="xl">
```

Header/Footer already compliant.

### 3.2 TestimonialModal.tsx (Line 130)

**Before:**
```tsx
<Modal show={show} onHide={handleClose} centered size="lg">
```

**After:**
```tsx
<Modal show={show} onHide={handleClose} centered size="xl">
```

Header/Footer already compliant.

### 3.3 LeadDetailModal.tsx (Line 73)

**Before:**
```tsx
<Modal show={show} onHide={handleClose} centered size="lg">
```

**After:**
```tsx
<Modal show={show} onHide={handleClose} centered size="xl">
```

Header/Footer already compliant.

---

## 4. Rollback Instructions

To revert to previous state, change `size="xl"` back to `size="lg"` in:

1. `src/app/(admin)/content/pages/components/PageEditModal.tsx` (line 72)
2. `src/app/(admin)/content/testimonials/components/TestimonialModal.tsx` (line 130)
3. `src/app/(admin)/crm/leads/components/LeadDetailModal.tsx` (line 73)

---

## 5. Verification Checklist

| Check | Status |
|-------|--------|
| Pages modal size="xl" | ⏳ |
| Testimonials modal size="xl" | ⏳ |
| Leads modal size="xl" | ⏳ |
| All modals match Services width | ⏳ |
| Header layout matches Services | ⏳ |
| Footer layout matches Services | ⏳ |
| Button order: Cancel → Save | ⏳ |
| No console errors | ⏳ |
| No Media Library changes | ✅ |
| No apps/public changes | ✅ |
| Documentation updated | ⏳ |
