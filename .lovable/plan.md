
## Portfolio v2 — Approved plan + admin/UI additions

I'll ship this in a single build pass. Adds the three items you just asked for on top of the previously approved plan.

---

### Immediate fixes (do first, before any features)

1. **YouTube videos not showing** — root cause found: the hard-coded `CHANNEL_ID` (`UCJKa8oXWMoHYh1qxTsPeQBw`) is wrong. Edge-function logs show `Upstream 404`, and the browser proxy fallback is blocked by CORS. Correct ID for `@bound-by-code` = `UCIf9XVT_MbyZpi5v0SrvXRg`.
   - Replace in `src/lib/youtube.ts` and `supabase/functions/youtube-feed/index.ts`.
   - Redeploy `youtube-feed`.
   - Fix `querySelector("yt\\:videoId")` (fails in some browsers) with `getElementsByTagNameNS` fallback.
   - Add a "Refresh Videos" button in Admin that re-invokes the edge function and shows the current thumbnails so you can verify without leaving the panel.

2. **Runtime crash `.select(...).order is not a function`** — the stub client (`src/integrations/supabase/client.ts`, dev-only when env is missing) returns non-chainable async methods. Rewrite the stub so every builder method (`select/insert/update/upsert/delete/eq/neq/gt/gte/lt/lte/order/limit/single/maybeSingle/in/or/match`) returns a thenable chainable, resolving to `{ data: [], error: null }`.

3. **HireMe background** — the current `TopographicBackground` renders grey topo lines from `lightingColor="#ffffff"`. Switch to a pure-black tonal pattern:
   - Change the white filter's `lightingColor` to a very dark grey (`#0a0a0a`) and lower opacity, keep the red channel for accent — result: black-on-black embossed topo with faint red veins. No grey anywhere.

### Admin panel upgrade

- **Tabbed layout** (Projects · Featured Order · Skills · YouTube · Site Settings) — removes the endless scroll.
- **Featured project ordering**: drag or ↑/↓ buttons on the 3 featured cards, persisted to `featured_projects.position`; `PopularProjectsSlider` sorts by it.
- **Bulk skill add**: paste comma-separated list → one insert batch.
- **YouTube tab**: shows the 12 latest videos pulled from the edge function with a "Refresh cache" button and channel-ID display for sanity.
- **GitHub tab polish**: sort dropdown (updated / stars / name), keyboard-focus fixes, live counter for featured (`2/3`).
- **Site Settings**: existing toggles + new "HireMe pattern intensity" slider (writes to `site_settings`, HireMe reads it).
- **Session**: keep the `121212` gate as-is for now (server-side hardening is in section 6 below).

### 1. Bug backlog (from approved plan)
- Runtime stub fix (above).
- Regenerate MCP entry (`supabase/functions/mcp/index.ts` currently imports a Windows absolute path).

### 2. Data hardening
- Add `updated_at` triggers on `featured_projects`, `site_settings`.
- Add `user_roles` + `has_role()` migration (for future server-side admin auth; not wired to the UI yet — this keeps the `121212` flow working today).

### 3. Feature depth
- Project detail: live README via GitHub API + rendered markdown, language bar, latest 5 commits, open-issue count.
- `case_studies` table (optional per project, section only renders when populated).
- `status` single-row "current focus" strip under Hero, editable from admin.
- Contact: copy-to-clipboard on email, WhatsApp deep-link with prefilled message.
- ⌘K command palette (cmdk) over projects + skills + pages.
- Per-project view counter via `project-view` edge function.

### 4. Performance
- Convert big PNGs to AVIF/WebP with `vite-imagetools`; preload LCP image.
- `React.lazy` for `Admin`, `ProjectDetail`, `AchievementsPage`, `ContactPage`.
- Remove duplicate fixed backgrounds on Home (`CyberBackground` + `FrameAnimationBackground` overlap).
- `viewport={{ once: true, margin: "-10%" }}` everywhere.
- Preconnect to Google Fonts, `font-display: swap`.
- Session-storage cache (1h) for GitHub API responses.

### 5. SEO & AI-search
- `<SEO>` component using `react-helmet-async` — per-route title/description/canonical/og.
- JSON-LD: `Person` on `/`, `CreativeWork` per project, `BreadcrumbList` on inner routes.
- Build-time sitemap generation from routes + projects.
- Add `/llms.txt`.
- Run `seo_chat--list_findings`, fix each, mark fixed.

### 6. Security
- Run `security--run_security_scan`, address every finding.
- Move admin secret server-side later (edge function `admin-auth`) once `user_roles` is wired; current `121212` gate stays until then.
- Verify no service-role key or DB URL in client bundle.

### 7. UI polish
- Standardize section rhythm (`py-24 md:py-32`).
- Mobile nav: solid backdrop when scrolled; fix hero overlap.
- Reduce `.text-glow` on body copy, keep on H1/H2 only.
- Wire `ScrollProgress` globally.
- Empty states for Blog/Projects on fetch failure.

### 8. Tests
- Playwright smoke on all routes for zero-console-error.
- Vitest for `formatRepoName`, YouTube parser, `useSiteSettings`.

---

### Technical notes
- New files: `src/components/SEO.tsx`, `src/components/CommandPalette.tsx`, `src/lib/githubCache.ts`, `supabase/functions/project-view/index.ts`, migrations for `case_studies`, `status`, `project_views`, `user_roles`.
- Modified: `client.ts` (stub), `youtube.ts` + `youtube-feed/index.ts` (channel ID + parser), `Admin.tsx` (tabs + ordering + YT tab), `TopographicBackground.tsx` (black tones), `App.tsx` (lazy + Helmet provider), `Home.tsx` (dedupe backgrounds), `ProjectDetail.tsx`, `index.html`.
- Deps: `react-helmet-async`, `cmdk`, `vite-imagetools`.

Switching to build mode next — I'll start with the YouTube fix, the runtime crash, and the HireMe pattern so you see visible results first, then work down the list.
