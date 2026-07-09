
# Portfolio v3 — Approved + Upvote Button

Approved v3 phases (content depth, SEO, perf, admin auth, analytics, polish) plus a new lightweight social signal on the Hero.

## New: "Upvote Me" button next to name

### UX
- Small pill button beside the Hero name: `▲ 1,234` (emoji: ▲ or 🔥 — pick one; default ▲).
- Click → count increments, button flips to active state `▼ 1,235` (unvote label on hover).
- Click again → count decrements, back to inactive.
- Optimistic UI; realtime updates so other visitors see the count tick live.
- Subtle pop animation on click (framer-motion `scale` spring).
- Respect `prefers-reduced-motion`.

### Vote persistence (browser cookie)
- On first vote, generate a `voter_id` (uuid) and store in a first-party cookie `sw_voter` (1-year expiry, `SameSite=Lax`).
- Also mirror to `localStorage` as a fallback if cookies are blocked.
- Server enforces one vote per `voter_id` via unique constraint. User can toggle (vote / unvote) anytime from the same browser.
- Clearing cookies = ability to vote again (accepted trade-off; no auth required).

### Data model
Table `site_votes`:
- `voter_id text primary key` (client-generated uuid)
- `created_at timestamptz default now()`

RLS: `SELECT` public (only used for count aggregation via view), `INSERT` and `DELETE` public but only for a row where `voter_id = <request-provided id>`. To avoid trusting the client with arbitrary deletes on other rows, route writes through an edge function `vote` that:
- `POST /vote { voter_id }` — inserts (idempotent on conflict do nothing) → returns new count.
- `DELETE /vote { voter_id }` — removes that row → returns new count.
- `GET /vote?voter_id=...` — returns `{ count, hasVoted }`.

The table itself gets RLS with no public write policies; the edge function uses the service role. Public read policy on a `votes_count` view (`select count(*)::int as count from site_votes`).

### Realtime
- Enable Postgres changes on `site_votes` (REPLICA IDENTITY FULL, add to `supabase_realtime`).
- Client subscribes and re-fetches the count on any change.

### Files
- Migration: create `site_votes` + view + RLS + realtime.
- Edge function: `supabase/functions/vote/index.ts`.
- New component: `src/components/UpvoteButton.tsx` (handles cookie, calls function, animates).
- Wire into `src/components/Hero.tsx` inline with the name.
- Admin panel: read-only "Total upvotes" stat in the analytics panel.

## Rollout order (updated)
1. **Upvote button** (small, self-contained, high-visibility win) — ships first.
2. Performance + SEO.
3. Case studies + README render.
4. Server-auth admin + audit log.
5. Analytics + reactions.
6. Command palette + polish.

Everything else from the previously approved v3 plan stays as-is.
