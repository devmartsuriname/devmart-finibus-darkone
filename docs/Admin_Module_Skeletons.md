# Admin Module Skeletons — Devmart Platform

```
Status: AUTHORITATIVE
Phase: Phase 3 Alignment Complete
Execution: Documentation Only — Build Not Authorized
Last Updated: 2025-12-21
```

---

## 1. Purpose

This document defines the skeleton structure for **Devmart business modules**. Skeletons provide consistent placeholder patterns for Phase 3 implementation.

**Key Change:** This document has been rewritten to focus on Devmart business modules, not Darkone demo modules.

**Governance:**
- All skeleton definitions are conceptual
- Implementation requires explicit authorization
- Aligned with `Admin_Module_Map.md`

---

## 2. Skeleton Design Principles

| Principle | Description |
|-----------|-------------|
| Consistency | All modules use same placeholder patterns |
| Clarity | Obvious that module is "placeholder" vs "broken" |
| Minimalism | No demo data, no mock content |
| Professionalism | Clean, intentional appearance |
| Reusability | Darkone components may be reused |

---

## 3. Dashboard Skeleton

### 3.1 Specification

| Attribute | Value |
|-----------|-------|
| Route | `/admin/dashboard` |
| Placeholder Type | Coming Soon |
| Demo Data | None |

### 3.2 Skeleton Content

```
┌─────────────────────────────────────────────────┐
│ PageTitle: Admin Dashboard                      │
│ Breadcrumb: Home > Dashboard                    │
├─────────────────────────────────────────────────┤
│                                                 │
│           ┌───────────────────────┐             │
│           │                       │             │
│           │    Coming Soon        │             │
│           │                       │             │
│           │  The admin dashboard  │             │
│           │  is being prepared.   │             │
│           │                       │             │
│           └───────────────────────┘             │
│                                                 │
└─────────────────────────────────────────────────┘
```

### 3.3 Components to Reuse

- PageTitle component
- PageBreadcrumb component
- Card component (for container)

---

## 4. Content Module Skeletons

### 4.1 Blog / News

| Attribute | Value |
|-----------|-------|
| Route | `/admin/content/blog` |
| Placeholder Type | Empty Table |
| Demo Data | None |

**Skeleton Content:**
```
┌─────────────────────────────────────────────────┐
│ PageTitle: Blog Posts                           │
│ Breadcrumb: Home > Content > Blog               │
├─────────────────────────────────────────────────┤
│ [+ Add New Post]                     [inactive] │
├─────────────────────────────────────────────────┤
│ Title    │ Author  │ Date    │ Status │ Actions│
├──────────┼─────────┼─────────┼────────┼────────┤
│                                                 │
│              No blog posts yet                  │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

### 4.2 Projects / Portfolio

| Attribute | Value |
|-----------|-------|
| Route | `/admin/content/projects` |
| Placeholder Type | Empty Table |
| Demo Data | None |

**Skeleton Content:**
```
┌─────────────────────────────────────────────────┐
│ PageTitle: Projects                             │
│ Breadcrumb: Home > Content > Projects           │
├─────────────────────────────────────────────────┤
│ [+ Add New Project]                  [inactive] │
├─────────────────────────────────────────────────┤
│ Title    │ Category│ Date    │ Status │ Actions│
├──────────┼─────────┼─────────┼────────┼────────┤
│                                                 │
│              No projects yet                    │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

### 4.3 Pages (Static)

| Attribute | Value |
|-----------|-------|
| Route | `/admin/content/pages` |
| Placeholder Type | Empty Table |
| Demo Data | None |

**Skeleton Content:**
```
┌─────────────────────────────────────────────────┐
│ PageTitle: Pages                                │
│ Breadcrumb: Home > Content > Pages              │
├─────────────────────────────────────────────────┤
│ [+ Add New Page]                     [inactive] │
├─────────────────────────────────────────────────┤
│ Title    │ Slug    │ Updated │ Status │ Actions│
├──────────┼─────────┼─────────┼────────┼────────┤
│                                                 │
│              No pages yet                       │
│                                                 │
└─────────────────────────────────────────────────┘
```

**Note:** Pages + Sections expansion is NOT Phase 3.

---

### 4.4 Media Library

| Attribute | Value |
|-----------|-------|
| Route | `/admin/content/media` |
| Placeholder Type | Empty Grid |
| Demo Data | None |

**Skeleton Content:**
```
┌─────────────────────────────────────────────────┐
│ PageTitle: Media Library                        │
│ Breadcrumb: Home > Content > Media              │
├─────────────────────────────────────────────────┤
│ [Upload]                             [inactive] │
├─────────────────────────────────────────────────┤
│                                                 │
│        ┌─────────────────────────┐              │
│        │                         │              │
│        │  No media uploaded yet  │              │
│        │                         │              │
│        │     [Upload Files]      │              │
│        │                         │              │
│        └─────────────────────────┘              │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

### 4.5 Testimonials

| Attribute | Value |
|-----------|-------|
| Route | `/admin/content/testimonials` |
| Placeholder Type | Empty Table |
| Demo Data | None |

**Skeleton Content:**
```
┌─────────────────────────────────────────────────┐
│ PageTitle: Testimonials                         │
│ Breadcrumb: Home > Content > Testimonials       │
├─────────────────────────────────────────────────┤
│ [+ Add Testimonial]                  [inactive] │
├─────────────────────────────────────────────────┤
│ Name     │ Company │ Date    │ Status │ Actions│
├──────────┼─────────┼─────────┼────────┼────────┤
│                                                 │
│              No testimonials yet                │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## 5. CRM / Leads Skeleton

