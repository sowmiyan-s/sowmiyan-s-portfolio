import { ReactNode, Suspense, lazy } from 'react';
import SmoothScroll from '@/components/SmoothScroll';

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
      {children}
    </>
  );
};

export default SiteLayout;
