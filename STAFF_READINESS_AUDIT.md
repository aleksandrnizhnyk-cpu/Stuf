# STAFF — readiness audit and implementation plan

Audit date: 2026-11-22
Working branch: `work/staff-completion`
Baseline: `feature/staff-ecosystem`
Vercel project: `stuf` (Vite)
Repository: `aleksandrnizhnyk-cpu/Stuf`

## Confirmed current state

- The project is a Vite + React application, not a Next.js app.
- The current interface contains a homepage, marketplace, store directory, community, forum, cart, and seller-application modal.
- Magazine, Music, Events, and About currently render a generic placeholder rather than a finished section.
- Store and product examples are hard-coded in the client. The app attempts to read `stores`, `products`, and `forum_topics` from Supabase.
- Authentication is implemented in `src/components/StaffAuth.jsx` using Supabase email/password sign-in, signup, password reset, and sign-out.
- The frontend reads `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in `src/lib/supabaseClient.js`.
- Existing preview deployment on `feature/staff-ecosystem` is READY. Its Supabase environment variables were scoped only to that branch; equivalent preview-only variables have now been configured for this isolated working branch.
- The connected Supabase project named `staff` is ACTIVE_HEALTHY, but the public schema currently reports no tables. This must be reconciled with the app's expected data model before any database-backed feature can be considered operational.

## Work sequence

1. Establish a reproducible baseline and verify this branch's Vercel preview/build.
2. Map the existing UI and user flows; preserve the current approved visual direction and avoid redesigning the homepage without explicit approval.
3. Reconcile the app's data model with the intended Supabase project. Prepare migrations and RLS policies for review; do not apply schema changes to the live database without explicit approval.
4. Complete authentication and account/profile flows, including error, loading, empty, and mobile states.
5. Replace demo-only marketplace/store/forum data with validated database-backed flows.
6. Implement seller applications and admin review workflow.
7. Complete Community, Magazine, Music, Events, About, and account areas; remove misleading placeholder claims.
8. Run build and functional checks, inspect preview, and report remaining blockers.
9. Request approval before any production deployment, merge, or live database migration.

## Guardrails

- This branch is isolated from the existing preview branch and production.
- Do not merge to the production branch or promote a deployment without explicit user approval.
- Do not alter the approved homepage design without explicit user approval.
- Do not apply database migrations or destructive data changes without explicit user approval.
- Never put Supabase service-role keys or other server secrets in browser code.
