# Phase 4D — URL Normalization Plan

**Status:** PLANNING COMPLETE — EXECUTION NOT AUTHORIZED  
**Phase:** Documentation Only  
**Created:** 2025-12-31  
**Execution:** NOT AUTHORIZED

---

## 1. Overview

This document defines the URL normalization strategy for migrating canonical URLs from `https://devmart.co` to `https://devmart.sr` and aligning path patterns with Finibus routing conventions.

**This is a PLANNING DOCUMENT ONLY. No execution is authorized.**

---

## 2. Current State Analysis

### 2.1 Domain Status

| Setting | Value |
|---------|-------|
| Current canonical URLs | `https://devmart.co/...` |
| Production domain | `https://devmart.sr` |
| Status | INTENTIONAL MISMATCH |
| Reason | Canonical URLs populated before production domain finalized |

### 2.2 Existing Canonical URL Patterns

| Module | Current Pattern | Records |
|--------|-----------------|---------|
| Services | `https://devmart.co/services/{slug}` | 7 |
| Projects | `https://devmart.co/projects/{slug}` | 5 published |
| Blog Posts | `/blog/{slug}` (relative) | 6 |
| Pages | NULL or inconsistent | 6 |

### 2.3 Path Pattern Issues

| Module | Current Path | Finibus Route | Mismatch |
|--------|--------------|---------------|----------|
| Services | `/services/{slug}` | `/service-details/{slug}` | ❌ YES |
| Projects | `/projects/{slug}` | `/project-details/{slug}` | ❌ YES |
| Blog | `/blog/{slug}` | `/blog/{slug}` | ✅ OK |
| Pages | Inconsistent | `/{slug}` | ⚠️ Needs standardization |

---

## 3. Target State Definition

### 3.1 Domain Standard

**Production Domain:** `https://devmart.sr`

All canonical URLs must use the production domain as the authority.

### 3.2 Path Pattern Standards

| Module | Target Pattern | Example |
|--------|----------------|---------|
| Services | `/service-details/{slug}` | `https://devmart.sr/service-details/web-design` |
| Projects | `/project-details/{slug}` | `https://devmart.sr/project-details/national-digital-services-portal` |
| Blog | `/blog/{slug}` | `https://devmart.sr/blog/building-scalable-web-applications-2025` |
| Pages | `/{slug}` | `https://devmart.sr/about` |

### 3.3 Canonical URL Behavior

| Behavior | Implementation |
|----------|----------------|
| Format | Absolute URLs only (include full domain) |
| Storage | Stored in database per-record |
| Enforcement | Meta tags only (no server-side redirects) |
| Rendering | Phase 5 public wiring (not yet implemented) |

---

## 4. Prepared SQL Statements

**⚠️ DOCUMENTATION ONLY — DO NOT EXECUTE**

These statements are prepared for future execution when Phase 4D execution is explicitly authorized.

### 4.1 Services — Domain and Path Normalization

```sql
-- DOCUMENTATION ONLY — DO NOT EXECUTE
-- Services: Update domain from devmart.co to devmart.sr
-- Services: Update path from /services/ to /service-details/
UPDATE services 
SET canonical_url = REPLACE(
  REPLACE(canonical_url, 'https://devmart.co', 'https://devmart.sr'),
  '/services/', '/service-details/'
)
WHERE canonical_url IS NOT NULL;
```

### 4.2 Projects — Domain and Path Normalization

```sql
-- DOCUMENTATION ONLY — DO NOT EXECUTE
-- Projects: Update domain from devmart.co to devmart.sr
-- Projects: Update path from /projects/ to /project-details/
UPDATE projects 
SET canonical_url = REPLACE(
  REPLACE(canonical_url, 'https://devmart.co', 'https://devmart.sr'),
  '/projects/', '/project-details/'
)
WHERE canonical_url IS NOT NULL;
```

### 4.3 Blog Posts — Convert Relative to Absolute URLs

```sql
-- DOCUMENTATION ONLY — DO NOT EXECUTE
-- Blog: Convert relative URLs to absolute with production domain
UPDATE blog_posts 
SET canonical_url = CONCAT('https://devmart.sr', canonical_url)
WHERE canonical_url IS NOT NULL 
  AND canonical_url NOT LIKE 'https://%';
```

