# Supabase migration workflow

The SQL files in `supabase/migrations` are the source of truth. Never make a
remote schema or policy change without adding the matching migration.

## Local development

1. Install or invoke the Supabase CLI.
2. Run `supabase start`.
3. Rebuild the local database with `supabase db reset`.
4. Create changes with `supabase migration new <name>`.
5. Validate with `supabase db lint` and another `supabase db reset`.
6. Generate types:
   `supabase gen types typescript --local > lib/supabase/database.types.ts`.

Copy `.env.example` to `.env.local` and use the local API URL and publishable
key shown by `supabase status`. Never expose a secret/service-role key through
`NEXT_PUBLIC_*`.

## Remote deployment

1. Link once with `supabase link --project-ref <project-ref>`.
2. Inspect pending changes with `supabase migration list`.
3. Preview with `supabase db push --dry-run`.
4. Apply with `supabase db push`.
5. Generate checked-in remote types:
   `supabase gen types typescript --linked > lib/supabase/database.types.ts`.

For an existing remote project, run `supabase db pull` first and review the
generated baseline before pushing. Do not use `db reset` against a remote
project.