| Attribute | Value |
|-----------|-------|
| Route | `/admin/crm/leads` |
| Placeholder Type | Empty Table |
| Demo Data | None |

**Skeleton Content:**
```
┌─────────────────────────────────────────────────┐
│ PageTitle: Leads                                │
│ Breadcrumb: Home > CRM > Leads                  │
├─────────────────────────────────────────────────┤
│ [Export]                             [inactive] │
├─────────────────────────────────────────────────┤
│ Name     │ Email   │ Source  │ Date   │ Status │
├──────────┼─────────┼─────────┼────────┼────────┤
│                                                 │
│           No leads captured yet                 │
│                                                 │
└─────────────────────────────────────────────────┘
```

**Source Column Values (Later Phase):**
- Contact Form
- Quote Request
- Newsletter

---

## 6. Analytics Skeleton

| Attribute | Value |
|-----------|-------|
| Route | `/admin/analytics` |
| Placeholder Type | Coming Soon |
| Demo Data | None |

**Skeleton Content:**
```
┌─────────────────────────────────────────────────┐
│ PageTitle: Analytics                            │
│ Breadcrumb: Home > Analytics                    │
├─────────────────────────────────────────────────┤
│                                                 │
│           ┌───────────────────────┐             │
│           │                       │             │
│           │    Coming Soon        │             │
│           │                       │             │
│           │  Analytics will be    │             │
│           │  available soon.      │             │
│           │                       │             │
│           └───────────────────────┘             │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## 7. Settings Skeleton

| Attribute | Value |
|-----------|-------|
| Route | `/admin/settings` |
| Placeholder Type | Coming Soon |
| Demo Data | None |

**Skeleton Content:**
```
┌─────────────────────────────────────────────────┐
│ PageTitle: Settings                             │
│ Breadcrumb: Home > Settings                     │
├─────────────────────────────────────────────────┤
│                                                 │
│           ┌───────────────────────┐             │
│           │                       │             │
│           │    Coming Soon        │             │
│           │                       │             │
│           │  Settings will be     │             │
│           │  available soon.      │             │
│           │                       │             │
│           └───────────────────────┘             │
│           │                       │             │
│           │  Planned features:    │             │
│           │  • Branding           │             │
│           │  • SEO                │             │
│           │  • Integrations       │             │
│           │                       │             │
│           └───────────────────────┘             │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## 8. Common Skeleton Elements

### 8.1 Page Header Pattern

All skeleton pages should display:

```
PageTitle Component: [Module Name]
Breadcrumb: Home > [Section] > [Module]
```

### 8.2 Coming Soon Pattern

For placeholder modules:

```jsx
<Card>
  <CardBody className="text-center py-5">
    <h4 className="text-muted">Coming Soon</h4>
    <p className="text-muted mb-0">
      [Module description] is being prepared.
    </p>
  </CardBody>
</Card>
```

### 8.3 Empty Table Pattern

For content management modules:

```jsx
<Card>
  <CardHeader>
    <Button disabled>Add New</Button>
  </CardHeader>
  <CardBody>
    <Table>
      <thead>
        <tr>{/* Column headers */}</tr>
      </thead>
      <tbody>
        <tr>
          <td colSpan="5" className="text-center text-muted py-4">
            No [items] yet
          </td>
        </tr>
      </tbody>
    </Table>
  </CardBody>
</Card>
```

---

## 9. Darkone Demo Modules (Reference Only)

### 9.1 Status

Darkone demo modules are:
- **HIDDEN** from Devmart navigation
- **READ-ONLY** (no modifications)
- **REFERENCE** for component reuse

### 9.2 Reference Modules

| Category | Purpose |
|----------|---------|
| Base UI | Component patterns (Accordions, Alerts, Buttons, etc.) |
| Forms | Form patterns (Inputs, Validation, Wizard, etc.) |
| Tables | Table patterns (Basic, Grid.js) |
| Charts | Chart patterns (ApexCharts) |
| Maps | Map patterns (Vector, Google) |
| Icons | Icon libraries (Iconify, Lucide) |
| Layouts | Layout variants |

### 9.3 Reuse Guidelines

- ✅ Import Card, Table, Button components
- ✅ Reference styling patterns
- ❌ Modify original files
- ❌ Add to Devmart navigation

---

## 10. Devmart Routes Summary

| Route | Module | Skeleton Type |
|-------|--------|---------------|
| `/admin/dashboard` | Dashboard | Coming Soon |
| `/admin/content/blog` | Blog | Empty Table |
| `/admin/content/projects` | Projects | Empty Table |
| `/admin/content/pages` | Pages | Empty Table |
| `/admin/content/media` | Media | Empty Grid |
| `/admin/content/testimonials` | Testimonials | Empty Table |
| `/admin/crm/leads` | Leads | Empty Table |
| `/admin/analytics` | Analytics | Coming Soon |
| `/admin/settings` | Settings | Coming Soon |

**Total Routes:** 9

---

## 11. Verification Checklist (For Future Execution)

When skeletons are implemented:

- [ ] All 9 routes resolve without 404
- [ ] All pages render without console errors
- [ ] No demo data visible on any page
- [ ] Page structure and layout preserved
- [ ] Theme toggle works on all pages
- [ ] Sidebar navigation works
- [ ] Responsive behavior preserved
- [ ] PageTitle and Breadcrumb display correctly

---

## Document Control

| Version | Date | Author | Notes |
|---------|------|--------|-------|
| 1.0 | 2025-12-21 | Planning Agent | Rewritten for Devmart business modules |

**Supersedes:** Previous version with Darkone demo module focus.

**Alignment:** Must align with `Admin_Module_Map.md` (authoritative).
