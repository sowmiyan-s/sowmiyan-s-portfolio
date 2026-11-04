import { ReactNode } from 'react';
import SmoothScroll from '@/components/common/SmoothScroll';
import CouncilCursor from '@/components/common/CouncilCursor';

const SiteLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <CouncilCursor size={38} />
      <SmoothScroll />

      <main id="main-content" className="relative z-10 w-full min-h-screen">
        {children}
      </main>
    </>
  );
};

export default SiteLayout;