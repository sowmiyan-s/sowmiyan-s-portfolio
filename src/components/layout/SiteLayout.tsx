import { ReactNode } from 'react';
import SmoothScroll from '@/components/common/SmoothScroll';
import ThemeAndEasterEgg from '@/components/common/ThemeAndEasterEgg';
import MysteryButterfly from '@/components/effects/MysteryButterfly';
import CouncilCursor from '@/components/common/CouncilCursor';

const SiteLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <CouncilCursor size={38} />
      <SmoothScroll />
      <ThemeAndEasterEgg />
      <MysteryButterfly />



      <main id="main-content" className="relative z-10 w-full min-h-screen">
        {children}
      </main>
    </>
  );
};

export default SiteLayout;

