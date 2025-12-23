# Restore Point — Phase 4 CRM/Leads Module

```
Created: 2025-12-23
Goal: Implement Leads admin view + status/notes management
Frontend Status: LOCKED — NOT TOUCHED
```

---

## 1. Scope

### 1.1 Files to Create

| File | Purpose |
|------|---------|
| `supabase/migrations/XXXXXX_leads.sql` | Leads table + RLS |
| `src/app/(admin)/crm/leads/hooks/useLeads.ts` | Data hook (fetch + update) |
| `src/app/(admin)/crm/leads/components/LeadDetailModal.tsx` | View/Edit modal |

### 1.2 Files to Modify

| File | Change |
|------|--------|
| `src/app/(admin)/crm/leads/page.tsx` | Replace placeholder with list view |
| `docs/Backend.md` | Add leads table schema + RLS |
| `docs/Architecture.md` | Update module status |

### 1.3 NOT Touched

- All frontend/public files
- All other admin modules
- Authentication components
- Routing configuration

---

## 2. Database Changes

### 2.1 Table: leads

| Column | Type | Notes |
|--------|------|-------|
| id | uuid | Primary key |
| name | text | Required |
| email | text | Required |
| subject | text | Nullable |
| message | text | Nullable |
| source | text | Default 'contact_form' |
| status | text | new/contacted/qualified/closed |
| notes | text | Admin internal |
| created_at | timestamptz | Auto |
| updated_at | timestamptz | Auto |

### 2.2 RLS Policies

| Policy | Operation | Role |
|--------|-----------|------|
| Public can submit leads | INSERT | anon |
| Admins can view all leads | SELECT | admin |
| Admins can update leads | UPDATE | admin |

**Explicitly NOT created:**
- Public SELECT/UPDATE/DELETE
- Admin INSERT/DELETE

---

## 3. Rollback Steps

1. Delete migration file (if not yet applied)
2. OR run reverse migration:
   ```sql
   DROP TABLE IF EXISTS public.leads CASCADE;
   ```
3. Delete new files:
   - `src/app/(admin)/crm/leads/hooks/useLeads.ts`
   - `src/app/(admin)/crm/leads/components/LeadDetailModal.tsx`
4. Restore `page.tsx` to placeholder:
   ```tsx
   import Footer from '@/components/layout/Footer'
   import PageTitle from '@/components/PageTitle'
   import EmptyTablePlaceholder from '@/components/placeholders/EmptyTablePlaceholder'

   const LeadsPage = () => {
     return (
       <>
         <PageTitle subName="CRM" title="Leads" />
         <EmptyTablePlaceholder 
           title="Leads" 
           columns={['Name', 'Email', 'Source', 'Date', 'Status']}
           emptyMessage="No leads captured yet"
         />
         <Footer />
       </>
     )
   }

   export default LeadsPage
   ```
5. Revert docs/Backend.md and docs/Architecture.md changes

---

## 4. Verification Checklist

- [ ] Leads table exists in Supabase
- [ ] RLS: Public can INSERT only
- [ ] RLS: Admin can SELECT + UPDATE only
- [ ] RLS: No DELETE policies
- [ ] Admin list loads without errors
- [ ] Status dropdown updates persist
- [ ] Notes textarea updates persist
- [ ] No "Add Lead" button
- [ ] No "Delete" action
- [ ] Console error-free

---

## Document Control

| Version | Date | Author | Notes |
|---------|------|--------|-------|
| 1.0 | 2025-12-23 | Implementation Agent | Initial restore point |
