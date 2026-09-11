import React from 'react';
import UnifiedLoader from './UnifiedLoader';

interface RadarLoaderProps {
  text?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const RadarLoader: React.FC<RadarLoaderProps> = ({ text, size = 'md', className = '' }) => {
  return <UnifiedLoader text={text} size={size} className={className} />;
};

export default RadarLoader;
