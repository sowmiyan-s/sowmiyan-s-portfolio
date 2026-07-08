import { ReactNode, Suspense, lazy } from 'react';
import SmoothScroll from '@/components/SmoothScroll';
import HUDOverlay from '@/components/HUDOverlay';

// Lazy-load heavy background layers so first paint is HTML, not WebGL.
const CyberBackground = lazy(() => import('@/components/CyberBackground'));
const FrameAnimationBackground = lazy(() => import('@/components/FrameAnimationBackground'));

/**
 * Persistent app shell. Mounted once above <Routes>, so switching pages
 * never remounts the WebGL canvas or scroll-driven video (no blink/flash).
 */
const SiteLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <SmoothScroll />
      <Suspense fallback={null}>
        <CyberBackground />
        <FrameAnimationBackground />
      </Suspense>
      <HUDOverlay />
      <div className="relative z-10 w-full min-h-screen">
        {children}
      </div>
    </>
  );
};

export default SiteLayout;
