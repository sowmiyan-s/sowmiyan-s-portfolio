import React from 'react';

interface SmoothScrollProps {
  children: React.ReactNode;
}

// Native smooth scroll — no external library. `scroll-behavior: smooth`
// is applied globally in index.css, keeping animations 60fps light.
const SmoothScroll: React.FC<SmoothScrollProps> = ({ children }) => <>{children}</>;

export default SmoothScroll;
