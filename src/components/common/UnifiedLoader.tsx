import React from 'react';

interface UnifiedLoaderProps {
  text?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const UnifiedLoader: React.FC<UnifiedLoaderProps> = ({
  text,
  className = '',
}) => {
  if (!text) return null;

  return (
    <div className={`flex items-center justify-center py-6 ${className}`}>
      <span className="text-[10px] sm:text-xs font-mono tracking-widest text-white/50 uppercase">
        {text}
      </span>
    </div>
  );
};

export default UnifiedLoader;
