# Portfolio Polish — Motion, 3D, Cross-Platform

## Goals
1. Kill the sudden blink/flash between sections and route changes.
2. Add refined 3D + advanced motion (not gimmicky) inspired by Framer templates.
3. Consistent look on desktop, tablet, mobile.

## 1. Fix the "sudden blink" (highest priority)
Root causes in the current code:
- `AnimatePresence` around a disabled loader still mounts/unmounts a full-screen black overlay in `App.tsx`.
- Each page re-mounts its own `CyberBackground` (three.js `Canvas`), so route changes tear down and rebuild WebGL → 1-frame black flash.
- `FrameAnimationBackground` swaps large frames without preloading.
- Sections stack heavy `motion` `whileInView` with `once:false`, retriggering on scroll.

Fixes:
- Remove the dead loader block from `App.tsx`.
- Lift `CyberBackground` + `FrameAnimationBackground` into a single persistent `<Layout>` wrapper that lives above `<Routes>`, so the canvas never unmounts between routes.
- Wrap `<Routes>` in framer-motion `AnimatePresence mode="wait"` with a 250ms crossfade page transition (opacity only, no y-shift) to eliminate hard cuts.
- Add `<html style="background:#000">` + `#root{background:#000}` and set `color-scheme: dark` so the browser never paints a white frame before React mounts.
- Preload the LCP hero frame with `<link rel="preload" as="image">` in `index.html`.
- Convert `once:false` viewport animations to `once:true, amount:0.2`.

## 2. Advanced motion layer (Framer-template feel)
Add, used sparingly:
- **Lenis** smooth scroll (already-approved-style momentum) wired through a `SmoothScroll` provider — respects `prefers-reduced-motion`.
- **framer-motion** `useScroll` + `useTransform` for parallax on Hero title, Skills grid, and HireMe.
- **Magnetic buttons** + **cursor-follow spotlight** upgrade to existing `CustomCursor`.
- **Text reveal** via `SplitText`-style component (per-word mask), replacing some `ScrambleText` uses on section headings for variety.
- **View transitions** for project cards → detail page (shared layoutId on thumbnail).

## 3. Three.js upgrades
Replace/augment existing scenes with tasteful ones:
- **Hero**: swap the flat particle rain for a subtle **instanced wireframe globe** with red latitude lines slowly rotating; mouse parallax; DPR clamped to `[1, 1.5]`; paused when tab hidden.
- **Global background**: unified `SceneBackground.tsx` mounted once at the layout level; sections just adjust intensity via context (no remount).
- **Projects slider**: hover tilt on cards using `react-three-fiber` distortion plane behind the featured project only (mobile falls back to a static gradient).
- Add `<Suspense fallback={null}>` around every `Canvas` and lazy-load them with `React.lazy` so first paint is HTML, not WebGL.

## 4. Cross-platform / responsive pass
- Detect `matchMedia('(hover:none)')` and disable custom cursor, Lenis, heavy shaders on touch devices.
- Clamp typography with `clamp()` (already partial) across Skills, Projects, Footer.
- Test breakpoints 360 / 768 / 1024 / 1440 with Playwright screenshots and fix overflow.
- Add safe-area padding for iOS notches (`env(safe-area-inset-*)`).
- Reduce `three` particle counts by 50% on `< md` and when `navigator.hardwareConcurrency <= 4`.

## 5. Cleanup
- Remove unused `CyberBackground` duplicates from individual pages after layout lift.
- Consolidate section vertical rhythm to `py-20 md:py-28`.
- Drop the `bg-[linear-gradient(...)]` scanline duplication into a single `<Scanlines/>` component.

## Technical details
New deps: `@studio-freight/lenis`, `three` (already in), `@react-three/fiber@^8.18`, `@react-three/drei@^9.122` (pin versions — required for React 18).
New files: `src/components/layout/SiteLayout.tsx`, `src/components/three/SceneBackground.tsx`, `src/components/three/WireGlobe.tsx`, `src/components/SmoothScroll.tsx` (rewrite), `src/components/motion/RevealText.tsx`, `src/components/motion/MagneticButton.tsx`, `src/components/PageTransition.tsx`.
Edited: `src/App.tsx`, `src/pages/*.tsx` (remove per-page backgrounds), `src/index.css`, `index.html`, `src/components/CustomCursor.tsx`, `src/components/Hero.tsx`.

## Out of scope (ask if you want them)
- Replacing framer-motion with GSAP (memory says never GSAP — keeping framer-motion + Lenis).
- Redesigning content/copy.

Proceed with all of the above?
