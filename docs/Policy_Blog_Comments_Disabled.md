# Policy: Blog Comments Feature — Permanently Disabled

**Created:** 2025-12-31  
**Decision Authority:** Project Owner  
**Status:** PERMANENT — No Future Enablement Planned

---

## Decision Summary

Blog comments are **permanently disabled** for the Devmart public website. This is a policy decision, not a technical limitation.

---

## What Was Removed (Phase 2.2)

### Public Frontend
- ❌ Comments list section (removed from BlogDetailsPage)
- ❌ Comment submission form (removed from BlogDetailsPage)
- ❌ "Comments (01)" counter in blog post header (removed from BlogDetailsWrapper)

### Admin Backend
- ❌ No comment moderation UI exists
- ❌ No comment management features planned

---

## What Remains (Not Removed)

### Database
- ✅ `blog_comments` table exists (DEPRECATED)
- ✅ 8 seeded test comments preserved as historical data
- ✅ RLS policies remain (admin-only access)

**Rationale:** Keeping the table preserves schema history and avoids migration complexity. No production data loss risk since no real comments were ever collected.

---

## Why Comments Are Disabled

1. **Spam Risk:** Blog comments attract significant spam and require moderation resources
2. **Scope Control:** Devmart is a business/portfolio site, not a community platform
3. **Maintenance Burden:** Comment systems require ongoing moderation, anti-spam measures, and user management
4. **Alternative Channels:** Client engagement happens through dedicated contact forms and direct communication

---

## Future Considerations

If blog engagement features are ever reconsidered, alternatives to traditional comments include:
- Curated testimonials (already implemented)
- Contact form with topic selector
- Social media integration for discussions
- Third-party platforms (LinkedIn articles, etc.)

**These alternatives are NOT planned for implementation** — this note exists only for historical context.

---

## Technical Implementation

### Files Modified
- `apps/public/src/components/pages/blogDetails/BlogDetailsPage.tsx` — BlogDetailsComments import and usage removed
- `apps/public/src/components/pages/blogDetails/BlogDetailsWrapper.tsx` — Comment counter UI removed

### Files Preserved (Not Deleted)
- `apps/public/src/components/pages/blogDetails/BlogDetailsComments.tsx` — Component file retained for reference
- `finibus/src/components/pages/blogDetails/BlogDetailsComments.jsx` — Original template file unchanged

---

## Documentation References

- Architecture.md: Updated with comments deprecation note
- Backend.md: Updated with blog_comments table deprecation status
- This policy document: Authoritative source for the decision

---

## Compliance

This decision is **non-negotiable** and must be enforced in all future development:

- Do NOT re-enable comment functionality
- Do NOT build comment moderation features
- Do NOT add comment-related UI to public or admin interfaces
- Treat any request for comments as out of scope

**Exception:** Only a direct policy reversal from the project owner can override this decision.
