import React from 'react';

interface SmoothScrollProps {
  children: React.ReactNode;
}

const SmoothScroll: React.FC<SmoothScrollProps> = ({ children }) => {
  return <div className="scroll-smooth">{children}</div>;
};

export default SmoothScroll;
