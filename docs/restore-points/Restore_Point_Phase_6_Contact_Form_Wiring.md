# Restore Point — Phase 6: Contact Form Wiring

```
Status: ACTIVE
Created: 2025-12-24
Phase: Phase 6 Contact Form Wiring
```

---

## 1. Purpose

Snapshot before wiring the public Contact page form to Supabase `leads` table.

---

## 2. Current State Before Changes

### 2.1 Contact Form Component

| File | Status |
|------|--------|
| `apps/public/src/components/pages/contact/ContactForm.tsx` | Static form, no DB wiring |

**Current Behavior:**
- Form prevents default submit (`onSubmit={(e) => e.preventDefault()}`)
- No state management for form fields
- No validation
- No DB insertion
- No success/error messaging

### 2.2 Database State

| Table | RLS | Notes |
|-------|-----|-------|
| `public.leads` | Public INSERT (anon), Admin SELECT/UPDATE | Already exists |

**Leads Table Columns:**
- `id` (UUID, default)
- `name` (TEXT, required)
- `email` (TEXT, required)
- `subject` (TEXT, optional)
- `message` (TEXT, optional)
- `source` (TEXT, default 'contact_form')
- `status` (TEXT, default 'new')
- `notes` (TEXT, optional)
- `created_at` (TIMESTAMPTZ, default now)
- `updated_at` (TIMESTAMPTZ, default now)

### 2.3 Supabase Client

| File | Status |
|------|--------|
| `apps/public/src/lib/supabase.ts` | ✅ Exists |

### 2.4 Footer Contacts (Pre-Change Snapshot)

| Element | Value |
|---------|-------|
| Phone 1 | +880 566 1111 985 |
| Phone 2 | +880 657 1111 576 |
| Email 1 | info@example.com |
| Email 2 | info@support.com |
| Address | 168/170, Avenue 01, Mirpur DOHS, Bangladesh |

**Status:** Static values, NOT wired to DB.

---

## 3. Success Criteria for Phase 6

| Criterion | Expected |
|-----------|----------|
| Form submits to `leads` table | ✅ |
| `source` = 'contact_form' | ✅ |
| Client-side validation (name, email, message required) | ✅ |
| Honeypot anti-spam | ✅ (silent drop) |
| Success message shown | ✅ (no layout shift) |
| Error message shown | ✅ (no layout shift) |
| Double-submit prevention | ✅ |
| No visual/layout changes | ✅ |
| No CSS changes | ✅ |
| No new libraries | ✅ |
| Footer unchanged | ✅ |
| Admin Leads shows new record | ✅ |

---

## 4. Rollback Instructions

If Phase 6 fails, restore `ContactForm.tsx` to this version:

```tsx
import React from "react";

function ContactForm() {
  return (
    <>
      <div className="contact-information">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-xl-6">
              <div className="contact-form">
                <h3>Have Any Questions</h3>
                <form
                  onSubmit={(e) => e.preventDefault()}
                  action="#"
                  method="post"
                >
                  <div className="row">
                    <div className="col-12">
                      <input
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                      />
                    </div>
                    <div className="col-xl-6">
                      <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                      />
                    </div>
                    <div className="col-xl-6">
                      <input type="text" name="subject" placeholder="Subject" />
                    </div>
                    <div className="col-12">
                      <textarea
                        name="message"
                        cols={30}
                        rows={10}
                        placeholder="Your message"
                        defaultValue={""}
                      />
                    </div>
                    <div className="col-12">
                      <input type="submit" defaultValue="Send Message" />
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-6 col-xl-6">
              <div className="google-map">
                <iframe
                  title="Google Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.3701967527613!2d90.39056151540181!3d23.734174695311943!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8c1f25e613d%3A0xaad562eec578f8ff!2sArts%20Faculty%2C%20Dhaka%201205!5e0!3m2!1sen!2sbd!4v1644381552436!5m2!1sen!2sbd"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactForm;
```

---

## 5. Files to Be Modified

| File | Action |
|------|--------|
| `apps/public/src/components/pages/contact/ContactForm.tsx` | EDIT |
| `docs/Backend.md` | UPDATE |
| `docs/Architecture.md` | UPDATE |

---

## 6. Guardian Rules

- ✅ apps/public ONLY
- ✅ No CSS changes
- ✅ No markup refactors
- ✅ No new libraries
- ✅ No schema changes
- ✅ No new tables
- ✅ No admin changes
