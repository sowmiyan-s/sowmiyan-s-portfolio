import { ReactNode } from 'react';
import SmoothScroll from '@/components/common/SmoothScroll';

const SiteLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <SmoothScroll />

      <main id="main-content" className="relative z-10 w-full min-h-screen">
        {children}
      </main>
    </>
  );
};

export default SiteLayout;
