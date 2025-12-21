# Master PRD — Devmart Platform

**Status:** Draft  
**Phase:** Planning Only  
**Execution:** Not Authorized  

---

## 1. Document References

This PRD is derived from and must remain aligned with:

- **Devmart Strategic Positioning** — Authority statement, market position, competitive differentiation
- **Devmart Capability Framework** — Service tiers, engagement models, deliverables
- **Website & Brand PRD** — Conversion goals, content hierarchy, messaging

---

## 2. Platform Overview

The Devmart platform consists of two isolated applications:

| Application | Template Source | Purpose |
|-------------|-----------------|---------|
| **Public Website** | Finibus React | Client-facing marketing, lead generation, authority positioning |
| **Admin Portal** | Darkone React | Internal operations, future client dashboards, content management |

---

## 3. Strategic Alignment

### 3.1 Authority Statement (from Strategic Positioning)

> "Devmart is the authority in outcome-driven digital solutions — trusted by enterprises and scale-ups to transform complexity into competitive advantage."

All public-facing content must reinforce this positioning.

### 3.2 Capability Framework Integration

The public website must present:

- **Three Service Tiers:** Foundation, Growth, Enterprise
- **Engagement Models:** Project-based, Retainer, Embedded
- **Proof Points:** Case studies, metrics, client outcomes

### 3.3 Conversion Goals (from Website & Brand PRD)

| Goal | Priority |
|------|----------|
| Consultation booking | Primary |
| Lead capture | Secondary |
| Content engagement | Tertiary |

---

## 4. Public Website Scope (Finibus)

### 4.1 Core Pages

- Homepage (Variant A — Agency style)
- Homepage (Variant B — Creative style)
- About Us
- Services (with capability framework mapping)
- Projects / Portfolio
- Blog
- Contact

### 4.2 UI Modules Required

- Hero sections with CTAs
- Service cards
- Project showcases
- Testimonial sliders
- Counter/stats sections
- Team member displays
- Contact forms
- Blog listing and detail views

### 4.3 Parity Rules

- **1:1 layout parity** with Finibus reference
- Content replacement only
- No structural modifications
- No custom components beyond template

---

## 5. Admin Portal Scope (Darkone)

### 5.1 Current State (Demo)

- Dashboard module (preserved)
- Sidebar navigation (preserved)
- Demo authentication (fake-backend)
- Demo UI modules (placeholders)

### 5.2 Future State (Planned)

- Real authentication (Supabase)
- Content management
- Lead/inquiry management
- Analytics dashboards
- Client portal access

**STATUS: Future state is NOT IMPLEMENTED**

---

## 6. Content Hierarchy

From Website & Brand PRD:

1. **Authority Reinforcement** — Every page must establish expertise
2. **Outcome Focus** — Benefits over features
3. **Clear CTAs** — Consultation booking prioritized
4. **Social Proof** — Case studies, testimonials, metrics

---

## 7. Non-Functional Requirements

| Requirement | Specification |
|-------------|---------------|
| Responsive | Mobile-first, all breakpoints |
| Performance | Core Web Vitals compliance |
| Accessibility | WCAG 2.1 AA target |
| SEO | Meta tags, structured data, semantic HTML |

---

## 8. Out of Scope (This Phase)

- Backend implementation
- Authentication implementation
- Database integration
- Payment processing
- Client portal features
- Custom module development

---

## 9. Success Criteria

Phase 2 is complete when:

1. Public website achieves 1:1 Finibus layout parity
2. Content reflects Devmart positioning and capabilities
3. All core pages are functional
4. Admin portal preserves dashboard/navigation structure
5. No template customizations beyond content

---

## Document Control

| Version | Date | Author | Notes |
|---------|------|--------|-------|
| 0.1 | 2025-01-XX | Planning Agent | Initial draft |

**Next Review:** After Phase 2 execution approval