### 4.4 Pages — Set Canonical URLs

```sql
-- DOCUMENTATION ONLY — DO NOT EXECUTE
-- Pages: Set canonical URLs for pages without them
UPDATE pages 
SET canonical_url = CONCAT('https://devmart.sr/', slug)
WHERE canonical_url IS NULL 
  AND is_published = true;
```

---

## 5. Execution Prerequisites

**ALL prerequisites must be met before execution can be authorized:**

| # | Prerequisite | Status |
|---|--------------|--------|
| 1 | Phase 4D planning document complete | ✅ COMPLETE |
| 2 | SEO Governance updated with canonical URL standards | ✅ COMPLETE |
| 3 | Tasks.md reflects Phase 4D planning status | ✅ COMPLETE |
| 4 | Architecture.md documents URL normalization approach | ✅ COMPLETE |
| 5 | Domain ownership for devmart.sr confirmed | ⏳ PENDING |
| 6 | DNS configuration for devmart.sr verified | ⏳ PENDING |
| 7 | SSL certificate for devmart.sr active | ⏳ PENDING |
| 8 | Explicit GO authorization from project owner | ⏳ PENDING |

---

## 6. Verification Criteria

**When execution is authorized, these criteria must be verified:**

### 6.1 Data Verification

| Check | Expected Result |
|-------|-----------------|
| Services canonical_url | All use `https://devmart.sr/service-details/{slug}` |
| Projects canonical_url | All use `https://devmart.sr/project-details/{slug}` |
| Blog canonical_url | All use `https://devmart.sr/blog/{slug}` |
| Pages canonical_url | All use `https://devmart.sr/{slug}` |
| No NULL canonical_url | All published records have canonical URLs |

### 6.2 Integrity Verification

| Check | Expected Result |
|-------|-----------------|
| Frontend routing | UNCHANGED |
| Public rendering | UNCHANGED |
| Admin functionality | UNCHANGED |
| Schema structure | UNCHANGED (data update only) |

---

## 7. Guardian Rules (Binding)

**The following are PROHIBITED during Phase 4D execution:**

| Rule | Constraint |
|------|------------|
| Frontend public | DO NOT MODIFY |
| Routing | DO NOT CHANGE |
| Schema | NO NEW COLUMNS |
| Migrations | DATA UPDATES ONLY |
| Redirects | NOT IMPLEMENTED |
| URL enforcement | CANONICAL STORED ONLY |
| DNS changes | OUT OF SCOPE |
| SSL configuration | OUT OF SCOPE |

---

## 8. Scope Exclusions

**The following are explicitly OUT OF SCOPE for Phase 4D:**

- Server-side redirects (nginx, Apache, edge functions)
- .htaccess configuration
- DNS configuration
- SSL certificate provisioning
- Public frontend code changes
- Routing modifications
- Layout or UI changes
- New database columns or tables

---

## 9. Rollback Procedure

**If issues occur during execution:**

1. STOP immediately
2. Do not attempt fixes
3. Revert using SQL:

```sql
-- ROLLBACK ONLY — USE IF EXECUTION FAILS
-- Revert services
UPDATE services 
SET canonical_url = REPLACE(
  REPLACE(canonical_url, 'https://devmart.sr', 'https://devmart.co'),
  '/service-details/', '/services/'
)
WHERE canonical_url LIKE '%devmart.sr%';

-- Revert projects
UPDATE projects 
SET canonical_url = REPLACE(
  REPLACE(canonical_url, 'https://devmart.sr', 'https://devmart.co'),
  '/project-details/', '/projects/'
)
WHERE canonical_url LIKE '%devmart.sr%';

-- Revert blog posts (more complex — requires original relative format)
-- Manual review required for blog rollback
```

4. Report issue to project owner
5. Await further instructions

---

## 10. Phase Status

**Phase 4D: PLANNING COMPLETE — EXECUTION NOT AUTHORIZED**

No data modifications, code changes, or URL normalization will occur until explicit execution authorization is granted.

---

## 11. Next Steps (Deferred)

When Phase 4D execution is authorized:

1. Execute prepared SQL statements
2. Verify all canonical URLs match target patterns
3. Verify frontend/admin functionality unchanged
4. Document execution results
5. Create restore point

**HARD STOP — Await explicit authorization before any execution.**
