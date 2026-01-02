# Phase 9 — Scope Lock Document
## Polish & Enhancements (Pre-Marketing)

---

## 1. Purpose of Phase 9

Phase 9 exists to **technically and visually finalize** the Devmart platform (Frontend + Backend) before any marketing, tracking, or external integrations (Phase 7D).

The objective is **stability, governance completeness, compliance, and polish** — not feature expansion or growth experiments.

**Phase 9 is the final engineering & UX consolidation phase.**

---

## 2. Phase 9 Core Principles (Non-Negotiable)

- No marketing integrations (Phase 7D remains LOCKED)
- No scope creep beyond what is explicitly defined here
- No layout redesigns or visual rework
- Darkone & Finibus parity must be preserved
- CMS wiring is allowed ONLY for content-level gaps
- All work must be gated, documented, and restorable

---

## 3. Phase 9 Structure Overview

Phase 9 is divided into **four controlled sub-phases**:

| Sub-Phase | Name | Priority | Focus |
|---------|------|----------|-------|
| 9A | Backend Governance Foundation | P0 | Security, roles, notifications |
| 9B | Frontend Content Wiring | P1 | Remove hardcoded content |
| 9C | Legal & System Pages | P1.5 | Compliance & trust |
| 9D | System Toggles & Final Polish | P2 | Operational readiness |

Each sub-phase requires:
- Explicit authorization
- Restore point creation
- Documentation updates
- Verification report

---

## 4. Phase 9A — Backend Governance Foundation (P0)

### In Scope

- Notifications system:
  - In-app notifications (Admin bell + list)
  - Email notifications
  - WhatsApp notifications (architectural support; provider finalization optional)

- User & Role Model:
  - Roles: `admin`, `editor`, `viewer`
  - Role-based access per module

- RLS Policies:
  - Explicit RLS per role
  - Verification of read/write boundaries

### Out of Scope

- Marketing automation
- Campaign-based notifications
- External analytics providers

### Acceptance Criteria

- Notifications fire correctly per channel
- Role boundaries enforced at DB and UI level
- No schema chaos or uncontrolled migrations

---

## 5. Phase 9B — Frontend Content Wiring (P1)

### In Scope

- Content-only GAPs as defined in GAP Registry
- CMS wiring for:
  - Headings
  - Labels
  - Static copy
- Footer copyright via Admin Settings

### Constraints

- NO layout changes
- NO CSS/SCSS changes
- NO component refactors

### Acceptance Criteria

- Visual parity preserved
- Hardcoded text removed where specified
- Content managed via CMS/settings only

---

## 6. Phase 9C — Legal & System Pages (P1.5)

### Pages to Create

- Privacy Policy
- Terms of Use
- Support Policy
- Terms of Service

### Implementation Rules

- Use Frontend_Uniformity_Library
- One shared layout pattern
- Content supplied by Devmart via Live Documents
- Data seeded by Lovable

### Acceptance Criteria

- Pages accessible via footer
- Content editable via CMS/settings (if applicable)
- No custom UI patterns introduced

---

## 7. Phase 9D — System Toggles & Final Polish (P2)

### In Scope

- “Coming Soon” / Maintenance Mode toggle:
  - Admin Settings (new tab or section)
  - Frontend conditional rendering

- Final polish:
  - UX micro-consistency
  - Copy alignment
  - State handling

### Acceptance Criteria

- Toggle works reliably
- No regressions frontend/backend
- QA checklist completed

---

## 8. Explicitly Out of Scope for Phase 9

- Phase 7D Marketing Integrations
- Blog search, pagination, filtering
- New dashboards or analytics
- New frontend layouts or themes
- Performance re-architecture

---

## 9. Phase 9 Completion Definition

Phase 9 is considered COMPLETE when:

- All authorized sub-phases are executed and verified
- All restore points exist
- Documentation reflects Phase 9 completion
- Platform is declared **Marketing-Ready**

---

## 10. Next Decision Gate

After this Scope Lock:

1. Explicit authorization of **Phase 9A (Backend)** OR **Phase 9C (Legal Pages)**
2. Execution instructions issued per sub-phase

No execution may begin without this authorization.

---

**Status:** Phase 9 SCOPE LOCKED (Pending Execution Authorization)

